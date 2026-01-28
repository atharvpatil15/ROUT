import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ParallaxHero from '../components/ui/ParallaxHero';
import ProductCard from '../components/ui/ProductCard';
import Manifesto from '../components/ui/Manifesto';

// Local Assets
import masalaImg from '../assets/masala.jpg';
import greenImg from '../assets/green.jpg';
import orthodoxImg from '../assets/orthodox.jpg';

const PRODUCTS = [
    { 
        id: 1, 
        name: 'Masala Chai', 
        price: 45, 
        image: masalaImg,
        description: 'The Ritual of Spice. A high-octane blend of manual-ground cloves, cardamom, and black pepper. Engineered for focus and the early morning grind.'
    },
    { 
        id: 2, 
        name: 'Green Tea', 
        price: 38, 
        image: greenImg,
        description: 'The Natural Reset. Hand-picked antioxidant power to clear the fog. Clean energy, zero crash, pure vibrancy.'
    },
    { 
        id: 3, 
        name: 'Orthodox Tea', 
        price: 62, 
        image: orthodoxImg,
        description: 'The Artisan’s Standard. Traditional whole-leaf processing for a deep, malty profile. For those who respect the craft of tea.'
    },
];

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.state?.scrollToShop) {
      const element = document.getElementById('shop-section');
      if (element) {
        setTimeout(() => {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100); // Small delay to ensure DOM is ready
      }
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="bg-rout-paper">
      <ParallaxHero />
      
      {/* Brand Manifesto */}
      <Manifesto />
      
      {/* Product Grid Section */}
      <section id="shop-section" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
                <div className="max-w-xl">
                    <span className="text-rout-matcha uppercase tracking-[0.3em] text-xs font-bold mb-4 block">The Collection</span>
                    <h2 className="font-serif text-5xl md:text-6xl text-rout-soot leading-tight">
                        Artisanal Powders <br/> <span className="italic opacity-50 text-3xl font-light">for the Modern Ritual.</span>
                    </h2>
                </div>
                <p className="text-rout-soot/40 text-sm max-w-[200px] font-sans leading-relaxed text-right uppercase tracking-tighter">
                    Sustainably sourced. <br/> Manually processed. <br/> Zero Compromise.
                </p>
            </div>
           
           {/* 3-Column Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {PRODUCTS.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
              ))}
           </div>
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
