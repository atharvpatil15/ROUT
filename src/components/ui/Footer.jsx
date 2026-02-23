import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-black text-white/50 py-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start mb-20">
          <div className="text-left">
              <Link href="/" className="font-serif text-3xl italic text-white block mb-6">Threaded Leaves</Link>
              <p className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-semibold">
                Kyoto &bull; Taiwan &bull; India
              </p>
          </div>
          
          <div className="flex flex-col gap-5 text-[10px] uppercase tracking-[0.3em] font-semibold">
              <Link href="/shop" className="hover:text-white transition-colors">The Collection</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>

          <div className="flex flex-col md:items-end gap-5 text-[10px] uppercase tracking-[0.3em] font-semibold opacity-60">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/shipping" className="hover:text-white transition-colors">Shipping & Returns</Link>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[9px] uppercase tracking-[0.5em] font-medium opacity-30">
                &copy; {new Date().getFullYear()} Threaded Leaves Tea Co.
            </p>
            <div className="flex gap-8 opacity-30">
              <span className="text-[9px] uppercase tracking-[0.5em]">Instagram</span>
              <span className="text-[9px] uppercase tracking-[0.5em]">Pinterest</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
