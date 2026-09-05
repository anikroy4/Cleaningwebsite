require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const contactRoutes = require('./routes/contact');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = Number(process.env.PORT) || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in environment variables.');
  process.exit(1);
}

// Middleware
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '10kb' }));

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  const databaseReady = mongoose.connection.readyState === 1;
  res.status(databaseReady ? 200 : 503).json({
    status: databaseReady ? 'ok' : 'degraded',
    database: databaseReady ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  });
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError && err.status === 400 && err.type === 'entity.parse.failed') {
    return res.status(400).json({ success: false, error: 'Ungültige JSON-Anfrage.' });
  }
  console.error('Unhandled server error:', err);
  return res.status(500).json({ success: false, error: 'Serverfehler. Bitte versuchen Sie es später erneut.' });
});

const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`Port ${PORT} is already in use. Stop the current process or change PORT in .env.`);
      process.exit(1);
    }
    throw error;
  });

  const shutdown = async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    server.close(() => process.exit(0));
  };

  process.once('SIGINT', shutdown);
  process.once('SIGTERM', shutdown);
};

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('✅ Connected to MongoDB');
    startServer();
  } catch (error) {
    console.warn('⚠️ MongoDB connection unavailable:', error.message);
    console.warn(`Configured MONGODB_URI: ${MONGODB_URI}`);
    console.warn('Fix the MongoDB URI in .env or start a reachable MongoDB instance before retrying.');
    process.exit(1);
  }
};

connectToDatabase();
