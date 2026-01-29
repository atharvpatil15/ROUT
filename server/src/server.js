const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const app = require('./app');

// Connect to Database
const db = process.env.DB_URL || process.env.MONGO_URI;
mongoose.connect(db)
  .then(() => console.log('DB Connection Successful! Managed by Atlas.'))
  .catch(err => console.error('DB Connection Error:', err));

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

// Handle Unhandled Promise Rejections
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});


