const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  try {
    console.log("GET /products request received");
    const products = await Product.find().sort({ createdAt: -1 });
    console.log(`Found ${products.length} products`);
    
    res.status(200).json({
      status: 'success',
      results: products.length,
      data: {
        products
      }
    });
  } catch (error) {
    console.error("Error in getAllProducts:", error);
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.createProduct = async (req, res) => {
  try {
    console.log("POST /products body:", req.body);
    const newProduct = await Product.create(req.body);
    console.log("Product created successfully:", newProduct._id);
    
    res.status(201).json({
      status: 'success',
      data: {
        product: newProduct
      }
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
    res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    res.status(404).json({ status: 'fail', message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'No product found with that ID' });
    }
    res.status(200).json({
      status: 'success',
      data: { product }
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'No product found with that ID' });
    }
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    res.status(400).json({ status: 'fail', message: error.message });
  }
};