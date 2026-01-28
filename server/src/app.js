const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/passport');
const authRouter = require('./routes/authRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

// Cookie parser, reading cookies from request
app.use(cookieParser());

// 2) ROUTES
app.use('/api/v1/users', authRouter);

// 3) UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

module.exports = app;
