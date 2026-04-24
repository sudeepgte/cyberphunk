const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all posts (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    const offset = (page - 1) * limit;
    let query = 'SELECT id, title, slug, excerpt, author, category, tags, thumbnail, views, published_at FROM posts';
    const params = [];
    if (category && category !== 'all') {
      query += ' WHERE category = ?';
      params.push(category);
    }
    query += ' ORDER BY published_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));
    const [rows] = await db.query(query, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM posts WHERE slug = ?', [req.params.slug]);
    if (!rows.length) return res.status(404).json({ success: false, message: 'Post not found' });
    // Increment views
    await db.query('UPDATE posts SET views = views + 1 WHERE slug = ?', [req.params.slug]);
    res.json({ success: true, data: rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
