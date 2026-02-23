"use client";

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';

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
      className="fixed top-0 left-0 right-0 z-50 bg-tl-paper/80 backdrop-blur-md border-b border-tl-soot/5 h-20 flex items-center"
    >
      <div className="container mx-auto px-6 flex items-center justify-between h-full">
        <Link href="/" className="font-serif text-2xl font-bold text-tl-soot tracking-tight">
          Threaded Leaves
        </Link>

        {/* Cart Icon */}
        <button onClick={toggleCart} className="text-tl-soot hover:text-tl-matcha transition-colors relative group">
           <ShoppingBag size={22} strokeWidth={1.5} />
           {items.length > 0 && (
             <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-tl-matcha text-[10px] text-white">
               {items.length}
             </span>
           )}
        </button>
      </div>
    </motion.header>
  );
};

export default Header;
