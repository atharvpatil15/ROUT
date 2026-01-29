const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: './.env' });

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to DB...');

    const users = await User.find({}, 'name email role');
    console.table(users.map(u => ({ id: u._id, name: u.name, email: u.email, role: u.role })));

    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

listUsers();
