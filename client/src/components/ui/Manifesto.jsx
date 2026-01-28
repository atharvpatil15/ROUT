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
    <section ref={containerRef} className="py-40 px-6 bg-rout-soot text-rout-paper relative overflow-hidden">
        {/* Background Texture (Noise) for Gen Z aesthetic */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

        <div className="max-w-4xl mx-auto text-center space-y-24 relative z-10">
            
            {/* Stanza 1: The Problem */}
            <motion.div style={{ y: y1, opacity: opacity1 }} className="space-y-4">
                <p className="font-serif text-3xl md:text-5xl leading-tight text-white/60">
                    The world is screaming. <br/>
                    Your phone is blinking.
                </p>
                <p className="font-serif text-4xl md:text-6xl text-white">
                    And you? <br/>
                    <span className="italic font-light text-rout-matcha">You're just trying to breathe.</span>
                </p>
            </motion.div>

            {/* Stanza 2: The Rebellion */}
            <motion.div style={{ y: y2, opacity: opacity2 }} className="max-w-2xl mx-auto">
                <div className="h-[1px] w-12 bg-rout-matcha mx-auto mb-8"></div>
                <p className="font-sans text-lg md:text-xl tracking-wide leading-relaxed font-light text-white/80">
                    We reject the hustle. We reject the badge of burnout. <br/>
                    ROUT is the <strong className="text-white font-bold">analog cure</strong> for a digital virus.
                </p>
            </motion.div>

            {/* Stanza 3: The Solution */}
            <motion.div style={{ y: y3, opacity: opacity3 }} className="space-y-6">
                <p className="font-decorative text-4xl md:text-6xl text-white leading-none">
                    It’s not just tea. <br/>
                    It’s a boundary.
                </p>
                <p className="font-sans text-sm uppercase tracking-[0.3em] text-white/40">
                    Between you and the noise.
                </p>
                
                <div className="pt-12">
                     <span className="inline-block border border-rout-matcha text-rout-matcha px-6 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-rout-matcha hover:text-white transition-all duration-500 cursor-none">
                        Reclaim Your Mind
                     </span>
                </div>
            </motion.div>

        </div>
    </section>
  );
};

export default Manifesto;