"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ShoppingBag, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

import logo from '../assets/TL Logo.jpeg';
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

      {/* 2. Navbar */}
      <nav className="bg-black/95 backdrop-blur-md border-b border-white/5 px-6 md:px-12 h-20 flex items-center">
        <div className="max-w-[1400px] mx-auto w-full flex justify-between items-center h-full">
          
          {/* Left: Branding */}
          <div className="flex items-center">
              <Link href="/" className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/40 hover:text-white transition-colors hidden lg:block">
                Threaded Leaves
              </Link>
          </div>

          {/* Center: Iconic Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 group z-10">
             <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-[70px] md:w-[70px] transition-all duration-700 flex items-center justify-center rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl">
                <img src={logo.src || logo} alt="Threaded Leaves" className="w-full h-full object-cover filter brightness-110 transition-transform duration-700 group-hover:scale-110" />
             </div>
          </Link>

          {/* Right: Desktop Links & Mobile Trigger */}
          <div className="flex items-center gap-8">
              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">
                <Link href="/" className="hover:text-tl-matcha transition-colors">Home</Link>
                <a href="#shop-section" onClick={handleShopClick} className="hover:text-tl-matcha transition-colors cursor-pointer">Shop</a>
                <Link href="/about" className="hover:text-tl-matcha transition-colors">About</Link>
                <Link href="/contact" className="hover:text-tl-matcha transition-colors">Contact</Link>
              </div>

              {/* Desktop Utility Icons */}
              <div className="hidden lg:flex items-center gap-6 border-l border-white/10 pl-8 ml-2">
                <Link href={user ? "/profile" : "/login"} className="text-white/60 hover:text-tl-matcha transition-colors">
                  <User size={18} strokeWidth={1.5} />
                </Link>
                <button onClick={toggleCart} className="text-white/60 hover:text-tl-matcha transition-colors relative">
                  <ShoppingBag size={18} strokeWidth={1.5} />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-tl-matcha text-black text-[8px] font-black h-4 w-4 rounded-full flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Mobile Menu Trigger (Visible only on mobile/tablet) */}
              <button 
                className="lg:hidden text-white hover:text-tl-matcha transition-colors p-2" 
                onClick={() => setMobileMenu(true)}
              >
                <Menu size={24} strokeWidth={1.5} />
              </button>
          </div>
        </div>
      </nav>

      {/* Full Screen Overlay Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-black text-white z-[110] flex flex-col"
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center p-8 md:px-12 md:py-10">
               <div className="h-16 w-16 rounded-full overflow-hidden border border-white/20 shadow-xl">
                  <img src={logo.src || logo} alt="TL" className="w-full h-full object-cover brightness-110" />
               </div>
               <button onClick={() => setMobileMenu(false)} className="text-white/60 hover:text-white transition-colors">
                  <X size={32} strokeWidth={1}/>
               </button>
            </div>

            {/* Menu Content */}
            <div className="flex-grow flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 px-8">
              {/* Primary Links */}
              <div className="flex flex-col items-center md:items-start gap-4 md:gap-8">
                <Link href="/" onClick={() => setMobileMenu(false)} className="text-4xl md:text-7xl font-serif italic hover:text-tl-matcha transition-colors">Home</Link>
                <a href="#shop-section" onClick={(e) => { handleShopClick(e); setMobileMenu(false); }} className="text-4xl md:text-7xl font-serif italic hover:text-tl-matcha transition-colors">Shop</a>
                <Link href="/about" onClick={() => setMobileMenu(false)} className="text-4xl md:text-7xl font-serif italic hover:text-tl-matcha transition-colors">About</Link>
                <Link href="/contact" onClick={() => setMobileMenu(false)} className="text-4xl md:text-7xl font-serif italic hover:text-tl-matcha transition-colors">Contact</Link>
              </div>

              {/* Utility Section (Profile & Cart) */}
              <div className="flex flex-col items-center md:items-start gap-8 border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12">
                <Link 
                  href={user ? "/profile" : "/login"} 
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 group-hover:text-tl-matcha transition-colors">Account</p>
                    <p className="font-serif text-xl italic">{user ? user.name.split(' ')[0] : 'Sign In'}</p>
                  </div>
                </Link>

                <button 
                  onClick={() => { toggleCart(); setMobileMenu(false); }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all relative">
                    <ShoppingBag size={20} />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-tl-matcha text-black text-[9px] font-bold h-5 w-5 rounded-full flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 group-hover:text-tl-matcha transition-colors">Bag</p>
                    <p className="font-serif text-xl italic">View Ritual</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Menu Footer */}
            <div className="p-12 text-center">
               <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">Engineering Stillness © 2024</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
