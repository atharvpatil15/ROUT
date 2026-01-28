import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const Header = () => {
  const { toggleCart, items } = useCart();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-rout-paper/80 backdrop-blur-md border-b border-rout-soot/5 h-20 flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-serif text-3xl font-bold text-rout-soot tracking-tight">
          ROUT
        </Link>

        {/* Cart Icon */}
        <button onClick={toggleCart} className="text-rout-soot hover:text-rout-matcha transition-colors relative group">
           <ShoppingBag size={22} strokeWidth={1.5} />
           {items.length > 0 && (
             <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rout-matcha text-[10px] text-white">
               {items.length}
             </span>
           )}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
