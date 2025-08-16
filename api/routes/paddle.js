const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Create Paddle checkout session (Paddle Billing API)
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

    // For now, return price_id for frontend Paddle.js integration
    // In production, you would create/use actual Paddle price IDs
    const priceId = `pri_course_${courseId}_${course.price.replace('.', '')}`;
    
    // Create pending purchase record
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO purchases (user_id, course_id, paddle_checkout_id, amount, currency, status) 
              VALUES (?, ?, ?, ?, ?, 'pending')`, 
        [userId, courseId, priceId, course.price, course.currency || 'USD'], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({
      price_id: priceId,
      course: {
        id: course.id,
        title: course.title,
        price: course.price,
        currency: course.currency || 'USD'
      }
    });

  } catch (error) {
    console.error('Checkout creation error:', error);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
});

// Paddle webhook handler
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  try {
    // Verify webhook signature
    const signature = req.headers['paddle-signature'];
    const body = req.body.toString();
    
    // Paddle signature verification
    const publicKey = process.env.PADDLE_PUBLIC_KEY;
    if (publicKey && signature) {
      const expectedSignature = crypto
        .createVerify('sha1')
        .update(body)
        .verify(publicKey, signature, 'base64');
      
      if (!expectedSignature) {
        return res.status(401).json({ error: 'Invalid signature' });
      }
    }

    const data = JSON.parse(body);
    const db = database.getDb();

    switch (data.alert_name) {
      case 'payment_succeeded':
        const passthrough = JSON.parse(data.passthrough || '{}');
        
        if (passthrough.user_id && passthrough.course_id) {
          // Update purchase status
          await new Promise((resolve, reject) => {
            db.run(`UPDATE purchases SET 
                      status = 'completed',
                      paddle_order_id = ?,
                      paddle_checkout_id = ?
                    WHERE user_id = ? AND course_id = ? AND status = 'pending'`, 
              [data.order_id, data.checkout_id, passthrough.user_id, passthrough.course_id], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });

          // Create course progress entry
          await new Promise((resolve, reject) => {
            db.run(`INSERT OR IGNORE INTO course_progress (user_id, course_id, progress_percentage) 
                    VALUES (?, ?, 0)`, 
              [passthrough.user_id, passthrough.course_id], (err) => {
              if (err) reject(err);
              else resolve();
            });
          });

          console.log('✅ Paddle payment processed:', data.order_id);
        }
        break;

      case 'payment_refunded':
        // Handle refunds
        await new Promise((resolve, reject) => {
          db.run('UPDATE purchases SET status = "refunded" WHERE paddle_order_id = ?', 
            [data.order_id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        console.log('🔄 Paddle refund processed:', data.order_id);
        break;

      case 'payment_failed':
        // Handle failed payments
        await new Promise((resolve, reject) => {
          db.run('UPDATE purchases SET status = "failed" WHERE paddle_checkout_id = ?', 
            [data.checkout_id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        console.log('❌ Paddle payment failed:', data.checkout_id);
        break;

      default:
        console.log(`Unhandled Paddle event: ${data.alert_name}`);
    }

    res.json({received: true});
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});

// Get Paddle config for frontend
router.get('/config', (req, res) => {
  res.json({
    client_token: process.env.PADDLE_CLIENT_TOKEN || process.env.PADDLE_VENDOR_ID,
    environment: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
  });
});

module.exports = router;
