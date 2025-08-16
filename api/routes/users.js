const express = require('express');
const router = express.Router();
const database = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Update course progress
router.put('/progress/:courseId', authenticateToken, async (req, res) => {
  try {
    const { courseId } = req.params;
    const { progressPercentage } = req.body;
    const userId = req.user.id;

    if (progressPercentage < 0 || progressPercentage > 100) {
      return res.status(400).json({ error: 'Progress percentage must be between 0 and 100' });
    }

    const db = database.getDb();

    // Check if user owns the course
    const purchase = await new Promise((resolve, reject) => {
      db.get('SELECT * FROM purchases WHERE user_id = ? AND course_id = ? AND status = "completed"', 
        [userId, courseId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!purchase) {
      return res.status(403).json({ error: 'You do not own this course' });
    }

    // Update progress
    const completedAt = progressPercentage === 100 ? new Date().toISOString() : null;
    
    await new Promise((resolve, reject) => {
      db.run(`INSERT OR REPLACE INTO course_progress 
              (user_id, course_id, progress_percentage, completed_at, last_accessed) 
              VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)`, 
        [userId, courseId, progressPercentage, completedAt], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ message: 'Progress updated successfully' });

  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({ error: 'Failed to update progress' });
  }
});

// Get user dashboard data
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const db = database.getDb();

    // Get purchased courses with progress
    const courses = await new Promise((resolve, reject) => {
      db.all(`
        SELECT c.*, p.purchased_at, cp.progress_percentage, cp.completed_at, cp.last_accessed
        FROM courses c
        JOIN purchases p ON c.id = p.course_id
        LEFT JOIN course_progress cp ON c.id = cp.course_id AND cp.user_id = p.user_id
        WHERE p.user_id = ? AND p.status = 'completed'
        ORDER BY cp.last_accessed DESC, p.purchased_at DESC
      `, [userId], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    // Get statistics
    const stats = await new Promise((resolve, reject) => {
      db.get(`
        SELECT 
          COUNT(*) as total_courses,
          COUNT(CASE WHEN cp.progress_percentage = 100 THEN 1 END) as completed_courses,
          AVG(cp.progress_percentage) as avg_progress
        FROM purchases p
        LEFT JOIN course_progress cp ON p.course_id = cp.course_id AND cp.user_id = p.user_id
        WHERE p.user_id = ? AND p.status = 'completed'
      `, [userId], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    res.json({
      courses,
      stats: {
        totalCourses: stats.total_courses || 0,
        completedCourses: stats.completed_courses || 0,
        averageProgress: Math.round(stats.avg_progress || 0)
      }
    });

  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
});

// Get all users (admin only)
router.get('/admin/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = database.getDb();
    
    const users = await new Promise((resolve, reject) => {
      db.all(`
        SELECT u.id, u.email, u.first_name, u.last_name, u.created_at, u.is_admin,
               COUNT(p.id) as total_purchases,
               SUM(p.amount) as total_spent
        FROM users u
        LEFT JOIN purchases p ON u.id = p.user_id AND p.status = 'completed'
        GROUP BY u.id
        ORDER BY u.created_at DESC
      `, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

module.exports = router;
