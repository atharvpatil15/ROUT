const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: './.env' });

const namesToDelete = ['Masala Chai', 'Green Tea', 'Orthodox Tea'];

const cleanup = async () => {
  try {
    await mongoose.connect(process.env.DB_URL || process.env.MONGO_URI);
    console.log('Connected to DB...');

    const result = await Product.deleteMany({ name: { $in: namesToDelete } });
    console.log(`Successfully deleted ${result.deletedCount} seeder products.`);

    process.exit();
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
};

cleanup();
