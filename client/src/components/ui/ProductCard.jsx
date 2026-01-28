import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
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

  const handleCardClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      // In the future, this could navigate to a Product Details page
      // navigate(`/product/${product.id}`);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onClick={handleCardClick}
      className="group bg-white p-6 rounded-sm border border-rout-soot/5 hover:border-rout-soot/20 transition-all duration-500 cursor-pointer"
    >
      {/* Small Image Container */}
      <div className="relative overflow-hidden aspect-square bg-rout-paper mb-6 rounded-sm">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            <button
                onClick={handleAction}
                className="bg-rout-soot text-white p-3 rounded-full shadow-xl hover:bg-rout-matcha transition-colors"
            >
                <Plus size={20} />
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <div className="flex justify-between items-baseline">
            <h3 className="font-serif text-2xl text-rout-soot uppercase tracking-tight">{product.name}</h3>
            <span className="font-sans font-medium text-rout-soot/60 text-sm">${product.price}</span>
        </div>
        
        <p className="text-rout-soot/70 text-sm leading-relaxed font-light min-h-[60px]">
            {product.description}
        </p>
        
        <div className="pt-4 border-t border-rout-soot/5 flex items-center justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] text-rout-soot/40 font-bold">Premium Grade</span>
            <button className="text-xs uppercase tracking-widest font-bold text-rout-soot hover:text-rout-matcha transition-colors">
                Details +
            </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;