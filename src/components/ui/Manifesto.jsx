"use client";

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Manifesto = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.8"]
  });

  // Staggered animations for text blocks
  const y1 = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const opacity1 = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  const y2 = useTransform(scrollYProgress, [0.3, 0.6], [50, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const y3 = useTransform(scrollYProgress, [0.6, 0.9], [50, 0]);
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  return (
    <section ref={containerRef} className="py-12 md:py-24 px-6 bg-white text-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-10 md:space-y-20 relative z-10">
            
            {/* Stanza 1: The Problem */}
            <motion.div style={{ y: y1, opacity: opacity1 }} className="space-y-4 md:space-y-6">
                <span className="text-black/30 font-semibold text-[8px] md:text-[10px] tracking-[0.5em] uppercase mb-4 md:mb-8 block">01 / The Noise</span>
                <p className="font-serif text-3xl md:text-6xl leading-tight italic">
                    The world is screaming. <br className="hidden md:block"/>
                    Your phone is blinking.
                </p>
                <p className="font-sans text-[8px] md:text-xs tracking-[0.4em] uppercase text-black/40">
                    Find the space between the notes.
                </p>
            </motion.div>

            {/* Stanza 2: The Rebellion */}
            <motion.div style={{ y: y2, opacity: opacity2 }} className="max-w-2xl mx-auto border-y border-black/5 py-12 md:py-16">
                <span className="text-black/30 font-semibold text-[8px] md:text-[10px] tracking-[0.5em] uppercase mb-4 md:mb-8 block">02 / The Cure</span>
                <p className="font-sans text-base md:text-xl tracking-wide leading-relaxed font-light text-black/80 italic px-4 md:px-0">
                    We reject the hustle. We reject the badge of burnout. <br className="hidden md:block"/>
                    Threaded Leaves is the <strong className="text-black font-semibold">analog cure</strong> for a digital virus.
                </p>
            </motion.div>

            {/* Stanza 3: The Solution */}
            <motion.div style={{ y: y3, opacity: opacity3 }} className="space-y-6 md:space-y-8">
                <span className="text-black/30 font-semibold text-[8px] md:text-[10px] tracking-[0.5em] uppercase mb-4 md:mb-8 block">03 / The Ritual</span>
                <p className="font-serif text-5xl md:text-8xl text-black leading-none italic">
                    Artisanal <br/>
                    <span className="text-tl-matcha">Stillness.</span>
                </p>
                
                <div className="pt-8 md:pt-12">
                     <button className="border border-black text-black px-8 md:px-10 py-3 md:py-4 rounded-none text-[10px] md:text-xs font-semibold uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all duration-500">
                        Our Story
                     </button>
                </div>
            </motion.div>

        </div>
    </section>
  );
};

export default Manifesto;
