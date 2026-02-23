const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // For protect
const { validate, registerSchema, loginSchema } = require('../utils/validation');

const router = express.Router();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

// Email/Password
router.post('/register', validate(registerSchema), authController.register);
router.post('/login', authController.loginLimiter, validate(loginSchema), authController.login);
router.get('/logout', authController.logout);
router.get('/me', authMiddleware.protect, authController.getMe);
router.patch('/updateMe', authMiddleware.protect, authController.updateMe);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${frontendUrl}/login` }),
  authController.googleCallback
);

module.exports = router;
