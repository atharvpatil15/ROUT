const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('./config/passport');
const authRouter = require('./routes/authRoutes');

const app = express();

// Required for secure cookies on Render
app.set('trust proxy', 1);

// 1) GLOBAL MIDDLEWARES
// Implement CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://rout-seven.vercel.app',
  'https://rout-seven.vercel.app/' // Add version with slash just in case
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    // Normalize: remove trailing slash from incoming origin for comparison
    const normalizedOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
    
    // Check if the normalized origin (or the exact one) is in our list
    const isAllowed = allowedOrigins.some(o => {
        const normO = o.endsWith('/') ? o.slice(0, -1) : o;
        return normO === normalizedOrigin;
    });

    if (!isAllowed) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    
    // Return the EXACT origin sent by the browser to avoid mismatch
    return callback(null, origin);
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
