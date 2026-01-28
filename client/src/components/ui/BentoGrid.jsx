import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { useCart } from '../../context/CartContext';

const BentoCard = ({ product, index }) => {
    const { addToCart } = useCart();
    
    return (
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative h-[400px] rounded-3xl overflow-hidden bg-rout-stone border border-rout-soot/5"
        >
            <img src={product.image} alt={product.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-end">
                <div>
                    <h3 className="text-white font-serif text-2xl mb-1">{product.name}</h3>
                    <p className="text-white/70 text-sm font-sans">{product.price} USD</p>
                </div>
                
                <MagneticButton 
                    onClick={() => addToCart(product)}
                    className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-rout-soot transition-all duration-300"
                >
                    <Plus size={24} />
                </MagneticButton>
            </div>
        </motion.div>
    )
}

const BentoGrid = ({ products }) => {
  return (
    <section className="py-24 px-4 bg-rout-paper snap-start">
        <div className="max-w-7xl mx-auto">
            <motion.div 
                initial={{ opacity: 0 }} 
                whileInView={{ opacity: 1 }}
                className="flex justify-between items-end mb-12"
            >
                <h2 className="font-serif text-5xl text-rout-soot">Quick Shop</h2>
                <span className="hidden md:inline-block text-rout-soot/40 uppercase tracking-widest text-xs">Curated for You</span>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {products.map((p, i) => (
                    <BentoCard key={p.id} product={p} index={i} />
                ))}
            </div>
        </div>
    </section>
  );
};

export default BentoGrid;
