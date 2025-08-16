const express = require('express');
const router = express.Router();
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Create LemonSqueezy checkout session
router.post('/create-checkout', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Get course details
    const db = database.getDb();
    const course = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM courses WHERE id = ? AND is_published = 1', [courseId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Check if user already owns the course
    const existingPurchase = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM purchases WHERE user_id = ? AND course_id = ? AND status = "completed"', 
        [userId, courseId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (existingPurchase) {
      return res.status(400).json({ error: 'You already own this course' });
    }

    // Create LemonSqueezy checkout
    const checkoutData = {
      data: {
        type: 'checkouts',
        attributes: {
          checkout_options: {
            embed: false,
            media: false,
            logo: true,
          },
          checkout_data: {
            email: req.user.email,
            name: `${req.user.firstName} ${req.user.lastName}`,
            custom: {
              user_id: userId.toString(),
              course_id: courseId.toString()
            }
          },
          product_options: {
            name: course.title,
            description: course.description,
            media: course.thumbnail_url ? [course.thumbnail_url] : [],
            redirect_url: `${process.env.FRONTEND_URL}/courses.html?success=true`,
            receipt_button_text: 'Access Course',
            receipt_link_url: `${process.env.FRONTEND_URL}/courses.html`
          },
          test_mode: process.env.NODE_ENV === 'development'
        },
        relationships: {
          store: {
            data: {
              type: 'stores',
              id: process.env.LEMONSQUEEZY_STORE_ID
            }
          },
          variant: {
            data: {
              type: 'variants',
              id: course.lemonsqueezy_variant_id || process.env.LEMONSQUEEZY_DEFAULT_VARIANT_ID
            }
          }
        }
      }
    };

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`
      },
      body: JSON.stringify(checkoutData)
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('LemonSqueezy API Error:', error);
      return res.status(500).json({ error: 'Failed to create checkout session' });
    }

    const checkout = await response.json();

    // Create pending purchase record
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO purchases (user_id, course_id, lemonsqueezy_order_id, amount, currency, status) 
              VALUES (?, ?, ?, ?, ?, 'pending')`, 
        [userId, courseId, checkout.data.id, course.price, course.currency], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({
      checkout_url: checkout.data.attributes.url,
      course: {
        id: course.id,
        title: course.title,
        price: course.price,
        currency: course.currency
      }
    });

  } catch (error) {
    console.error('Checkout creation error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// LemonSqueezy webhook handler
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    const signature = req.headers['x-signature'];
    const payload = req.body;

    // Verify webhook signature (implement based on LemonSqueezy docs)
    // For now, we'll process without verification in development
    
    const event = JSON.parse(payload.toString());
    const db = database.getDb();

    switch (event.meta.event_name) {
      case 'order_created':
        const orderData = event.data;
        const customData = orderData.attributes.first_order_item.product_options.custom;
        
        if (customData && customData.user_id && customData.course_id) {
          // Update purchase status
          await new Promise((resolve, reject) => {
            db.run(`UPDATE purchases SET 
                      status = 'completed',
                      lemonsqueezy_order_id = ?
                    WHERE user_id = ? AND course_id = ? AND status = 'pending'`, 
              [orderData.id, customData.user_id, customData.course_id], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });

          // Create course progress entry
          await new Promise((resolve, reject) => {
            db.run(`INSERT OR IGNORE INTO course_progress (user_id, course_id, progress_percentage) 
                    VALUES (?, ?, 0)`, 
              [customData.user_id, customData.course_id], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });

          console.log('✅ LemonSqueezy order processed:', orderData.id);
        }
        break;

      case 'order_refunded':
        // Handle refunds
        const refundData = event.data;
        await new Promise((resolve, reject) => {
          db.run('UPDATE purchases SET status = "refunded" WHERE lemonsqueezy_order_id = ?', 
            [refundData.id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        console.log('🔄 LemonSqueezy refund processed:', refundData.id);
        break;

      default:
        console.log(`Unhandled LemonSqueezy event: ${event.meta.event_name}`);
    }

    res.json({received: true});
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

module.exports = router;
