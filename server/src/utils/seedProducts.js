const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');

dotenv.config({ path: './.env' });

const products = [
  {
    name: 'Masala Chai',
    description: 'The Ritual of Spice. A high-octane blend of manual-ground cloves, cardamom, and black pepper. Engineered for focus and the early morning grind.',
    price: 45,
    category: 'Spiced',
    origin: 'Assam, India',
    weight: 100,
    steepingInstructions: {
      temperature: 100,
      time: 5
    },
    stock: 50,
    images: ['https://images.unsplash.com/photo-1594631252845-d9b502912443?q=80&w=2574&auto=format&fit=crop'],
    isFeatured: true
  },
  {
    name: 'Green Tea',
    description: 'The Natural Reset. Hand-picked antioxidant power to clear the fog. Clean energy, zero crash, pure vibrancy.',
    price: 38,
    category: 'Green',
    origin: 'Shizuoka, Japan',
    weight: 50,
    steepingInstructions: {
      temperature: 80,
      time: 3
    },
    stock: 100,
    images: ['https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=2670&auto=format&fit=crop'],
    isFeatured: true
  },
  {
    name: 'Orthodox Tea',
    description: 'The Artisan’s Standard. Traditional whole-leaf processing for a deep, malty profile. For those who respect the craft of tea.',
    price: 62,
    category: 'Pure',
    origin: 'Darjeeling, India',
    weight: 75,
    steepingInstructions: {
      temperature: 95,
      time: 4
    },
    stock: 30,
    images: ['https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=2574&auto=format&fit=crop'],
    isFeatured: true
  },
  {
    name: 'Earl Grey',
    description: 'The Classic Reinvented. Bergamot infused black tea for a sophisticated and uplifting experience.',
    price: 40,
    category: 'Black',
    origin: 'Sri Lanka',
    weight: 100,
    steepingInstructions: {
      temperature: 100,
      time: 4
    },
    stock: 60,
    images: ['https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2521&auto=format&fit=crop'],
    isFeatured: false
  },
  {
    name: 'Jasmine Green',
    description: 'Floral Tranquility. Delicately scented with jasmine blossoms for a calm and fragrant afternoon.',
    price: 42,
    category: 'Green',
    origin: 'Fujian, China',
    weight: 50,
    steepingInstructions: {
      temperature: 80,
      time: 2
    },
    stock: 80,
    images: ['https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2670&auto=format&fit=crop'],
    isFeatured: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to DB for seeding...');

    await Product.deleteMany();
    console.log('Cleared existing products.');

    await Product.insertMany(products);
    console.log('Successfully seeded database with products!');

    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
