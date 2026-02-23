const Order = require('../models/Order');

exports.createOrder = async (req, res) => {
  try {
    // Add user to the order
    req.body.user = req.user.id;
    
    const newOrder = await Order.create(req.body);
    
    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    
    res.status(200).json({
      status: 'success',
      results: orders.length,
      data: {
        orders
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: error.message
    });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id });
    
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'No order found with that ID for this user'
      });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        order
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
    });
  }
};
