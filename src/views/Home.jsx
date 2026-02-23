"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeroCarousel from '../components/ui/HeroCarousel';
import ProductCard from '../components/ui/ProductCard';
import Manifesto from '../components/ui/Manifesto';
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
      
      {/* Shop Collection Section (Full Shop Integrated) */}
      <section id="shop-section" className="py-24 px-6 bg-[#F9F7F2] border-t border-black/5">
        <div className="max-w-7xl mx-auto">
           {/* Header */}
           <div className="text-center mb-16">
              <span className="text-tl-matcha font-semibold text-[10px] tracking-[0.4em] uppercase mb-4 block">Selected Rituals</span>
              <h2 className="font-serif text-4xl md:text-6xl text-black mb-6 italic">Shop the Collection</h2>
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
      <section className="py-32 border-t border-tl-soot/5">
          <div className="max-w-4xl mx-auto text-center px-6">
              <p className="font-serif text-3xl md:text-4xl italic text-tl-soot/80 leading-snug">
                  "We don't just sell tea. We engineer moments of stillness for a generation that never stops."
              </p>
          </div>
      </section>
    </div>
  );
};

export default Home;
