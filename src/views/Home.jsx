"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroCarousel from '../components/ui/HeroCarousel';
import ProductCard from '../components/ui/ProductCard';
import Manifesto from '../components/ui/Manifesto';
import { motion } from 'framer-motion';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filters, setFilters] = useState(['All']);

  // 1. Fetch Products from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      // If auth is still checking, wait (to ensure headers are ready)
      if (authLoading) return;

      try {
        setLoading(true);
        const res = await api.get('/products');
        const fetchedProducts = res.data?.data?.products;
        
        if (Array.isArray(fetchedProducts)) {
            const mappedProducts = fetchedProducts.map(p => ({
                id: p._id,
                name: p.name,
                price: p.price,
                category: p.category,
                description: p.description,
                image: p.images && p.images.length > 0 ? p.images[0] : null
            }));
            setProducts(mappedProducts);

            // Dynamically generate filters
            const categories = ['All', ...new Set(fetchedProducts.map(p => p.category))];
            setFilters(categories);
        }
      } catch (err) {
        console.error("API Error:", err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [authLoading, user]); // Re-run when auth settles or user changes

  // 2. Scroll Handling
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    if (params.get('scrollToShop') === '1') {
      const element = document.getElementById('shop-section');
      if (element) {
        setTimeout(() => {
          const offset = 120;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: elementPosition, behavior: 'smooth' });
        }, 100);
      }
      router.replace('/');
    }
  }, [router]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (!categoryParam) return;

    const normalized = categoryParam.toLowerCase();
    const categoryAliases = {
      masala: 'spiced',
      orthodox: 'pure',
    };
    const target = categoryAliases[normalized] || normalized;
    const match = filters.find((f) => f.toLowerCase() === target);
    if (match) {
      setActiveFilter(match);
    }
  }, [filters]);

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="bg-white">
      <HeroCarousel />
      
      {/* Brand Manifesto */}
      <Manifesto />

      {/* Compact Production-Level Value Pillars Section */}
      <section className="py-12 md:py-20 bg-white border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
                  {[
                    {
                      title: "Artisanal Purity",
                      desc: "Single-estate farms. Hand-processed traditions.",
                      icon: "01"
                    },
                    {
                      title: "Engineered Stillness",
                      desc: "Precision blended for relaxed alertness.",
                      icon: "02"
                    },
                    {
                      title: "Analog Connection",
                      desc: "Escape the noise, one steep at a time.",
                      icon: "03"
                    }
                  ].map((pillar, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1, duration: 0.6 }}
                      className="flex flex-col items-center text-center group border-l md:border-l-0 md:border-t border-black/5 pt-6 md:pt-8 pl-6 md:pl-0"
                    >
                      <span className="font-serif text-4xl text-tl-matcha/20 mb-2 italic">{pillar.icon}</span>
                      <h3 className="font-serif text-xl md:text-2xl text-black mb-2 italic">{pillar.title}</h3>
                      <p className="text-black/50 font-light text-xs md:text-sm leading-relaxed max-w-[200px]">
                        {pillar.desc}
                      </p>
                    </motion.div>
                  ))}
              </div>
          </div>
      </section>
      
      {/* Shop Collection Section (Full Shop Integrated) */}
      <section id="shop-section" className="py-16 md:py-24 px-6 bg-[#F9F7F2]">
        <div className="max-w-7xl mx-auto">
           {/* Header */}
           <div className="text-center mb-16">
              <span className="text-tl-matcha font-semibold text-[10px] tracking-[0.4em] uppercase mb-4 block">Selected Rituals</span>
              <h2 className="font-serif text-3xl md:text-6xl text-black mb-6 italic">Shop the Collection</h2>
              <p className="text-black/50 max-w-xl mx-auto font-light text-sm tracking-wide leading-relaxed">
                  Sustainably sourced from single-estate farms. Processed by hand. <br/>
                  Engineered for stillness.
              </p>
           </div>
           
           {/* Filters */}
           <div className="flex justify-start md:justify-center gap-6 md:gap-10 mb-12 md:mb-16 overflow-x-auto no-scrollbar py-4 -mx-6 px-6 md:mx-0 md:px-0">
                {filters.map((filter) => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`text-[9px] md:text-[10px] uppercase tracking-[0.3em] font-semibold transition-all border-b-2 pb-1 whitespace-nowrap ${
                            activeFilter === filter 
                            ? 'text-black border-black' 
                            : 'text-black/30 border-transparent hover:text-black/60'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
           </div>

           {/* Dynamic Grid */}
           {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
                  {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                  ))}
               </div>
           ) : (
               <div className="text-center py-20 text-tl-soot/40 italic">
                   {loading ? "Curating the finest ritual..." : "No products found in this category."}
               </div>
           )}
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-24 md:py-32 border-t border-tl-soot/5">
          <div className="max-w-4xl mx-auto text-center px-6">
              <p className="font-serif text-2xl md:text-4xl italic text-tl-soot/80 leading-snug">
                  "We don't just sell tea. We engineer moments of stillness for a generation that never stops."
              </p>
          </div>
      </section>
    </div>
  );
};

export default Home;
