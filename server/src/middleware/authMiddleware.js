const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;
    
    // Debugging Logs
    console.log("--- Auth Check ---");
    console.log("Cookies:", req.cookies);
    console.log("Headers Authorization:", req.headers.authorization);

    // 1) Getting token and check of it's there
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
       token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      console.log("No token found.");
      return res.status(401).json({
        status: 'fail',
        message: 'You are not logged in! Please log in to get access.',
      });
    }

    // 2) Verification token
    const decoded = await promisify(jwt.verify)(token, process.env.SESSION_SECRET);
    console.log("Token Decoded:", decoded);

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      console.log("User belonging to token no longer exists.");
      return res.status(401).json({
        status: 'fail',
        message: 'The user belonging to this token does no longer exist.',
      });
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    next();
  } catch (err) {
    console.log("Auth Error:", err.message);
    return res.status(401).json({
      status: 'fail',
      message: 'Invalid token or session expired',
    });
  }
};

const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: 'fail',
        message: 'You do not have permission to perform this action',
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };