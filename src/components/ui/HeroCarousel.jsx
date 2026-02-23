"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

import cr1 from '../../assets/CR1.png'; // Orthdox / Pure
import cr2 from '../../assets/CR2.png'; // Green
import cr3 from '../../assets/CR3.png'; // Masala / Spiced
import cr4 from '../../assets/CR4.png'; // General Collection

const slides = [
  {
    image: cr1,
    title: "The Orthodox Standard.",
    subtitle: "Traditional whole-leaf processing. Deeply malty, unapologetically sophisticated, and masterfully artisanal.",
    accent: "from-white via-white/90 to-white/60"
  },
  {
    image: cr2,
    title: "Vibrant Green Vitality.",
    subtitle: "Hand-picked antioxidant power. Clear the fog with our crisp, natural, and rejuvenating Japanese leaves.",
    accent: "from-vibe-electric via-white to-white"
  },
  {
    image: cr3,
    title: "The Spiced Rebellion.",
    subtitle: "A high-octane blend of manual-ground cloves and cardamom. Bold, aromatic, and engineered for focus.",
    accent: "from-white via-white/80 to-white/50"
  },
  {
    image: cr4,
    title: "The Pure Collection.",
    subtitle: "Sustainably sourced from single-estate farms. Minimalist, hand-processed, and designed for your daily ritual.",
    accent: "from-white via-white/90 to-white/70"
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
    <section className="relative w-full aspect-video md:h-[95vh] overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
             <motion.img 
               initial={{ scale: 0.95 }}
               animate={{ scale: 0.85 }}
               transition={{ duration: 10, ease: "linear" }}
               src={slides[current].image.src || slides[current].image} 
               alt="Hero" 
               className="w-full h-full object-contain object-center md:object-right-bottom opacity-80" 
             />
             <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-black via-black/40 to-transparent" />
          </div>

          {/* Content - Aligned Left with Gradient Text */}
          <div className="relative z-10 h-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col justify-center items-center md:items-start text-center md:text-left">
             <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="max-w-3xl"
             >
                <h1 className={`text-4xl md:text-6xl lg:text-[7rem] font-serif leading-[1.1] md:leading-[1] mb-6 md:mb-8 italic bg-gradient-to-br ${slides[current].accent} bg-clip-text text-transparent`}>
                  {slides[current].title}
                </h1>
                
                <p className="text-xs md:text-xl text-white/60 font-sans tracking-wide mb-8 md:mb-12 max-w-xl font-light leading-relaxed mx-auto md:mx-0">
                  {slides[current].subtitle}
                </p>

                <button 
                  onClick={scrollToShop}
                  className="group relative px-8 md:px-12 py-4 md:py-5 overflow-hidden border border-white/20 hover:border-white transition-colors duration-500"
                >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    <span className="relative text-white group-hover:text-black font-sans text-[10px] md:text-xs uppercase tracking-[0.4em] font-bold">
                        Explore Collection
                    </span>
                </button>
             </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators */}
      <div className="absolute bottom-16 left-12 z-20 flex flex-col gap-6">
        {slides.map((_, i) => (
          <button 
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-[1px] transition-all duration-700 ${i === current ? 'h-16 bg-white' : 'h-6 bg-white/20'}`}
          />
        ))}
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-16 right-12 z-20 flex gap-1">
          <button 
            onClick={() => setCurrent((prev) => (prev - 1 + slides.length) % slides.length)}
            className="w-16 h-16 border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all duration-500"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
            className="w-16 h-16 border border-white/5 flex items-center justify-center text-white/30 hover:text-white hover:bg-white/5 transition-all duration-500"
          >
            <ChevronRight size={20} />
          </button>
      </div>
    </section>
  );
};

export default HeroCarousel;
