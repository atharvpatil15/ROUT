const jwt = require('jsonwebtoken');
const User = require('../models/User');
const rateLimit = require('express-rate-limit');

// Rate Limiter: 10 requests per 15 minutes for login
exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: { status: 'fail', message: 'Too many login attempts, please try again after 15 minutes' }
});

const signToken = (id) => {
  return jwt.sign({ id }, process.env.SESSION_SECRET, {
    expiresIn: process.env.SESSION_EXPIRY,
  });
};

const createSendToken = (user, statusCode, res, redirectUrl = null) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRY * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true, // MUST be true for SameSite=None
    sameSite: 'none', // Required for Cross-Site (Vercel -> Render)
  };

  res.cookie('jwt', token, cookieOptions);

  // If redirected (OAuth), we redirect to frontend
  if (redirectUrl) {
    return res.redirect(redirectUrl);
  }

  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.register = async (req, res) => {
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    createSendToken(newUser, 201, res);
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ status: 'fail', message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ status: 'fail', message: 'Incorrect email or password' });
    }

    createSendToken(user, 200, res);
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.getMe = (req, res) => {
    res.status(200).json({
        status: 'success',
        data: { user: req.user }
    });
};

// Google Callback Controller
exports.googleCallback = (req, res) => {
  // Passport attaches user to req.user
  const frontendUrl = process.env.NODE_ENV === 'production' ? 'https://your-live-frontend.com' : 'http://localhost:5173/';
  createSendToken(req.user, 200, res, frontendUrl); 
};