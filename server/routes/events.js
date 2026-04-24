const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all events
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    let query = 'SELECT * FROM events';
    const params = [];
    if (type && type !== 'all') {
      query += ' WHERE type = ?';
      params.push(type);
    }
    query += ' ORDER BY date ASC';
    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET featured events
router.get('/featured', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM events WHERE is_featured = TRUE ORDER BY date ASC LIMIT 3');
    res.json({ success: true, data: rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST register for event
router.post('/register', async (req, res) => {
  try {
    const { event_id, name, email } = req.body;
    if (!event_id || !name || !email) {
      return res.status(400).json({ success: false, message: 'All fields required' });
    }
    // Check if already registered
    const [existing] = await db.query(
      'SELECT id FROM registrations WHERE event_id = ? AND email = ?',
      [event_id, email]
    );
    if (existing.length) {
      return res.status(409).json({ success: false, message: 'Already registered with this email' });
    }
    await db.query('INSERT INTO registrations (event_id, name, email) VALUES (?, ?, ?)', [event_id, name, email]);
    await db.query('UPDATE events SET registered = registered + 1 WHERE id = ?', [event_id]);
    res.json({ success: true, message: 'Registration successful! 🚀' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
