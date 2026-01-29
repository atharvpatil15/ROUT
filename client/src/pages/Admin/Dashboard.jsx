import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setError(null);
      const res = await api.get('/products');
      const fetchedProducts = res.data?.data?.products;
      setProducts(Array.isArray(fetchedProducts) ? fetchedProducts : []);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setError(error.response?.data?.message || error.message || "Failed to load products");
      setProducts([]); 
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

  return (
    <div className="min-h-screen bg-rout-paper pt-32 px-6 pb-20">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
            <div>
                <h1 className="font-serif text-4xl text-rout-soot">
                    Admin Dashboard 
                    <span className="ml-4 text-lg text-rout-soot/40 font-sans font-normal">
                        ({products.length} items)
                    </span>
                </h1>
                <p className="text-rout-soot/60 mt-2 font-light">Manage your tea inventory.</p>
            </div>
            <Link 
                to="/admin/products/new" 
                className="flex items-center gap-2 bg-rout-matcha text-white px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-rout-forest transition-colors"
            >
                <Plus size={16} /> Add Product
            </Link>
        </div>

        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8 border border-red-200">
                Error: {error}
            </div>
        )}

        {/* Product Table */}
        <div className="bg-white rounded-xl shadow-sm border border-rout-soot/10">
            {loading ? (
                <div className="p-12 text-center text-rout-soot/40 italic">Loading inventory...</div>
            ) : products.length === 0 ? (
                <div className="p-12 text-center text-rout-soot/40 italic">
                    No products found. Add your first tea blend!
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead className="bg-rout-paper/50 border-b border-rout-soot/10">
                            <tr>
                                <th className="p-4 md:p-6 font-serif text-rout-soot font-normal">Product</th>
                                <th className="p-4 md:p-6 font-serif text-rout-soot font-normal">Category</th>
                                <th className="p-4 md:p-6 font-serif text-rout-soot font-normal">Price</th>
                                <th className="p-4 md:p-6 font-serif text-rout-soot font-normal">Stock</th>
                                <th className="p-4 md:p-6 font-serif text-rout-soot font-normal text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-rout-soot/10 bg-white">
                            {products.map((product) => (
                                <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="p-4 md:p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                                                <img 
                                                  src={product.images && product.images.length > 0 ? product.images[0] : 'https://placehold.co/100?text=No+Image'} 
                                                  alt={product.name} 
                                                  className="w-full h-full object-cover" 
                                                />
                                            </div>
                                            <span className="font-medium text-rout-soot">{product.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 md:p-6 text-sm text-gray-600">{product.category}</td>
                                    <td className="p-4 md:p-6 text-sm font-medium text-gray-900">${product.price}</td>
                                    <td className="p-4 md:p-6 text-sm text-gray-600 flex items-center gap-2">
                                        <Package size={14} className="text-rout-matcha" />
                                        {product.stock}
                                    </td>
                                    <td className="p-4 md:p-6 text-right">
                                        <div className="flex justify-end gap-3">
                                            <Link to={`/admin/products/edit/${product._id}`} className="p-2 text-gray-400 hover:text-rout-matcha transition-colors">
                                                <Edit2 size={16} />
                                            </Link>
                                            <button onClick={() => handleDelete(product._id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
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
