"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

const ProductCard = ({ product, index }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleAction = (e) => {
    e.stopPropagation();
    if (!user) {
      router.push('/login');
    } else {
      addToCart(product);
    }
  };

  const imageSrc = product.image || 'https://images.unsplash.com/photo-1594631252845-d9b502912443?q=80&w=1200&auto=format&fit=crop';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.05 }}
      onClick={() => router.push(`/shop/${product.id}`)}
      className="group flex flex-col h-full bg-white border border-black/[0.05] p-3 hover:border-black/10 transition-all duration-500 cursor-pointer"
    >
      {/* 1. Image Container - Smaller aspect ratio for smaller cards */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#F5F5F7] mb-5">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-105"
        />
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-700 flex items-end justify-center pb-4 md:pb-6">
            <button
                onClick={handleAction}
                className="bg-black text-white px-4 md:px-5 py-2 md:py-2.5 rounded-none text-[8px] md:text-[9px] font-bold uppercase tracking-[0.2em] opacity-100 translate-y-0 md:opacity-0 md:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-xl hover:bg-tl-matcha hover:text-white"
            >
                Add to Ritual
            </button>
        </div>
      </div>

      {/* 2. Content */}
      <div className="flex-grow flex flex-col text-center px-1">
        <span className="text-[8px] uppercase tracking-[0.4em] text-black/30 mb-2 font-medium">{product.category || 'Premium'}</span>
        <h3 className="font-serif text-lg text-black mb-1 italic leading-snug">{product.name}</h3>
        <p className="font-sans text-[11px] font-semibold text-black/60 tracking-tighter">${product.price}</p>
      </div>
    </motion.div>
  );
};

export default ProductCard;
