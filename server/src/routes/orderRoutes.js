const express = require('express');
const orderController = require('../controllers/orderController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// GET all orders for Admin
router.get('/all', authMiddleware.protect, authMiddleware.restrictTo('admin'), orderController.getAllOrders);

// User's own orders
router.get('/my-orders', authMiddleware.protect, orderController.getMyOrders);

// Create order
router.post('/', authMiddleware.protect, orderController.createOrder);

// Specific order detail
router.get('/:id', authMiddleware.protect, orderController.getOrder);

// Admin update status
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), orderController.updateOrder);

module.exports = router;
