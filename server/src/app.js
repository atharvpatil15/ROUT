const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
require('./config/passport');
const authRouter = require('./routes/authRoutes');
const productRouter = require('./routes/productRoutes');
const orderRouter = require('./routes/orderRoutes');

const app = express();
const isProduction = process.env.NODE_ENV === 'production';

// Required for secure cookies on Render
app.set('trust proxy', 1);

// 1) GLOBAL MIDDLEWARES
// Secure HTTP headers.
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

// Deterministic CSP for Next.js + trusted assets.
app.use((req, res, next) => {
  const scriptSrc = isProduction
    ? "script-src 'self' 'unsafe-inline'"
    : "script-src 'self' 'unsafe-inline' 'unsafe-eval'";
  const connectSrc = isProduction
    ? "connect-src 'self'"
    : "connect-src 'self' ws://localhost:5000 http://localhost:5000";

  const csp = [
    "default-src 'self'",
    "base-uri 'self'",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "object-src 'none'",
    scriptSrc,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://www.svgrepo.com https://placehold.co",
    "font-src 'self' data: https://fonts.gstatic.com",
    connectSrc,
    ...(isProduction ? ["upgrade-insecure-requests"] : []),
  ].join('; ');

  res.setHeader('Content-Security-Policy', csp);
  next();
});

// Implement CORS
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:5173',
  'http://localhost:3000',
  'https://rout-seven.vercel.app',
  process.env.FRONTEND_URL,
  process.env.RENDER_EXTERNAL_URL,
].filter(Boolean);

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
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
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
app.use('/api/v1/products', productRouter);
app.use('/api/v1/orders', orderRouter);

// 3) UNHANDLED API ROUTES
app.all('/api/*', (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    status: 'fail',
    message: err.message || 'Internal server error',
  });
});

module.exports = app;
