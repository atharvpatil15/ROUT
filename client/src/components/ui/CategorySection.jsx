import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Using your local assets
import masalaImg from '../../assets/masala.jpg';
import greenImg from '../../assets/green.jpg';
import orthodoxImg from '../../assets/orthodox.jpg';

const categories = [
  { name: 'Spiced', image: masalaImg, link: '/shop?category=masala', color: 'bg-rout-spice' },
  { name: 'Green', image: greenImg, link: '/shop?category=green', color: 'bg-rout-matcha' },
  { name: 'Pure', image: orthodoxImg, link: '/shop?category=orthodox', color: 'bg-rout-gold' },
];

const CategorySection = () => {
  return (
    <section className="py-24 px-6 bg-rout-paper">
        <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl text-rout-soot mb-12 text-center">Find Your Ritual</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((cat, i) => (
                    <Link to={cat.link} key={i} className="group relative h-[400px] overflow-hidden rounded-sm cursor-pointer block">
                        <motion.img 
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                            src={cat.image} 
                            alt={cat.name} 
                            className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        
                        <div className="absolute bottom-8 left-8">
                            <span className="text-white text-xs uppercase tracking-[0.2em] mb-2 block opacity-80">Shop</span>
                            <h3 className="font-serif text-4xl text-white">{cat.name}</h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    </section>
  );
};

export default CategorySection;
