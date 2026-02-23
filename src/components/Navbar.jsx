"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../assets/TL Logo.png';
import RollingText from './bits/RollingText';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleCart, items } = useCart();
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenu, setMobileMenu] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Ready to sign off?")) logout();
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    if (pathname !== '/') {
      router.push('/?scrollToShop=1');
    } else {
      const element = document.getElementById('shop-section');
      if (element) {
        const offset = 120;
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-[100] transition-all duration-300">
      {/* 1. Ultra-Vibrant Announcement Bar */}
      <div className="bg-vibe-electric text-black py-1.5 text-center text-[10px] uppercase tracking-[0.3em] font-black font-sans">
        Main Character Energy. 15% Off Your First Ritual.
      </div>

      {/* 2. Sleek Professional Navbar */}
      <nav className="bg-black/95 backdrop-blur-md border-b border-white/5 px-6 md:px-12 h-20 flex items-center">
        <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center h-full">
          
          {/* Left: Nav Links */}
          <div className="hidden lg:flex items-center gap-10">
              <Link href="/" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all">
                Home
              </Link>
              <a href="#shop-section" onClick={handleShopClick} className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all">
                Shop
              </a>
          </div>

          {/* Center: Iconic Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
             <div className="h-20 w-20 transition-all duration-700 flex items-center justify-center">
                <img src={logo.src || logo} alt="Threaded Leaves" className="w-full h-full object-contain filter brightness-110 drop-shadow-sm scale-90" />
             </div>
          </Link>

          {/* Right: Functional Links & Icons */}
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-10 mr-4">
                <Link href="/about" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all">
                  About Us
                </Link>
                <Link href="/contact" className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50 hover:text-white transition-all">
                  Contact
                </Link>
            </div>

            <div className="flex items-center gap-5 border-l border-white/10 pl-8">
                <Link href={user ? "/profile" : "/login"} className="text-white/70 hover:text-vibe-electric transition-colors">
                   <User size={18} strokeWidth={2.5} />
                </Link>

                <button onClick={toggleCart} className="relative text-white/70 hover:text-vibe-electric transition-colors group">
                  <div className="relative">
                    <ShoppingBag size={20} strokeWidth={2} />
                    {items.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-vibe-electric text-black text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center animate-pulse">
                           {items.length}
                        </span>
                    )}
                  </div>
                </button>
                
                <button className="lg:hidden text-white" onClick={() => setMobileMenu(true)}>
                  <Menu size={22} strokeWidth={2.5} />
                </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 bg-white text-black z-[110] p-10"
          >
            <div className="flex justify-between items-center mb-10">
               <h1 className="font-decorative text-lg font-black">Threaded Leaves</h1>
               <button onClick={() => setMobileMenu(false)}><X size={28}/></button>
            </div>
            <div className="flex flex-col gap-6">
              <Link href="/" onClick={() => setMobileMenu(false)} className="text-3xl font-bold uppercase tracking-tighter">Home</Link>
              <a href="#shop-section" onClick={(e) => { handleShopClick(e); setMobileMenu(false); }} className="text-3xl font-bold uppercase tracking-tighter">Shop</a>
              <Link href="/about" onClick={() => setMobileMenu(false)} className="text-3xl font-bold uppercase tracking-tighter">About Us</Link>
              <Link href="/contact" onClick={() => setMobileMenu(false)} className="text-3xl font-bold uppercase tracking-tighter">Contact</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
