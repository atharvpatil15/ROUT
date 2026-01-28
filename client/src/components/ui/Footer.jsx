import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-rout-paper border-t border-rout-soot/10 py-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
            <Link to="/" className="font-serif text-2xl font-bold text-rout-soot block mb-2">ROUT</Link>
            <p className="text-sm text-rout-soot/60">Kyoto &bull; Taiwan &bull; India</p>
        </div>
        
        <div className="flex gap-8 text-sm font-medium text-rout-soot/80">
            <Link to="/privacy" className="hover:text-rout-matcha transition-colors">Privacy</Link>
            <Link to="/contact" className="hover:text-rout-matcha transition-colors">Contact</Link>
            <Link to="/shipping" className="hover:text-rout-matcha transition-colors">Shipping</Link>
        </div>
        
        <div className="text-xs text-rout-soot/40">
            &copy; {new Date().getFullYear()} ROUT Tea Co.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
