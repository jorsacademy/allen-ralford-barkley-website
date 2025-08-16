const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();
const database = require('../config/database');
const { authenticateToken } = require('../middleware/auth');

// Create payment intent for course purchase
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
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

    // Get or create Stripe customer
    const user = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM users WHERE id = ?', [userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: `${user.first_name} ${user.last_name}`,
      });
      customerId = customer.id;
      
      // Update user with Stripe customer ID
      await new Promise((resolve, reject) => {
        db.run('UPDATE users SET stripe_customer_id = ? WHERE id = ?', 
          [customerId, userId], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(course.price * 100), // Convert to cents
      currency: course.currency.toLowerCase(),
      customer: customerId,
      metadata: {
        courseId: courseId.toString(),
        userId: userId.toString(),
        courseName: course.title
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Create pending purchase record
    await new Promise((resolve, reject) => {
      db.run(`INSERT INTO purchases (user_id, course_id, stripe_payment_intent_id, amount, currency, status) 
              VALUES (?, ?, ?, ?, ?, 'pending')`, 
        [userId, courseId, paymentIntent.id, course.price, course.currency], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      course: {
        id: course.id,
        title: course.title,
        price: course.price,
        currency: course.currency
      }
    });

  } catch (error) {
    console.error('Payment intent creation error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Stripe webhook handler
router.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  const db = database.getDb();

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      
      // Update purchase status
      await new Promise((resolve, reject) => {
        db.run('UPDATE purchases SET status = "completed" WHERE stripe_payment_intent_id = ?', 
          [paymentIntent.id], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      // Create course progress entry
      const purchase = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM purchases WHERE stripe_payment_intent_id = ?', 
          [paymentIntent.id], (err, row) => {
          if (err) reject(err);
          else resolve(row);
        });
      });

      if (purchase) {
        await new Promise((resolve, reject) => {
          db.run(`INSERT OR IGNORE INTO course_progress (user_id, course_id, progress_percentage) 
                  VALUES (?, ?, 0)`, 
            [purchase.user_id, purchase.course_id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
      }

      console.log('✅ Payment succeeded:', paymentIntent.id);
      break;

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object;
      
      // Update purchase status
      await new Promise((resolve, reject) => {
        db.run('UPDATE purchases SET status = "failed" WHERE stripe_payment_intent_id = ?', 
          [failedPayment.id], (err) => {
          if (err) reject(err);
          else resolve();
        });
      });

      console.log('❌ Payment failed:', failedPayment.id);
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

// Get user's purchased courses
router.get('/my-courses', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const db = database.getDb();

    const courses = await new Promise((resolve, reject) => {
      db.all(`
        SELECT c.*, p.purchased_at, cp.progress_percentage, cp.completed_at
        FROM courses c
        JOIN purchases p ON c.id = p.course_id
        LEFT JOIN course_progress cp ON c.id = cp.course_id AND cp.user_id = p.user_id
        WHERE p.user_id = ? AND p.status = 'completed'
        ORDER BY p.purchased_at DESC
      `, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    res.json(courses);
  } catch (error) {
    console.error('Error fetching user courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

module.exports = router;
