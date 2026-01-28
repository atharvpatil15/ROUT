import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TeaSection = ({ title, description, image, colorClass, align = 'left' }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen py-24 flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Image Column */}
            <div className={`relative ${align === 'right' ? 'lg:order-2' : 'lg:order-1'}`}>
                <motion.div 
                    style={{ y, opacity }}
                    className="relative aspect-[4/5] overflow-hidden rounded-sm"
                >
                     <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                     />
                     {/* Overlay Gradient */}
                     <div className={`absolute inset-0 opacity-20 mix-blend-multiply ${colorClass}`} />
                </motion.div>
                
                {/* Decorative floating label */}
                <motion.div 
                    initial={{ opacity: 0, x: align === 'right' ? 20 : -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`absolute -bottom-8 ${align === 'right' ? '-right-8' : '-left-8'} z-20 hidden lg:block`}
                >
                    <span className={`text-9xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-rout-soot/10 to-transparent pointer-events-none select-none`}>
                        {title.split(' ')[0]}
                    </span>
                </motion.div>
            </div>

            {/* Content Column */}
            <div className={`${align === 'right' ? 'lg:order-1' : 'lg:order-2'}`}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <span className={`inline-block mb-4 text-xs font-bold tracking-widest uppercase ${colorClass.replace('bg-', 'text-')}`}>
                        Premium Selection
                    </span>
                    <h2 className="font-serif text-5xl md:text-6xl text-rout-soot mb-8 leading-tight">
                        {title}
                    </h2>
                    <p className="text-lg text-rout-soot/70 font-light mb-10 leading-relaxed max-w-md">
                        {description}
                    </p>
                    <button className={`px-8 py-4 border border-rout-soot/20 text-rout-soot hover:border-rout-soot transition-colors duration-300 uppercase tracking-widest text-xs font-medium`}>
                        Shop Collection
                    </button>
                </motion.div>
            </div>
        </div>
    </section>
  );
};

export default TeaSection;
