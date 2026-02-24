"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import cr1 from '../../assets/CR1.png'; // Orthdox / Pure
import cr2 from '../../assets/CR2.png'; // Green
import cr3 from '../../assets/CR3.png'; // Masala / Spiced
import cr4 from '../../assets/CR4.png'; // General Collection
import rHero from '../../assets/R hero.png'; // Responsive Mobile Hero

const slides = [
  {
    image: cr1,
    title: "The Masala Ritual.",
    subtitle: "A bold, high-octane blend of hand-ground ginger, cloves, and heritage spices. Engineered for the modern rebellion.",
    accent: "from-[#FF9900] via-white to-white/70"
  },
  {
    image: cr2,
    title: "Vibrant Green Vitality.",
    subtitle: "Clear the digital fog with hand-picked antioxidant power. Crisp, natural, and sustainably sourced Japanese leaves.",
    accent: "from-vibe-electric via-white to-white"
  },
  {
    image: cr3,
    title: "Aromatic Cardamom.",
    subtitle: "The 'Queen of Spices' meets premium whole leaves. A fragrant, soothing sanctuary for the most refined palates.",
    accent: "from-[#FFD700] via-white to-white/60"
  },
  {
    image: cr4,
    title: "The Orthodox Standard.",
    subtitle: "Traditional whole-leaf processing at its peak. Deeply malty, unapologetically sophisticated, and masterfully artisanal.",
    accent: "from-white via-white/90 to-white/60"
  }
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const scrollToShop = (e) => {
    e.preventDefault();
    const element = document.getElementById('shop-section');
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative w-full bg-black overflow-hidden flex flex-col md:block h-auto md:h-[95vh]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="relative md:absolute md:inset-0 flex flex-col md:block"
        >
          {/* Background Image Container */}
          <div className="relative w-full aspect-[4/5] md:aspect-auto md:absolute md:inset-0 z-0 bg-black overflow-hidden">
             {/* Desktop Images */}
             <motion.img 
               initial={{ scale: 0.98 }}
               animate={{ scale: 1 }}
               transition={{ duration: 10, ease: "easeOut" }}
               src={slides[current].image.src || slides[current].image} 
               alt="Hero Desktop" 
               className="hidden md:block w-full h-full object-cover md:object-center opacity-80" 
             />
             {/* Mobile Responsive Image */}
             <motion.img 
               initial={{ scale: 0.99 }}
               animate={{ scale: 1 }}
               transition={{ duration: 10, ease: "easeOut" }}
               src={rHero.src || rHero} 
               alt="Hero Mobile" 
               className="md:hidden w-full h-full object-cover opacity-90" 
             />
             {/* Gradient for Desktop Only */}
             <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          </div>

          {/* Content Container */}
          <div className="relative z-10 bg-black md:bg-transparent py-12 md:py-0 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
             <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-3xl"
             >
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-[7rem] font-serif leading-[1.1] md:leading-[1] mb-6 md:mb-8 italic bg-gradient-to-br ${slides[current].accent} bg-clip-text text-transparent drop-shadow-2xl`}>
                  {slides[current].title}
                </h1>
                
                <p className="text-sm md:text-xl text-white/70 font-sans tracking-wide mb-10 md:mb-12 max-w-xl font-light leading-relaxed mx-auto md:mx-0 px-4 md:px-0">
                  {slides[current].subtitle}
                </p>

                <div className="flex justify-center md:justify-start">
                  <button 
                    onClick={scrollToShop}
                    className="group relative px-10 md:px-12 py-4 md:py-5 overflow-hidden border border-white/20 hover:border-white transition-colors duration-500 bg-white/5 backdrop-blur-sm"
                  >
                      <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                      <span className="relative text-white group-hover:text-black font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
                          Explore Collection
                      </span>
                  </button>
                </div>
             </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators - Adjusted for mobile position */}
      <div className="absolute top-[40%] md:top-auto md:bottom-16 left-4 md:left-12 z-20 flex flex-col gap-4 md:gap-6">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-700 ${i === current ? 'h-10 md:h-16 bg-white' : 'h-4 md:h-6 bg-white/20'} w-[1px]`}
          />
        ))}
      </div>

      {/* Navigation Controls - Hidden on smallest mobile to keep it clean, shown on md */}
      <div className="absolute bottom-6 right-6 md:bottom-16 md:right-12 z-20 hidden sm:flex gap-1">
          <button 
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="w-12 h-12 md:w-16 md:h-16 border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all duration-500"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="w-12 h-12 md:w-16 md:h-16 border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all duration-500"
          >
            <ChevronRight size={20} />
          </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
