import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import SmoothScroll from './components/SmoothScroll';
import CartSidebar from './components/CartSidebar';
import ScrollToTop from './components/ScrollToTop';
import AdminRoute from './components/AdminRoute';
import AdminDashboard from './pages/Admin/Dashboard';
import ProductForm from './pages/Admin/ProductForm';

// Placeholders for other pages
const NotFound = () => <div className="p-20 text-center font-serif text-3xl">404 - Not Found</div>;

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <SmoothScroll>
          <ScrollToTop />
          <CartSidebar />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="login" element={<Auth />} />
              <Route path="checkout" element={<Checkout />} />
              
              {/* Admin Routes */}
              <Route path="admin" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
              <Route path="admin/products/new" element={
                <AdminRoute>
                  <ProductForm />
                </AdminRoute>
              } />
              <Route path="admin/products/edit/:id" element={
                <AdminRoute>
                  <ProductForm />
                </AdminRoute>
              } />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </SmoothScroll>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
