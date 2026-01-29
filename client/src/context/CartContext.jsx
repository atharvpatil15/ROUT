import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState(() => {
    try {
      const storedItems = localStorage.getItem('rout_cart');
      const parsed = storedItems ? JSON.parse(storedItems) : [];
      return Array.isArray(parsed) ? parsed.filter(item => item && typeof item === 'object' && item.id) : [];
    } catch (error) {
      console.error("Failed to load cart from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rout_cart', JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to local storage:", error);
    }
  }, [items]);

  const toggleCart = () => setIsOpen(!isOpen);
  
  const addToCart = (product) => {
    setItems(prev => {
        const existing = prev.find(item => item.id === product.id);
        if (existing) {
            return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const decreaseQuantity = (id) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing?.quantity === 1) {
        return prev.filter(item => item.id !== id);
      }
      return prev.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const removeFromCart = (id) => {
      setItems(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = items.reduce((total, item) => total + ((item.price || 0) * (item.quantity || 1)), 0);

  return (
    <CartContext.Provider value={{ isOpen, toggleCart, items, addToCart, removeFromCart, decreaseQuantity, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
