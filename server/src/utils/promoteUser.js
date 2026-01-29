const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config({ path: './.env' });

const email = process.argv[2];

const promoteUser = async () => {
  if (!email) {
      console.log('Please provide an email address.');
      process.exit(1);
  }

  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(`Connected to DB. Promoting ${email}...`);

    const user = await User.findOneAndUpdate({ email: email }, { role: 'admin' }, { new: true });
    
    if (user) {
        console.log(`SUCCESS: User ${user.name} (${user.email}) is now an ADMIN.`);
    } else {
        console.log(`ERROR: User with email ${email} not found.`);
    }

    process.exit();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

promoteUser();
