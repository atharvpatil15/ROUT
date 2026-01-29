import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ParallaxHero from '../components/ui/ParallaxHero';
import ProductCard from '../components/ui/ProductCard';
import Manifesto from '../components/ui/Manifesto';
import api from '../services/api';

const Home = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');
  const [filters, setFilters] = useState(['All']);

  // 1. Fetch Products from Backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
  }, []);

  // 2. Scroll Handling
  useEffect(() => {
    if (location.state?.scrollToShop) {
      const element = document.getElementById('shop-section');
      if (element) {
        setTimeout(() => {
          const offset = 120;
          const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <div className="bg-rout-paper">
      <ParallaxHero />
      
      {/* Brand Manifesto */}
      <Manifesto />
      
      {/* Shop Collection Section (Full Shop Integrated) */}
      <section id="shop-section" className="py-24 px-6 bg-white border-t border-rout-soot/5">
        <div className="max-w-7xl mx-auto">
           {/* Header */}
           <div className="text-center mb-12">
              <h2 className="font-serif text-4xl text-rout-soot mb-4">Shop The Collection</h2>
              <p className="text-rout-soot/60 max-w-xl mx-auto font-light text-sm">
                  Sustainably sourced from single-estate farms. Processed by hand.
              </p>
           </div>
           
           {/* Filters */}
           <div className="flex justify-center gap-6 mb-12 overflow-x-auto py-2">
                {filters.map((filter) => (
                    <button 
                        key={filter}
                        onClick={() => setActiveFilter(filter)}
                        className={`text-xs uppercase tracking-widest transition-colors ${
                            activeFilter === filter 
                            ? 'text-rout-matcha font-bold border-b border-rout-matcha pb-1' 
                            : 'text-rout-soot/40 hover:text-rout-soot'
                        }`}
                    >
                        {filter}
                    </button>
                ))}
           </div>

           {/* Dynamic Grid */}
           {filteredProducts.length > 0 ? (
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                  {filteredProducts.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} />
                  ))}
               </div>
           ) : (
               <div className="text-center py-20 text-rout-soot/40 italic">
                   {loading ? "Curating the finest ritual..." : "No products found in this category."}
               </div>
           )}
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-32 border-t border-rout-soot/5">
          <div className="max-w-4xl mx-auto text-center px-6">
              <p className="font-serif text-3xl md:text-4xl italic text-rout-soot/80 leading-snug">
                  "We don't just sell tea. We engineer moments of stillness for a generation that never stops."
              </p>
          </div>
      </section>
    </div>
  );
};

export default Home;