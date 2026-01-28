import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, User, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { toggleCart, items } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
       setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Home Click: Scroll to top if on home, otherwise navigate
  const handleHomeClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleShopClick = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollToShop: true } });
    } else {
      const element = document.getElementById('shop-section');
      if (element) {
        const offset = 80; // Account for fixed navbar height
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to end your ritual and log out?");
    if (confirmLogout) {
      logout();
    }
  };

  // Glassmorphic classes applied globally across all pages
  const navClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    isScrolled 
      ? 'bg-rout-paper/80 backdrop-blur-md shadow-sm border-b border-rout-soot/5' 
      : 'bg-rout-paper/60 backdrop-blur-sm border-b border-transparent'
  }`;

  return (
    <nav className={navClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Redirects to Home & Scrolls to Top */}
          <Link 
            to="/" 
            onClick={handleHomeClick}
            className="font-decorative text-3xl font-medium text-rout-soot tracking-tight"
          >
            ROUT
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-10">
            <Link 
                to="/" 
                onClick={handleHomeClick}
                className="text-rout-soot hover:text-rout-matcha transition-colors font-medium text-xs uppercase tracking-[0.2em]"
            >
                Home
            </Link>
            <a href="#shop-section" onClick={handleShopClick} className="text-rout-soot hover:text-rout-matcha transition-colors font-medium text-xs uppercase tracking-[0.2em]">Shop</a>
            <Link to="/about" className="text-rout-soot hover:text-rout-matcha transition-colors font-medium text-xs uppercase tracking-[0.2em]">About Us</Link>
            <Link to="/contact" className="text-rout-soot hover:text-rout-matcha transition-colors font-medium text-xs uppercase tracking-[0.2em]">Contact</Link>
          </div>

          {/* Utility Icons */}
          <div className="flex items-center space-x-6">
            <button onClick={toggleCart} className="text-rout-soot hover:text-rout-matcha transition-colors relative">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rout-matcha text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                      {items.length}
                  </span>
              )}
            </button>
            
            {user ? (
                <button onClick={handleLogout} className="text-rout-soot hover:text-rout-matcha font-medium text-xs uppercase tracking-widest">
                    Logout
                </button>
            ) : (
                <Link to="/login" className="text-rout-soot hover:text-rout-matcha transition-colors">
                  <User size={20} strokeWidth={1.5} />
                </Link>
            )}
             <button className="md:hidden text-rout-soot">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;