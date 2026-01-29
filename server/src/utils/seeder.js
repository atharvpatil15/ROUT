const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: '../../.env' }); // Adjust path if needed depending on where you run it

const products = [
  {
    name: 'Masala Chai',
    description: 'The Ritual of Spice. A high-octane blend of manual-ground cloves, cardamom, and black pepper. Engineered for focus and the early morning grind.',
    price: 45,
    category: 'Black',
    origin: 'Kerala, India',
    weight: 100,
    steepingInstructions: { temperature: 95, time: 5 },
    stock: 50,
    images: ['https://images.unsplash.com/photo-1619803157297-f589c313a48e?q=80&w=2670&auto=format&fit=crop'],
    isFeatured: true
  },
  {
    name: 'Imperial Green Tea',
    description: 'The Natural Reset. Hand-picked antioxidant power to clear the fog. Clean energy, zero crash, pure vibrancy.',
    price: 38,
    category: 'Green',
    origin: 'Uji, Japan',
    weight: 80,
    steepingInstructions: { temperature: 80, time: 3 },
    stock: 50,
    images: ['https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?q=80&w=2576&auto=format&fit=crop'],
    isFeatured: true
  },
  {
    name: 'Orthodox Tea',
    description: 'The Artisan’s Standard. Traditional whole-leaf processing for a deep, malty profile. For those who respect the craft of tea.',
    price: 62,
    category: 'Black',
    origin: 'Assam, India',
    weight: 100,
    steepingInstructions: { temperature: 95, time: 4 },
    stock: 30,
    images: ['https://images.unsplash.com/photo-1594631252845-d9b502912443?q=80&w=2574&auto=format&fit=crop'],
    isFeatured: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('DB Connected for Seeding...');
    
    await Product.deleteMany(); // Clear existing
    await Product.insertMany(products);
    
    console.log('Data Imported!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
