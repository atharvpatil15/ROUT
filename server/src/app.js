const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/passport');
const authRouter = require('./routes/authRoutes');

const app = express();

// 1) GLOBAL MIDDLEWARES
// Implement CORS
const allowedOrigins = ['http://localhost:5173', 'https://rout-seven.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
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
