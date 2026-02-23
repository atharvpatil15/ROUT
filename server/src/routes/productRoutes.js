const express = require('express');
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/authMiddleware');
const { validate, productSchema, productUpdateSchema } = require('../utils/validation');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProduct);

// Protected routes (Admin only)
router.post('/', authMiddleware.protect, authMiddleware.restrictTo('admin'), validate(productSchema), productController.createProduct);
router.patch('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), validate(productUpdateSchema), productController.updateProduct);
router.delete('/:id', authMiddleware.protect, authMiddleware.restrictTo('admin'), productController.deleteProduct);

module.exports = router;
