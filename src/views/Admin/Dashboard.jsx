"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Package, ShoppingBag, MapPin, User, Clock, ChevronDown } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('inventory'); // 'inventory' or 'orders'
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (activeTab === 'inventory') {
      fetchProducts();
    } else {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/products');
      const fetchedProducts = res.data?.data?.products;
      setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(error.response?.data?.message || error.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get('/orders/all');
      const fetchedOrders = res.data?.data?.orders;
      setOrders(Array.isArray(fetchedOrders) ? fetchedOrders : []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setError(error.response?.data?.message || error.message || "Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
        try {
            await api.delete(`/products/${id}`);
            setProducts(products.filter(p => p._id !== id));
        } catch (error) {
            alert("Failed to delete product");
            console.error(error);
        }
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    try {
      await api.patch(`/orders/${orderId}`, { status: newStatus });
      setOrders(orders.map(order => 
        order._id === orderId ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-tl-paper pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
                <h1 className="font-serif text-4xl text-tl-soot capitalize">
                    {activeTab} Dashboard 
                </h1>
                <p className="text-tl-soot/60 mt-2 font-light">
                    {activeTab === 'inventory' ? 'Manage your tea inventory.' : 'Track and fulfill customer rituals.'}
                </p>
            </div>

            <div className="flex bg-white p-1 rounded-full border border-tl-soot/10 shadow-sm">
                <button 
                    onClick={() => setActiveTab('inventory')}
                    className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                        activeTab === 'inventory' ? 'bg-tl-soot text-white' : 'text-tl-soot/40 hover:text-tl-soot'
                    }`}
                >
                    Inventory
                </button>
                <button 
                    onClick={() => setActiveTab('orders')}
                    className={`px-6 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold transition-all ${
                        activeTab === 'orders' ? 'bg-tl-soot text-white' : 'text-tl-soot/40 hover:text-tl-soot'
                    }`}
                >
                    Orders
                </button>
            </div>

            {activeTab === 'inventory' && (
                <Link 
                    href="/admin/products/new" 
                    className="flex items-center gap-2 bg-tl-matcha text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-tl-forest transition-colors shadow-lg shadow-tl-matcha/20"
                >
                    <Plus size={16} /> Add Product
                </Link>
            )}
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 border border-red-200 text-sm">
                Error: {error}
            </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-tl-soot/10 overflow-hidden">
            {loading ? (
                <div className="p-24 text-center">
                    <div className="w-8 h-8 border-2 border-tl-matcha border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-tl-soot/40 italic font-serif">Aligning the leaves...</p>
                </div>
            ) : activeTab === 'inventory' ? (
                /* INVENTORY TABLE */
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-tl-paper/50 border-b border-tl-soot/10">
                            <tr>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal">Product</th>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal">Category</th>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal">Price</th>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal">Stock</th>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-tl-soot/10">
                            {products.length === 0 ? (
                                <tr><td colSpan="5" className="p-12 text-center text-tl-soot/40 italic">No products found.</td></tr>
                            ) : products.map((product) => (
                                <tr key={product._id} className="hover:bg-tl-paper/30 transition-colors group">
                                    <td className="p-4 md:p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-16 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border border-tl-soot/5">
                                                <img 
                                                  src={product.images?.[0] || 'https://placehold.co/100x130?text=No+Image'} 
                                                  alt={product.name} 
                                                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                                                />
                                            </div>
                                            <div>
                                                <span className="font-serif text-lg text-tl-soot block">{product.name}</span>
                                                <span className="text-[10px] uppercase tracking-wider text-tl-soot/40 font-bold">{product.origin || 'Unknown Origin'}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6">
                                        <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-tl-soot/5 rounded-full text-tl-soot/60 border border-tl-soot/5">
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 md:p-6 font-serif text-lg text-tl-soot">${product.price}</td>
                                    <td className="p-4 md:p-6">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-1.5 h-1.5 rounded-full ${product.stock <= 5 ? 'bg-red-500' : 'bg-tl-matcha'}`} />
                                            <span className="text-sm font-medium text-tl-soot/60">{product.stock} units</span>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link href={`/admin/products/edit/${product._id}`} className="p-2 text-tl-soot/40 hover:text-tl-matcha transition-colors"><Edit2 size={16}/></Link>
                                            <button onClick={() => handleDelete(product._id)} className="p-2 text-tl-soot/40 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                /* ORDERS TABLE */
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-tl-paper/50 border-b border-tl-soot/10">
                            <tr>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal">Ritual & Customer</th>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal">Shipping Address</th>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal">Items</th>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal">Status</th>
                                <th className="p-4 md:p-6 font-serif text-tl-soot font-normal text-right">Total</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-tl-soot/10">
                            {orders.length === 0 ? (
                                <tr><td colSpan="5" className="p-12 text-center text-tl-soot/40 italic">No orders yet.</td></tr>
                            ) : orders.map((order) => (
                                <tr key={order._id} className="hover:bg-tl-paper/30 transition-colors group align-top">
                                    <td className="p-4 md:p-6">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] uppercase tracking-tighter text-tl-soot/40 font-bold mb-1">#{order._id.slice(-6)}</span>
                                            <div className="flex items-center gap-2 text-tl-soot">
                                                <User size={14} className="opacity-40" />
                                                <span className="font-serif text-lg leading-none">{order.user?.name || 'Guest User'}</span>
                                            </div>
                                            <span className="text-xs text-tl-soot/40 ml-5">{order.user?.email}</span>
                                            <div className="flex items-center gap-2 text-[10px] text-tl-soot/40 mt-2 uppercase tracking-widest ml-5">
                                                <Clock size={12} />
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6">
                                        <div className="flex gap-2 text-tl-soot/60 max-w-[200px]">
                                            <MapPin size={16} className="shrink-0 mt-1 opacity-40" />
                                            <div className="text-xs leading-relaxed">
                                                <p className="font-bold text-tl-soot">{order.shippingAddress?.street}</p>
                                                <p>{order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.zipCode}</p>
                                                <p className="uppercase tracking-tighter opacity-60">{order.shippingAddress?.country}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6">
                                        <div className="flex flex-col gap-2">
                                            {order.items?.map((item, idx) => (
                                                <div key={idx} className="flex justify-between items-center gap-4 text-xs group/item">
                                                    <span className="text-tl-soot/80 font-medium">
                                                        {item.quantity}x <span className="font-serif text-sm">{item.name}</span>
                                                    </span>
                                                    <span className="text-tl-soot/40">${item.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6">
                                        <div className="relative inline-block group/status">
                                            <select 
                                                value={order.status}
                                                onChange={(e) => handleUpdateStatus(order._id, e.target.value)}
                                                className={`appearance-none pl-3 pr-8 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold border transition-all cursor-pointer focus:outline-none ${
                                                    order.status === 'delivered' ? 'bg-tl-matcha/10 border-tl-matcha/20 text-tl-matcha' :
                                                    order.status === 'cancelled' ? 'bg-red-50 border-red-100 text-red-400' :
                                                    'bg-amber-50 border-amber-100 text-amber-600'
                                                }`}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                            <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-40" />
                                        </div>
                                        <p className={`text-[9px] mt-2 font-bold uppercase tracking-tighter ${order.paymentStatus === 'paid' ? 'text-tl-matcha' : 'text-red-400'}`}>
                                            Payment: {order.paymentStatus}
                                        </p>
                                    </td>
                                    <td className="p-4 md:p-6 text-right font-serif text-2xl text-tl-soot">
                                        ${order.totalAmount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
