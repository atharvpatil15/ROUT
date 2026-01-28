import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartSidebar = () => {
  const { isOpen, toggleCart, items, removeFromCart, cartTotal } = useCart();

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
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-cream z-[70] shadow-2xl flex flex-col border-l border-brand-charcoal/5"
          >
            <div className="p-6 flex items-center justify-between border-b border-brand-charcoal/10">
              <h2 className="font-serif text-2xl text-brand-charcoal">Your Selection</h2>
              <button onClick={toggleCart} className="p-2 hover:bg-black/5 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-brand-gray opacity-50">
                    <p className="font-serif italic text-xl">Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={item.id} 
                    className="flex gap-4"
                  >
                    <div className="w-20 h-24 bg-[#EBEBE6] flex-shrink-0 overflow-hidden">
                         <img src={item.image || 'https://images.unsplash.com/photo-1594631252845-d9b502912443?q=80&w=2574&auto=format&fit=crop'} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-serif text-lg text-brand-charcoal">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-brand-gray hover:text-red-500 transition-colors">
                            <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-brand-gray mb-3">{item.category}</p>
                      <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 border border-brand-charcoal/20 px-2 py-1 rounded-full text-sm">
                                <button className="hover:text-brand-matcha"><Minus size={14}/></button>
                                <span className="w-4 text-center">{item.quantity}</span>
                                <button className="hover:text-brand-matcha"><Plus size={14}/></button>
                          </div>
                          <span className="font-medium">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-brand-charcoal/10 bg-white/50 backdrop-blur-md">
              <div className="flex justify-between items-center mb-4 text-lg font-serif">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <p className="text-xs text-brand-gray mb-6 text-center">Shipping & taxes calculated at checkout.</p>
              <Link 
                to="/checkout"
                onClick={toggleCart}
                className="block w-full bg-brand-charcoal text-white text-center py-4 hover:bg-brand-matcha transition-colors duration-300 tracking-wide uppercase text-sm font-medium"
              >
                Proceed to Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
