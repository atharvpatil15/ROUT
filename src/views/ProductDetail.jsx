"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ArrowLeft, Thermometer, Clock, Leaf, Info, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { user } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/products/${id}`);
        setProduct(res.data.data.product);
      } catch (err) {
        console.error("Fetch Error:", err);
        setError("Failed to locate this specific ritual. It may be out of season.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tl-paper">
        <Loader2 className="w-8 h-8 animate-spin text-tl-matcha" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-tl-paper px-6 text-center">
        <h1 className="font-serif text-3xl mb-4 italic">{error}</h1>
        <button onClick={() => router.push('/')} className="text-tl-matcha font-bold uppercase tracking-widest text-xs border-b border-tl-matcha pb-1">
          Return to Collection
        </button>
      </div>
    );
  }

  const imageSrc = product.images?.[0] || 'https://images.unsplash.com/photo-1594631252845-d9b502912443?q=80&w=1200&auto=format&fit=crop';

  return (
    <div className="bg-tl-paper min-h-screen pt-20 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation / Back Button */}
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-tl-soot/40 hover:text-tl-soot transition-colors mb-12 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Back to Rituals</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          
          {/* Left: Immersive Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative lg:sticky lg:top-32 h-fit"
          >
             <div className="aspect-[4/5] overflow-hidden bg-[#F5F5F7] rounded-sm group">
                <img 
                  src={imageSrc} 
                  alt={product.name} 
                  className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
             </div>
             {/* Decorative Label */}
             <div className="absolute -bottom-8 -right-8 pointer-events-none select-none hidden xl:block">
                <span className="text-9xl font-serif text-tl-soot/[0.03] italic leading-none whitespace-nowrap">
                   {product.category}
                </span>
             </div>
          </motion.div>

          {/* Right: Content & Ritual Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col"
          >
            <div className="border-b border-tl-soot/10 pb-10">
              <span className="text-tl-matcha font-semibold text-[10px] tracking-[0.5em] uppercase mb-4 block">
                Single-Estate {product.category}
              </span>
              <h1 className="font-serif text-5xl md:text-6xl text-tl-soot italic mb-6 leading-tight">
                {product.name}
              </h1>
              <p className="font-sans text-2xl text-tl-soot font-light tracking-tight mb-8">
                ${product.price}
              </p>
              
              <button 
                onClick={handleAddToCart}
                className="w-full bg-tl-soot text-white py-5 flex items-center justify-center gap-3 group hover:bg-tl-matcha transition-all duration-500 shadow-xl"
              >
                <ShoppingBag size={18} className="group-hover:scale-110 transition-transform" />
                <span className="text-xs uppercase tracking-[0.3em] font-bold">Add to My Ritual</span>
              </button>
            </div>

            {/* Steeping / Ritual Specs */}
            <div className="py-12 border-b border-tl-soot/10">
               <h3 className="text-[10px] uppercase tracking-[0.4em] font-bold text-tl-soot/40 mb-8">Steeping Ritual</h3>
               <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-3">
                     <div className="flex items-center gap-2 text-tl-matcha">
                        <Thermometer size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Temp</span>
                     </div>
                     <p className="font-serif text-2xl italic">{product.steepingInstructions?.temperature || '85'}°C</p>
                  </div>
                  <div className="space-y-3 text-center lg:text-left">
                     <div className="flex items-center gap-2 text-tl-matcha justify-center lg:justify-start">
                        <Clock size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Time</span>
                     </div>
                     <p className="font-serif text-2xl italic">{product.steepingInstructions?.time || '3'} min</p>
                  </div>
                  <div className="space-y-3 text-right lg:text-left">
                     <div className="flex items-center gap-2 text-tl-matcha justify-end lg:justify-start">
                        <Leaf size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Amount</span>
                     </div>
                     <p className="font-serif text-2xl italic">{product.steepingInstructions?.amount || '2.5g'}</p>
                  </div>
               </div>
            </div>

            {/* Tabs / Storytelling */}
            <div className="py-12">
               <div className="flex gap-8 mb-8 border-b border-tl-soot/5 pb-4">
                  {['description', 'tasting', 'origin'].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all relative ${
                        activeTab === tab ? 'text-tl-soot' : 'text-tl-soot/30 hover:text-tl-soot/60'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <motion.div layoutId="activeTab" className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-tl-matcha" />
                      )}
                    </button>
                  ))}
               </div>

               <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="text-tl-soot/70 font-light leading-relaxed text-sm lg:text-base space-y-4"
                  >
                    {activeTab === 'description' && (
                      <p>{product.description || "Every leaf in this blend is chosen for its ability to anchor you in the present moment. This artisanal selection offers a bridge between heritage processing and modern stillness."}</p>
                    )}
                    {activeTab === 'tasting' && (
                      <ul className="grid grid-cols-2 gap-4 list-none p-0">
                         {['Complex Umami', 'Subtle Honey', 'Malty Undertones', 'Toasted Barley'].map((note, i) => (
                           <li key={i} className="flex items-center gap-3 border border-tl-soot/5 p-4 bg-white/50 italic font-serif">
                              <span className="h-1.5 w-1.5 rounded-full bg-tl-matcha" />
                              {note}
                           </li>
                         ))}
                      </ul>
                    )}
                    {activeTab === 'origin' && (
                      <div className="space-y-4 italic font-serif text-lg">
                        <p>High Altitude Estates &bull; Single Origin</p>
                        <p className="text-tl-soot/40 font-sans text-[10px] uppercase font-bold tracking-widest leading-none">Sustainability Verified</p>
                      </div>
                    )}
                  </motion.div>
               </AnimatePresence>
            </div>

            {/* Trust Badges */}
            <div className="mt-auto pt-12 grid grid-cols-2 gap-6 opacity-40">
               <div className="flex items-center gap-3 grayscale">
                  <Info size={14} />
                  <span className="text-[8px] uppercase font-bold tracking-[0.2em]">Free Returns</span>
               </div>
               <div className="flex items-center gap-3 grayscale">
                  <ShoppingBag size={14} />
                  <span className="text-[8px] uppercase font-bold tracking-[0.2em]">Plastic Free Shipping</span>
               </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
