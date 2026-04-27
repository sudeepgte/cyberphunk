require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const postsRouter = require('./routes/posts');
const eventsRouter = require('./routes/events');
const projectsRouter = require('./routes/projects');
const contactRouter = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/posts', postsRouter);
app.use('/api/events', eventsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/contact', contactRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'CyberPhunk API running 🚀' });
});

app.listen(PORT, () => {
  console.log(`\n🚀 CyberPhunk Server running on http://localhost:${PORT}`);
});
