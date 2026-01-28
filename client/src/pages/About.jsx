import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-rout-paper min-h-screen pb-32 font-sans selection:bg-rout-matcha selection:text-white">
        
        {/* 1. Cinematic Hero */}
        <div className="relative h-[80vh] flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 z-0">
                <img 
                    src="https://images.unsplash.com/photo-1531969179221-3946e6b5a5e7?q=80&w=2574&auto=format&fit=crop" 
                    alt="Misty Mountains" 
                    className="w-full h-full object-cover opacity-90 grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-rout-paper" />
            </div>
            
            <motion.div 
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative z-10 text-center max-w-5xl px-6"
            >
                <span className="block text-white/90 text-xs font-bold uppercase tracking-[0.4em] mb-6 drop-shadow-md">The Philosophy</span>
                <h1 className="font-decorative text-6xl md:text-8xl lg:text-9xl text-white leading-none mb-8 drop-shadow-xl">
                    Stillness <br/> <span className="font-serif italic font-light opacity-90 text-4xl md:text-6xl tracking-normal">in a screaming world.</span>
                </h1>
            </motion.div>
        </div>

        {/* 2. The Deep Dive (Scrollytelling Layout) */}
        <section className="max-w-7xl mx-auto px-6 py-24 space-y-40">
            
            {/* Chapter 1: The Problem */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="order-2 md:order-1 space-y-8">
                    <span className="text-rout-matcha font-mono text-xs uppercase tracking-widest">01 / The Noise</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-rout-soot leading-tight">
                        You are running on <br/> <span className="italic text-rout-spice">empty fumes.</span>
                    </h2>
                    <p className="text-rout-soot/70 text-lg leading-relaxed font-light">
                        We are the most connected generation in history, yet we feel the most isolated. 
                        Your brain wasn't designed to process 5,000 notifications a day. It was designed for silence. For focus. For flow.
                    </p>
                    <p className="text-rout-soot/70 text-lg leading-relaxed font-light">
                        We realized that "Energy Drinks" were part of the problem. They borrow energy from tomorrow to fuel today. They create a debt of anxiety.
                    </p>
                </div>
                <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm">
                     <img src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit=crop" alt="Chaos" className="w-full h-full object-cover grayscale contrast-125" />
                </div>
            </div>

            {/* Chapter 2: The Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div className="relative aspect-square md:aspect-[4/5] overflow-hidden rounded-sm">
                     <img src="https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=2521&auto=format&fit=crop" alt="Ritual" className="w-full h-full object-cover sepia-[20%]" />
                </div>
                <div className="space-y-8">
                    <span className="text-rout-matcha font-mono text-xs uppercase tracking-widest">02 / The Cure</span>
                    <h2 className="font-serif text-4xl md:text-5xl text-rout-soot leading-tight">
                        The Analog <br/> <span className="italic text-rout-matcha">Reset Button.</span>
                    </h2>
                    <p className="text-rout-soot/70 text-lg leading-relaxed font-light">
                        ROUT is a rebellion against speed. When you brew loose-leaf tea, you cannot rush. You must wait for the water. You must watch the leaves unfurl.
                    </p>
                    <p className="text-rout-soot/70 text-lg leading-relaxed font-light">
                        That 5-minute pause is not "wasted time." It is the moment your nervous system downshifts. It is a boundary you draw between yourself and the noise.
                    </p>
                </div>
            </div>

            {/* Chapter 3: The Science */}
            <div className="bg-rout-soot text-rout-paper p-12 md:p-24 rounded-3xl relative overflow-hidden">
                <div className="relative z-10 max-w-3xl mx-auto text-center space-y-8">
                    <span className="text-rout-matcha font-mono text-xs uppercase tracking-widest">03 / The Chemistry</span>
                    <h2 className="font-decorative text-4xl md:text-6xl leading-tight">
                        L-Theanine + Caffeine
                    </h2>
                    <p className="text-white/70 text-xl leading-relaxed font-light">
                        Coffee gives you a spike. Tea gives you a slope. 
                        Our blends are high in <strong className="text-white">L-Theanine</strong>, a rare amino acid that promotes alpha brain waves (the state of "relaxed alertness").
                    </p>
                    <p className="text-white/70 text-xl leading-relaxed font-light">
                        Combined with gentle caffeine, it creates a state of <strong className="text-white">Stillness in Motion</strong>. No jitters. No crash. Just pure, sustainable clarity.
                    </p>
                </div>
                {/* Decorative background grain */}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
            </div>

        </section>

        {/* 3. The Founders (Aesthetic Cards) */}
        <section className="max-w-6xl mx-auto px-6 py-24 border-t border-rout-soot/10">
            <div className="text-center mb-20">
                <span className="text-rout-matcha uppercase tracking-[0.2em] text-[10px] font-bold mb-3 block">Our Leadership</span>
                <h2 className="font-serif text-4xl text-rout-soot">The Architects</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                    {
                        name: "Aravind K.",
                        role: "Founder & Product",
                        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop",
                        quote: "I quit engineering to engineer a better fuel source for the human mind."
                    },
                    {
                        name: "Elena S.",
                        role: "Creative Director",
                        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop",
                        quote: "Design should be invisible, yet essential. Just like the ritual of tea."
                    }
                ].map((founder, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2 }}
                        className="bg-white p-8 rounded-3xl border border-rout-soot/5 shadow-sm hover:shadow-lg transition-all duration-500 group"
                    >
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 rounded-full overflow-hidden shrink-0 border border-rout-soot/10">
                                <img src={founder.img} alt={founder.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div>
                                <h3 className="font-serif text-2xl text-rout-soot">{founder.name}</h3>
                                <p className="text-xs font-bold text-rout-matcha uppercase tracking-widest mt-1">{founder.role}</p>
                            </div>
                        </div>
                        <p className="text-sm text-rout-soot/70 italic font-light leading-relaxed">
                            "{founder.quote}"
                        </p>
                    </motion.div>
                ))}
            </div>
        </section>
    </div>
  );
};

export default About;