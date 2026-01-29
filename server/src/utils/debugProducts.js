const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: './.env' });

const checkProducts = async () => {
  try {
    console.log(`Connecting to DB at: ${process.env.DB_URL || process.env.MONGO_URI}`);
    await mongoose.connect(process.env.DB_URL || process.env.MONGO_URI);
    console.log('Connected to DB.');

    const count = await Product.countDocuments();
    console.log(`Product Count: ${count}`);

    if (count > 0) {
      const products = await Product.find().select('name price stock');
      console.log('Products found:');
      console.table(products.map(p => ({ id: p._id.toString(), name: p.name, stock: p.stock })));
    } else {
      console.log('No products found in the database.');
    }

    process.exit();
  } catch (error) {
    console.error('Error checking products:', error);
    process.exit(1);
  }
};

checkProducts();
