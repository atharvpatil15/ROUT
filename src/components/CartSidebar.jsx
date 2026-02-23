"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

const CartSidebar = () => {
  const { isOpen, toggleCart, items, removeFromCart, cartTotal, addToCart, decreaseQuantity } = useCart(); // added addToCart for +/- logic if needed, or just keep as is

  // Calculate free shipping progress (e.g., free shipping over $100)
  const freeShippingThreshold = 100;
  const progress = Math.min((cartTotal / freeShippingThreshold) * 100, 100);
  const remaining = freeShippingThreshold - cartTotal;

  // Helper to update quantity directly if context supports it, 
  // otherwise we might need to modify Context to support updateQuantity(id, qty)
  // For now, I'll assume adding/removing works for increment/decrement if logic allows, 
  // but looking at CartContext, addToCart increments, but we don't have a simple decrement without remove.
  // The original code used a simple display. Let's stick to the visual refactor mostly.
  
  // NOTE: The previous context implementation for 'addToCart' adds +1. 
  // 'removeFromCart' removes the item entirely. 
  // To support -1 properly without removing, we'd ideally need a 'updateQuantity' in context.
  // For this step, I will stick to the existing functional logic but styling it better.

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-tl-soot/20 z-[60] backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", ease: "circOut", duration: 0.5 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-tl-paper z-[70] shadow-2xl flex flex-col border-l border-tl-soot/5"
          >
            {/* Header */}
            <div className="p-6 md:p-8 flex items-center justify-between border-b border-tl-soot/5 bg-tl-paper relative z-10">
              <h2 className="font-serif text-3xl text-tl-soot italic">Your Selection</h2>
              <button 
                onClick={toggleCart} 
                className="p-2 -mr-2 text-tl-soot/50 hover:text-tl-soot hover:bg-tl-soot/5 rounded-full transition-all duration-300"
              >
                <X size={24} strokeWidth={1.5} />
              </button>
            </div>

            {/* Free Shipping Bar */}
            <div className="px-6 md:px-8 py-4 bg-white/50 border-b border-tl-soot/5">
              <div className="flex justify-between items-end mb-2">
                <p className="text-xs font-sans uppercase tracking-widest text-tl-soot/70">
                  {remaining > 0 ? (
                    <>Add <span className="font-bold text-tl-matcha">${remaining.toFixed(2)}</span> for free shipping</>
                  ) : (
                    <span className="text-tl-matcha font-bold">You've earned free shipping</span>
                  )}
                </p>
                <span className="text-[10px] font-bold text-tl-soot/40">{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-1 bg-tl-soot/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-tl-matcha rounded-full"
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-tl-soot/40 space-y-4">
                    <ShoppingBag size={48} strokeWidth={1} />
                    <p className="font-serif italic text-xl">Your cart is empty.</p>
                    <button onClick={toggleCart} className="text-xs font-bold uppercase tracking-widest border-b border-tl-soot/40 hover:border-tl-soot hover:text-tl-soot transition-colors pb-0.5">
                      Start Shopping
                    </button>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    key={item.id} 
                    className="flex gap-5 group"
                  >
                    {/* Product Image */}
                    <div className="w-24 h-32 bg-tl-stone/30 flex-shrink-0 overflow-hidden rounded-sm relative">
                         <img 
                           src={item.image || 'https://images.unsplash.com/photo-1594631252845-d9b502912443?q=80&w=2574&auto=format&fit=crop'} 
                           alt={item.name} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                         />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="font-serif text-lg text-tl-soot leading-tight">{item.name}</h3>
                          <span className="font-sans text-sm font-medium text-tl-soot">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                        <p className="text-xs text-tl-soot/50 mt-1 uppercase tracking-wider">{item.category}</p>
                      </div>

                      <div className="flex justify-between items-end">
                          {/* Quantity Control */}
                          <div className="flex items-center gap-4 bg-white/60 border border-tl-soot/10 px-3 py-1.5 rounded-full text-sm shadow-sm">
                                {/* Note: Ideally we want separate decrease function. For now, reusing add. Decrease needs context update. 
                                    I will just render the static count logic for safety unless I update context.
                                    The original code had buttons but no clear decrement logic other than remove. 
                                    I'll keep the buttons but they might just re-add for now if I don't fix context.
                                    Actually, let's just make them look good. 
                                */}
                                <button 
                                  onClick={() => decreaseQuantity(item.id)}
                                  className="text-tl-soot/40 hover:text-tl-matcha transition-colors"
                                >
                                  <Minus size={12}/>
                                </button>
                                <span className="w-4 text-center font-medium text-tl-soot text-xs">{item.quantity}</span>
                                <button 
                                  onClick={() => addToCart(item)}
                                  className="text-tl-soot/40 hover:text-tl-matcha transition-colors"
                                >
                                  <Plus size={12}/>
                                </button>
                          </div>
                          
                          <button 
                            onClick={() => removeFromCart(item.id)} 
                            className="text-tl-soot/30 hover:text-red-900 transition-colors pb-1 border-b border-transparent hover:border-red-900/30"
                          >
                            <span className="text-[10px] uppercase font-bold tracking-widest">Remove</span>
                          </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-6 md:p-8 bg-white border-t border-tl-soot/5">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center text-tl-soot/60 text-sm">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-tl-soot/60 text-sm">
                  <span>Shipping</span>
                  <span className={remaining <= 0 ? "text-tl-matcha" : ""}>
                    {remaining <= 0 ? "Free" : "Calculated at checkout"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xl font-serif text-tl-soot pt-4 border-t border-dashed border-tl-soot/20">
                  <span className="italic">Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              
              <Link 
                href="/checkout"
                onClick={toggleCart}
                className="block w-full bg-tl-soot text-white text-center py-4 rounded-sm hover:bg-tl-matcha hover:scale-[1.01] transition-all duration-500 tracking-widest uppercase text-xs font-bold shadow-lg"
              >
                Proceed to Checkout
              </Link>
              <p className="mt-4 text-[10px] text-center text-tl-soot/40 uppercase tracking-widest">
                Secure Checkout • Free Returns
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
