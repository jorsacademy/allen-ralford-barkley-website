const express = require('express');
const router = express.Router();
const database = require('../config/database');
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// Get all published courses (public)
router.get('/', async (req, res) => {
  try {
    const db = database.getDb();
    
    const courses = await new Promise((resolve, reject) => {
      db.all(`SELECT id, title, description, price, currency, thumbnail_url, 
                     duration_minutes, level, category, created_at 
              FROM courses WHERE is_published = 1 
              ORDER BY created_at DESC`, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

// Get single course details
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const db = database.getDb();
    
    const course = await new Promise((resolve, reject) => {
      db.get(`SELECT * FROM courses WHERE id = ? AND is_published = 1`, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({ error: 'Failed to fetch course' });
  }
});

// Create new course (admin only)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      currency = 'USD',
      thumbnailUrl,
      videoUrl,
      durationMinutes,
      level,
      category
    } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({ error: 'Title, description, and price are required' });
    }

    const db = database.getDb();
    
    const courseId = await new Promise((resolve, reject) => {
      db.run(`INSERT INTO courses (title, description, price, currency, thumbnail_url, 
                                  video_url, duration_minutes, level, category) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, 
        [title, description, price, currency, thumbnailUrl, videoUrl, 
         durationMinutes, level, category], 
        function(err) {
          if (err) reject(err);
          else resolve(this.lastID);
        }
      );
    });

    res.status(201).json({
      message: 'Course created successfully',
      courseId
    });

  } catch (error) {
    console.error('Error creating course:', error);
    res.status(500).json({ error: 'Failed to create course' });
  }
});

// Update course (admin only)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      price,
      currency,
      thumbnailUrl,
      videoUrl,
      durationMinutes,
      level,
      category,
      isPublished
    } = req.body;

    const db = database.getDb();
    
    await new Promise((resolve, reject) => {
      db.run(`UPDATE courses SET 
                title = COALESCE(?, title),
                description = COALESCE(?, description),
                price = COALESCE(?, price),
                currency = COALESCE(?, currency),
                thumbnail_url = COALESCE(?, thumbnail_url),
                video_url = COALESCE(?, video_url),
                duration_minutes = COALESCE(?, duration_minutes),
                level = COALESCE(?, level),
                category = COALESCE(?, category),
                is_published = COALESCE(?, is_published),
                updated_at = CURRENT_TIMESTAMP
              WHERE id = ?`, 
        [title, description, price, currency, thumbnailUrl, videoUrl, 
         durationMinutes, level, category, isPublished, id], 
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });

    res.json({ message: 'Course updated successfully' });

  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({ error: 'Failed to update course' });
  }
});

// Delete course (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const db = database.getDb();
    
    await new Promise((resolve, reject) => {
      db.run('DELETE FROM courses WHERE id = ?', [id], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    res.json({ message: 'Course deleted successfully' });

  } catch (error) {
    console.error('Error deleting course:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// Get all courses (admin only - includes unpublished)
router.get('/admin/all', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const db = database.getDb();
    
    const courses = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM courses ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });

    res.json(courses);
  } catch (error) {
    console.error('Error fetching all courses:', error);
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

module.exports = router;
