import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroImage from '../../assets/hero.jpg';

const ParallaxHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const handleScrollToShop = () => {
    const element = document.getElementById('shop-section');
    if (element) {
      const offset = 80; // Navbar height
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
    <div ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center bg-rout-paper">
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/20 z-10" />
        <img 
          src={heroImage} 
          alt="Tea Plantation" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Content Layer - Centered */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-4 flex flex-col items-center"
      >
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="inline-block text-white/90 tracking-[0.3em] text-xs font-bold uppercase mb-4"
        >
          Established 2026
        </motion.span>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-decorative text-6xl md:text-8xl lg:text-[10rem] text-white mb-6 leading-none"
        >
          ROUT
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-white/80 text-xl font-light italic max-w-xl mx-auto mb-12"
        >
            The art of stillness in every cup.
        </motion.p>

        {/* Shop Now Button */}
        <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            onClick={handleScrollToShop}
            className="group relative px-10 py-4 bg-rout-matcha border-2 border-rout-matcha text-white text-xs uppercase tracking-[0.3em] font-bold overflow-hidden transition-all duration-500 hover:bg-transparent hover:text-rout-matcha"
        >
            <span className="relative z-10">Shop the Ritual</span>
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </div>
  );
};

export default ParallaxHero;
