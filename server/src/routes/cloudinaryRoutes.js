const express = require('express');
const cloudinaryController = require('../controllers/cloudinaryController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// Only Admins can get a signed upload signature
router.get('/signature', authMiddleware.protect, authMiddleware.restrictTo('admin'), cloudinaryController.getSignature);

module.exports = router;
