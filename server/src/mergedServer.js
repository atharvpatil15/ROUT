const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const lifecycleEvent = process.env.npm_lifecycle_event;

// Hard-set runtime mode by script to avoid env mismatch issues.
if (lifecycleEvent === 'start') {
  process.env.NODE_ENV = 'production';
} else if (lifecycleEvent === 'dev') {
  process.env.NODE_ENV = 'development';
}

const next = require('next');

// Prefer server/.env, fallback to root .env if present
const serverEnvPath = path.join(__dirname, '../.env');
dotenv.config({ path: serverEnvPath });
dotenv.config();

const app = require('./app');

const dev = lifecycleEvent === 'dev';
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5000;
const db = process.env.DB_URL || process.env.MONGO_URI;

const nextDir = path.resolve(__dirname, '../../');
const nextApp = next({ dev, dir: nextDir });
const handle = nextApp.getRequestHandler();

const startServer = async () => {
  if (!db) {
    const missingDbError = new Error('Database connection string is missing. Set DB_URL or MONGO_URI.');
    if (isProduction) {
      throw missingDbError;
    }
    console.warn(`${missingDbError.message} Starting without database in development mode.`);
  } else {
    try {
      await mongoose.connect(db, {
        serverSelectionTimeoutMS: 10000,
      });
      console.log('DB Connection Successful!');
    } catch (err) {
      if (isProduction) {
        throw err;
      }
      console.error('DB connection failed. Starting without database in development mode.');
      console.error(err.message);
    }
  }

  await nextApp.prepare();
  console.log(`Next.js prepared (${dev ? 'development' : 'production'} mode).`);

  app.all('*', (req, res) => handle(req, res));

  const server = app.listen(port, () => {
    console.log(`Unified app running on port ${port}...`);
    console.log(`Lifecycle: ${lifecycleEvent || 'unknown'}`);
  });

  process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! Shutting down...');
    console.error(err.name, err.message);
    server.close(() => process.exit(1));
  });
};

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message);
  process.exit(1);
});

startServer().catch((err) => {
  console.error('Failed to start unified server:', err.message);
  process.exit(1);
});
