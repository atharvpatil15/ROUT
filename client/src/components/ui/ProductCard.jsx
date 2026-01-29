import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAction = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
    } else {
      addToCart(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group bg-white rounded-pro p-4 shadow-pro hover:-translate-y-2 transition-all duration-500 flex flex-col h-full"
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-rout-paper mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Rating Badge */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Star size={10} className="fill-rout-gold text-rout-gold" />
            <span className="text-[10px] font-bold text-rout-soot">4.9</span>
        </div>

        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-rout-matcha/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button
                onClick={handleAction}
                className="bg-white text-rout-matcha p-4 rounded-full shadow-2xl hover:bg-rout-matcha hover:text-white transition-colors transform scale-90 group-hover:scale-100 duration-500"
            >
                <ShoppingBag size={20} />
            </button>
        </div>
      </div>

      {/* 2. Content */}
      <div className="flex-grow flex flex-col px-2">
        <div className="flex justify-between items-start mb-2">
            <div>
                <span className="text-[9px] uppercase tracking-widest text-rout-gold font-bold">{product.category || 'Premium Selection'}</span>
                <h3 className="font-serif text-2xl text-rout-soot leading-none mt-1">{product.name}</h3>
            </div>
            <span className="font-sans font-bold text-rout-soot text-lg">${product.price}</span>
        </div>
        
        <p className="text-rout-soot/60 text-xs leading-relaxed font-normal line-clamp-2 mt-2 mb-6">
            {product.description}
        </p>
        
        <div className="mt-auto">
            <button 
                onClick={handleAction}
                className="w-full py-3 rounded-xl bg-rout-matcha text-white font-bold uppercase tracking-widest border border-rout-matcha hover:bg-transparent hover:text-rout-matcha transition-colors"
            >
                Add to Cart
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
