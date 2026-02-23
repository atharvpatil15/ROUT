"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag } from 'lucide-react';

// React Bits
import SplitText from '../bits/SplitText';
import ShinyText from '../bits/ShinyText';
import Magnetic from '../bits/Magnetic';

// Assets
import heroImage from '../../assets/hero.jpg';
import masalaImg from '../../assets/masala.jpg';
import orthodoxImg from '../../assets/orthodox.jpg';
import greenImg from '../../assets/green.jpg';

const resolveImageSrc = (image) => (typeof image === 'string' ? image : image?.src || '');

// --- Tea Tin Component (The "Jewels") ---
const TeaTin = ({ img, name, price, index, scrollY }) => {
  // Parallax: Each tin moves at slightly different speeds
  const y = useTransform(scrollY, [0, 1000], [0, -100 - (index * 50)]); 
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  
  return (
    <motion.div 
      style={{ y }}
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 + (index * 0.2), duration: 1 }}
      className="group relative flex flex-col items-center w-48 md:w-64"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full aspect-[3/4] rounded-t-full rounded-b-xl overflow-hidden shadow-2xl border-b-4 border-tl-gold/50 cursor-pointer bg-tl-forest/40">
        {/* Spotlight Effect */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(197, 160, 89, 0.3), transparent 70%)`
          }}
        />

        <div className="absolute inset-0 bg-tl-forest/20 group-hover:bg-transparent transition-all duration-500 z-10" />
        <img 
            src={resolveImageSrc(img)}
            alt={name} 
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </div>
      
      <div className="mt-6 text-center">
        <h3 className="font-serif text-2xl text-tl-ivory uppercase tracking-widest">{name}</h3>
        <p className="font-sans text-tl-gold text-xs tracking-[0.2em] mt-2 font-bold">${price}.00</p>
      </div>

      {/* Quick Add Button */}
      <Magnetic intensity={0.2}>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 px-6 py-2 border border-tl-gold text-tl-gold text-[10px] uppercase tracking-widest hover:bg-tl-gold hover:text-tl-forest transition-all duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
        >
          Add to Cart
        </motion.button>
      </Magnetic>
    </motion.div>
  );
};

// --- Main Hero Component ---
const ParallaxHero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const [isMobile, setIsMobile] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);

  // Parallax Transforms
  const bgY = useTransform(scrollY, [0, 1000], [0, 200]);
  const titleScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const titleOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const borderOpacity = useTransform(scrollY, [0, 100], [1, 0.5]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const scrollToShop = () => {
    document.getElementById('shop-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-tl-forest p-4 md:p-6 overflow-hidden">
        
      {/* 1. The Luxury Border Frame */}
      <motion.div 
        style={{ opacity: borderOpacity }}
        className="absolute inset-4 md:inset-6 border border-tl-gold/40 pointer-events-none z-50 flex flex-col justify-between"
      >
         <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-tl-gold" />
         <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-tl-gold" />
         <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-tl-gold" />
         <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-tl-gold" />
         
         <div className="w-full h-full flex items-center justify-center">
             <span className="text-tl-gold/20 text-[10px] uppercase tracking-[1em] rotate-90 absolute right-[-40px]">Est. 2026</span>
         </div>
      </motion.div>

      {/* 2. Background Layer (Far) */}
      <motion.div 
        style={!isMobile ? { y: bgY } : {}}
        className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
      >
        <div className="absolute inset-0 bg-tl-forest/60 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-tl-forest via-transparent to-tl-forest/40 z-10" />
        <img 
            src={resolveImageSrc(heroImage)}
            alt="Golden Hour Tea" 
            className="w-full h-full object-cover" 
        />
      </motion.div>

      {/* 3. Navigation Layer */}
      <nav className="relative z-40 pt-6 px-8 hidden md:flex justify-between items-center text-tl-ivory/80">
        <div className="flex gap-8 w-1/3">
            {['Tea', 'Accessories', 'Gifts'].map((item) => (
                <a key={item} href="#" className="text-[11px] uppercase tracking-[0.2em] hover:text-tl-gold transition-colors">{item}</a>
            ))}
        </div>
        <div className="w-1/3 flex justify-center"></div>
        <div className="flex gap-8 w-1/3 justify-end items-center">
            <a href="#" className="text-[11px] uppercase tracking-[0.2em] hover:text-tl-gold transition-colors">Locations</a>
            <a href="#" className="text-[11px] uppercase tracking-[0.2em] hover:text-tl-gold transition-colors">Our Story</a>
            <ShoppingBag size={18} className="text-tl-gold hover:text-white transition-colors cursor-pointer" />
        </div>
      </nav>

      {/* 4. Middle Layer: Brand Title & CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
         <motion.div 
            style={{ scale: titleScale, opacity: titleOpacity }}
            className="text-center"
         >
             <SplitText
                text="Threaded Leaves"
                className="font-decorative text-[10vw] md:text-[6vw] leading-none text-tl-ivory select-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
                delay={100}
                animationFrom={{ opacity: 0, transform: 'translate3d(0,50px,0)' }}
                animationTo={{ opacity: 1, transform: 'translate3d(0,0,0)' }}
                easing="easeOutCubic"
                threshold={0.1}
                rootMargin="-50px"
             />

             <div className="mt-4">
                <ShinyText 
                    text="Haute Couture Tea Rituals" 
                    className="font-sans text-tl-gold text-xs md:text-sm tracking-[0.4em] uppercase"
                    speed={5}
                />
             </div>
             
             <div className="mt-12 flex justify-center pointer-events-auto">
                <Magnetic intensity={0.3}>
                    <motion.button 
                        onClick={() => setTrayOpen(!trayOpen)}
                        className="group relative px-8 py-3 border border-tl-gold overflow-hidden transition-all duration-300 bg-tl-forest/20 backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 w-full h-full bg-tl-gold translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                        <span className="relative z-10 font-sans text-xs uppercase tracking-[0.25em] text-tl-gold group-hover:text-tl-forest font-bold flex items-center gap-2">
                            Discover Collection
                        </span>
                    </motion.button>
                </Magnetic>
             </div>
         </motion.div>
      </div>

      {/* 5. Near Layer: Floating Jewels */}
      {!isMobile && (
          <div className="absolute bottom-0 left-0 right-0 h-[40vh] z-30 flex justify-center gap-12 md:gap-24 pointer-events-none">
             <div className="pointer-events-auto translate-y-[20%]">
                 <TeaTin img={masalaImg} name="Masala" price="24" index={0} scrollY={scrollY} />
             </div>
             <div className="pointer-events-auto translate-y-[40%]">
                 <TeaTin img={orthodoxImg} name="Orthodox" price="32" index={1} scrollY={scrollY} />
             </div>
             <div className="pointer-events-auto translate-y-[20%]">
                 <TeaTin img={greenImg} name="Green" price="28" index={2} scrollY={scrollY} />
             </div>
          </div>
      )}

      {/* 6. Glassmorphic Tray */}
      <AnimatePresence>
        {(trayOpen || isMobile) && (
            <motion.div 
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={{ type: "spring", damping: 25, stiffness: 100 }}
                className={`absolute bottom-0 left-0 right-0 bg-tl-forest/90 backdrop-blur-xl border-t border-tl-gold/30 z-50 p-6 md:p-8 ${!isMobile && !trayOpen ? 'pointer-events-none opacity-0' : ''}`}
            >
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="text-center md:text-left">
                        <h4 className="font-serif text-2xl text-tl-ivory italic">The Signature Trio</h4>
                        <p className="text-tl-ivory/50 text-xs tracking-wide">Limited harvest from our Kyoto estates.</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <Magnetic intensity={0.1}>
                            <button onClick={scrollToShop} className="bg-tl-gold text-tl-forest px-8 py-3 font-sans text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                                Shop Full Menu
                            </button>
                        </Magnetic>
                        {!isMobile && (
                             <button onClick={() => setTrayOpen(false)} className="text-tl-gold text-xs uppercase underline underline-offset-4 hover:text-white mt-3">
                                Close
                             </button>
                        )}
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
      
      {/* Scroll Indicator */}
      <motion.div 
         style={{ opacity: titleOpacity }}
         className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
         <div className="w-[1px] h-16 bg-gradient-to-b from-tl-gold to-transparent" />
         <span className="text-tl-gold/60 text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      </motion.div>

    </div>
  );
};

export default ParallaxHero;
