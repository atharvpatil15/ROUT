"use client";

import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';
import SmoothScroll from '@/components/SmoothScroll';
import ScrollToTop from '@/components/ScrollToTop';
import CartSidebar from '@/components/CartSidebar';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <CartProvider>
        <SmoothScroll>
          <ScrollToTop />
          <CartSidebar />
          {children}
        </SmoothScroll>
      </CartProvider>
    </AuthProvider>
  );
}