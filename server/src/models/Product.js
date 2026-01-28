const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A product must have a name'],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'A product must have a description'],
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  category: {
    type: String,
    required: [true, 'A product must have a category'],
    enum: ['Green', 'Black', 'Oolong', 'White', 'Herbal', 'Matcha', 'Pu-erh', 'Blends'],
  },
  origin: {
    type: String,
    required: [true, 'Please specify the tea origin (e.g., Kyoto, Japan)'],
  },
  weight: {
    type: Number, // In grams
    required: [true, 'Please specify the net weight'],
  },
  steepingInstructions: {
    temperature: {
      type: Number, // In Celsius
      required: true,
    },
    time: {
      type: Number, // In minutes
      required: true,
    },
  },
  stock: {
    type: Number,
    required: true,
    default: 0,
  },
  images: [String], // Array of image URLs
  isFeatured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
