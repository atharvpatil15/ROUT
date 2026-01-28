import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ProductScene = ({ title, subtitle, description, image, align = 'left' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <section ref={containerRef} className="h-screen w-full relative overflow-hidden snap-center flex items-center">
      {/* Dynamic Background Image */}
      <motion.div style={{ scale, y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/30 z-10" /> {/* Dimmer for text readability */}
        <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover object-center" 
        />
      </motion.div>

      {/* Content Overlay */}
      <div className={`relative z-20 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 ${align === 'right' ? 'direction-rtl' : ''}`}>
        <div className={`${align === 'right' ? 'md:col-start-2' : ''}`}>
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-20%" }}
                className="bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl border border-white/20 text-white shadow-2xl"
            >
                <motion.span variants={itemVariants} className="inline-block px-4 py-1 rounded-full border border-white/40 text-xs tracking-widest uppercase mb-6 bg-black/20">
                    {subtitle}
                </motion.span>
                
                <motion.h2 variants={itemVariants} className="font-serif text-6xl md:text-8xl mb-6 leading-[0.9]">
                    {title}
                </motion.h2>
                
                <motion.p variants={itemVariants} className="text-lg md:text-xl font-light opacity-90 leading-relaxed mb-8">
                    {description}
                </motion.p>

                <motion.div variants={itemVariants}>
                    <button className="bg-white text-rout-soot px-8 py-4 rounded-full font-medium hover:bg-rout-paper transition-colors">
                        View Ritual
                    </button>
                </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductScene;
