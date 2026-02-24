"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '../services/api';
import { motion } from 'framer-motion';
import { Package, User, MapPin, ChevronRight, LogOut, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user, logout, loading: authLoading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login');
    }
  }, [user, authLoading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        setLoadingOrders(true);
        const res = await api.get('/orders/my-orders');
        // Safely access the orders data
        const fetchedOrders = res?.data?.data?.orders || [];
        setOrders(fetchedOrders);
      } catch (err) {
        console.error("Failed to fetch orders:", err);
        setOrders([]); // Set to empty array on error to avoid crash
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tl-paper">
        <Loader2 className="w-8 h-8 animate-spin text-tl-matcha" />
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/5 pb-12">
          <div>
            <span className="text-tl-matcha font-semibold text-[10px] tracking-[0.4em] uppercase mb-4 block">My Account</span>
            <h1 className="font-serif text-3xl md:text-6xl text-black italic">Welcome, {user.name.split(' ')[0]}</h1>
            <p className="text-black/40 font-light mt-2 md:mt-4 tracking-wide text-sm md:text-base">{user.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-black/40 hover:text-black transition-colors self-start md:self-auto"
          >
            <LogOut size={14} />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            {[
              { id: 'orders', label: 'Order History', icon: Package },
              { id: 'settings', label: 'Personal Info', icon: User },
              { id: 'addresses', label: 'Addresses', icon: MapPin },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between p-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${
                  activeTab === tab.id 
                  ? 'bg-black text-white' 
                  : 'text-black/40 hover:text-black hover:bg-black/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={16} />
                  {tab.label}
                </div>
                <ChevronRight size={14} />
              </button>
            ))}
            
            {/* Red Logout Button at Bottom of Sidebar */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-4 text-[10px] uppercase tracking-[0.2em] font-bold transition-all text-red-500 hover:bg-red-50 mt-8 border border-red-100"
            >
              <div className="flex items-center gap-3">
                <LogOut size={16} />
                Sign Out
              </div>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  <h3 className="font-serif text-2xl italic mb-8">Recent Orders</h3>
                  
                  {loadingOrders ? (
                    <div className="py-12 flex justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-tl-matcha/40" />
                    </div>
                  ) : orders.length > 0 ? (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div key={order._id} className="bg-white border border-black/5 p-6 hover:border-black/10 transition-all group">
                          <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.1em] text-black/40 mb-1 font-bold">Order ID</p>
                              <p className="font-mono text-[11px] text-black/60">#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.1em] text-black/40 mb-1 font-bold">Date</p>
                              <p className="text-[11px] text-black/60">{new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                            </div>
                            <div>
                              <p className="text-[10px] uppercase tracking-[0.1em] text-black/40 mb-1 font-bold">Status</p>
                              <span className={`text-[9px] uppercase tracking-[0.1em] font-bold px-3 py-1 ${
                                order.status === 'delivered' ? 'bg-tl-matcha/10 text-tl-matcha' : 'bg-black/5 text-black/40'
                              }`}>
                                {order.status}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-[10px] uppercase tracking-[0.1em] text-black/40 mb-1 font-bold">Total</p>
                              <p className="font-bold text-sm text-black">${order.totalAmount.toFixed(2)}</p>
                            </div>
                          </div>
                          
                          <div className="border-t border-black/5 pt-4 flex items-center gap-4 overflow-x-auto">
                            {order.items.map((item, i) => (
                              <div key={i} className="flex-shrink-0 w-12 h-16 bg-[#F5F5F7] border border-black/5 overflow-hidden">
                                <img src={item.image || 'https://placehold.co/48x64'} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                              </div>
                            ))}
                            {order.items.length > 4 && (
                              <div className="text-[10px] text-black/40 font-bold">+{order.items.length - 4} more</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center border border-dashed border-black/10">
                      <p className="text-black/30 font-serif italic text-lg mb-6">Your ritual history is empty.</p>
                      <button 
                        onClick={() => router.push('/?scrollToShop=1')}
                        className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-tl-matcha transition-colors"
                      >
                        Begin Your Collection
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <h3 className="font-serif text-2xl italic mb-8">Personal Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">Full Name</label>
                      <p className="p-4 bg-white border border-black/5 text-sm">{user.name}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">Email Address</label>
                      <p className="p-4 bg-white border border-black/5 text-sm">{user.email}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">Member Since</label>
                      <p className="p-4 bg-white border border-black/5 text-sm">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase tracking-[0.2em] text-black/40 font-bold">Role</label>
                      <p className="p-4 bg-white border border-black/5 text-sm capitalize">{user.role}</p>
                    </div>
                  </div>
                  <div className="pt-8">
                    <button className="bg-black/5 text-black/40 px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] cursor-not-allowed">
                      Update Profile (Coming Soon)
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'addresses' && (
                <div className="space-y-8">
                  <h3 className="font-serif text-2xl italic mb-8">Saved Addresses</h3>
                  <div className="py-20 text-center border border-dashed border-black/10">
                    <p className="text-black/30 font-serif italic text-lg mb-6">No saved addresses found.</p>
                    <button className="bg-black text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-tl-matcha transition-colors">
                      Add New Address
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
