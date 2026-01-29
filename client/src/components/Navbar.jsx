import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleCart, items } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    if (window.confirm("Ready to sign off?")) logout();
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToShop: true } });
    } else {
      const element = document.getElementById('shop-section');
      if (element) {
        const offset = 120;
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const isHomePage = location.pathname === '/';
  const textColor = isScrolled || !isHomePage ? 'text-rout-forest' : 'text-white';
  const hoverColor = 'hover:text-rout-gold';

  return (
    <>
      <nav className={`fixed top-4 left-0 right-0 z-[100] transition-all duration-500 px-4 md:px-8`}>
        <div className={`max-w-7xl mx-auto rounded-full transition-all duration-500 bg-white/20 backdrop-blur-xl shadow-lg py-3 px-8 border border-white/20`}>
          <div className="flex justify-between items-center">
            
            {/* Left: Links */}
            <div className="hidden lg:flex items-center gap-8">
              <Link to="/" className={`font-semibold text-xs uppercase tracking-widest transition-colors ${textColor} ${hoverColor}`}>
                Home
              </Link>
              <a href="#shop-section" onClick={handleShopClick} className={`font-semibold text-xs uppercase tracking-widest transition-colors ${textColor} ${hoverColor}`}>
                Shop
              </a>
              <Link to="/about" className={`font-semibold text-xs uppercase tracking-widest transition-colors ${textColor} ${hoverColor}`}>
                About Us
              </Link>
            </div>

            {/* Center: Branding */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2">
              <h1 className={`font-serif text-3xl italic font-bold tracking-tighter transition-colors ${textColor}`}>ROUT.</h1>
            </Link>

            {/* Right: Actions */}
            <div className="flex items-center gap-6">
              <Link to="/contact" className={`hidden lg:block font-semibold text-xs uppercase tracking-widest transition-colors ${textColor} ${hoverColor}`}>
                Contact
              </Link>
              
              {user ? (
                  <button onClick={handleLogout} className={`hidden sm:block font-semibold text-xs uppercase tracking-widest transition-colors ${textColor} ${hoverColor}`}>
                      Logout
                  </button>
              ) : (
                  <Link to="/login" className={`transition-colors ${textColor} ${hoverColor}`}>
                    <User size={20} strokeWidth={1.5} />
                  </Link>
              )}

              <button onClick={toggleCart} className="relative group">
                <ShoppingBag size={20} strokeWidth={1.5} className={`transition-colors ${textColor} group-hover:text-rout-gold`} />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-rout-gold text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </button>
              
              <button className={`lg:hidden transition-colors ${textColor}`} onClick={() => setMobileMenu(true)}>
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 bg-rout-forest text-white z-[110] p-10"
          >
            <button className="absolute top-10 right-10" onClick={() => setMobileMenu(false)}><X size={32}/></button>
            <div className="flex flex-col gap-8 mt-20">
              <Link to="/" onClick={() => setMobileMenu(false)} className="font-serif text-5xl italic hover:text-rout-gold transition-colors">Home</Link>
              <a href="#shop-section" onClick={(e) => { handleShopClick(e); setMobileMenu(false); }} className="font-serif text-5xl italic hover:text-rout-gold transition-colors">Shop</a>
              <Link to="/about" onClick={() => setMobileMenu(false)} className="font-serif text-5xl italic hover:text-rout-gold transition-colors">About Us</Link>
              <Link to="/contact" onClick={() => setMobileMenu(false)} className="font-serif text-5xl italic hover:text-rout-gold transition-colors">Contact</Link>
              {user && (
                  <button onClick={() => { handleLogout(); setMobileMenu(false); }} className="font-serif text-5xl italic hover:text-rout-gold transition-colors text-left">Logout</button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
