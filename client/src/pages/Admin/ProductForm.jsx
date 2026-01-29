import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import api from '../../services/api';

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  
  const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();
  const [loading, setLoading] = useState(isEditMode);

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const res = await api.get(`/products/${id}`);
          const product = res.data.data.product;
          
          // Populate form
          Object.keys(product).forEach(key => {
              if (key === 'steepingInstructions') {
                  setValue('steepingInstructions.temperature', product.steepingInstructions.temperature);
                  setValue('steepingInstructions.time', product.steepingInstructions.time);
              } else if (key === 'images') {
                  setValue('image', product.images[0]); // Simple single image handler for now
              } else {
                  setValue(key, product[key]);
              }
          });
        } catch (error) {
          console.error("Failed to fetch product details", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [id, isEditMode, setValue]);

  const onSubmit = async (data) => {
    try {
        // Format data to match schema
        const payload = {
            ...data,
            images: [data.image], // Wrap single image in array
            price: Number(data.price),
            stock: Number(data.stock),
            weight: Number(data.weight),
            steepingInstructions: {
                temperature: Number(data.steepingInstructions.temperature),
                time: Number(data.steepingInstructions.time)
            }
        };

        if (isEditMode) {
            await api.patch(`/products/${id}`, payload);
        } else {
            await api.post('/products', payload);
        }
        navigate('/admin');
    } catch (error) {
        console.error("Failed to save product", error);
        alert("Failed to save product. Check console for details.");
    }
  };

  if (loading) return <div className="text-center pt-40">Loading...</div>;

  return (
    <div className="min-h-screen bg-rout-paper pt-32 px-6 pb-20">
        <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-sm border border-rout-soot/5">
            <h1 className="font-serif text-3xl text-rout-soot mb-8">{isEditMode ? 'Edit Product' : 'New Product'}</h1>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Product Name</label>
                    <input 
                        {...register('name', { required: 'Name is required' })}
                        className="w-full bg-rout-paper border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                        placeholder="e.g. Masala Chai"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Description</label>
                    <textarea 
                        {...register('description', { required: 'Description is required' })}
                        rows={4}
                        className="w-full bg-rout-paper border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                        placeholder="The story behind the tea..."
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Price */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Price ($)</label>
                        <input 
                            type="number" step="0.01"
                            {...register('price', { required: 'Price is required' })}
                            className="w-full bg-rout-paper border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                        />
                    </div>
                    {/* Stock */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Stock Level</label>
                        <input 
                            type="number"
                            {...register('stock', { required: 'Stock is required' })}
                            className="w-full bg-rout-paper border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Category */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Category</label>
                        <select 
                            {...register('category', { required: 'Category is required' })}
                            className="w-full bg-rout-paper border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                        >
                            {['Green', 'Black', 'Oolong', 'White', 'Herbal', 'Matcha', 'Pu-erh', 'Blends', 'Spiced', 'Pure'].map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>
                    {/* Origin */}
                    <div>
                        <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Origin</label>
                        <input 
                            {...register('origin', { required: 'Origin is required' })}
                            className="w-full bg-rout-paper border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                            placeholder="e.g. Japan"
                        />
                    </div>
                </div>

                {/* Weight */}
                <div>
                     <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Weight (g)</label>
                     <input 
                        type="number"
                        {...register('weight', { required: 'Weight is required' })}
                        className="w-full bg-rout-paper border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                    />
                </div>

                {/* Steeping Instructions */}
                <div className="p-4 bg-rout-paper/50 rounded-lg border border-rout-soot/5">
                    <h3 className="font-serif text-lg mb-4 text-rout-soot">Steeping Ritual</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Temp (°C)</label>
                            <input 
                                type="number"
                                {...register('steepingInstructions.temperature', { required: true })}
                                className="w-full bg-white border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Time (mins)</label>
                            <input 
                                type="number"
                                {...register('steepingInstructions.time', { required: true })}
                                className="w-full bg-white border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Image URL (Simplified for now) */}
                <div>
                    <label className="block text-xs uppercase tracking-widest text-rout-soot/60 mb-2">Image URL</label>
                    <input 
                        {...register('image', { required: 'Image URL is required' })}
                        className="w-full bg-rout-paper border border-rout-soot/10 p-3 rounded focus:outline-none focus:border-rout-matcha transition-colors"
                        placeholder="https://..."
                    />
                    <p className="text-[10px] text-rout-soot/40 mt-1">Direct link to image (e.g., Unsplash)</p>
                </div>

                {/* Submit */}
                <div className="pt-6">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-rout-soot text-white py-4 rounded font-bold uppercase tracking-widest hover:bg-rout-matcha transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Saving...' : (isEditMode ? 'Update Product' : 'Create Product')}
                    </button>
                </div>

            </form>
        </div>
    </div>
  );
};

export default ProductForm;
