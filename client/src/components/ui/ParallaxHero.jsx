import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import heroImage from '../../assets/hero.jpg';

const PHRASES = [
  "No jitters. Just focus.",
  "Main Character Energy.",
  "Sip. Reset. Repeat.",
  "Your Daily Ritual.",
  "Pure Leaf. Zero Crash."
];

const ParallaxHero = () => {
  const ref = useRef(null);
  const [index, setIndex] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Rotate phrases every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % PHRASES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={ref} className="relative h-screen overflow-hidden flex items-center justify-center bg-brand-cream">
      {/* Parallax Background Layer */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-black/30 z-10" />
        <img 
          src={heroImage} 
          alt="Tea Plantation" 
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Floating Elements (Decorative) */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-brand-matcha rounded-full mix-blend-multiply filter blur-3xl opacity-30 z-0"
        animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
        }}
        transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
        }}
      />

      {/* Content Layer */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-20 text-center px-4"
      >
        {/* Rotating Gen Z Phrase */}
        <div className="h-8 mb-4 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.span 
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="inline-block text-brand-matcha bg-white/90 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm"
                >
                    {PHRASES[index]}
                </motion.span>
            </AnimatePresence>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-decorative text-6xl md:text-8xl lg:text-9xl text-white mb-6 leading-none drop-shadow-lg"
        >
          ROUT
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-white/90 text-xl font-light italic max-w-xl mx-auto drop-shadow-md"
        >
            "The art of stillness in every cup."
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/60 text-xs tracking-widest uppercase">Start The Ritual</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </div>
  );
};

export default ParallaxHero;