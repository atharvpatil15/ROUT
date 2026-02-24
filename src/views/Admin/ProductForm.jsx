"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Thermometer, Package, Image } from 'lucide-react';
import api from '../../services/api';

const ProductForm = () => {
    const params = useParams();
    const router = useRouter();
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;
    const isEditMode = !!id;
    
    const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm();
    const [loading, setLoading] = useState(isEditMode);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploading, setUploading] = useState(false);

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
                            setValue('steepingInstructions.amount', product.steepingInstructions.amount);
                        } else if (key === 'images') {
                            const mainImg = product.images[0];
                            setValue('image', mainImg);
                            setImagePreview(mainImg);
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            setUploading(true);
            
            // 1. Get signature from backend
            // Using absolute URL for debugging if relative fails, but let's stick to standard first
            const signRes = await api.get('/cloudinary/signature');
            
            if (!signRes.data || !signRes.data.data) {
                throw new Error("Invalid response from signature endpoint");
            }

            const { signature, timestamp, apiKey, cloudName } = signRes.data.data;

            // 2. Prepare Form Data for Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append('signature', signature);
            formData.append('timestamp', timestamp);
            formData.append('api_key', apiKey);
            formData.append('folder', 'threaded_leaves_products');

            // 3. Upload directly to Cloudinary
            const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                method: 'POST',
                body: formData
            });
            
            const data = await uploadRes.json();
            
            if (data.secure_url) {
                setValue('image', data.secure_url);
                setImagePreview(data.secure_url);
            } else {
                throw new Error(data.error?.message || "Cloudinary upload failed");
            }
        } catch (error) {
            console.error("Upload failed:", error);
            alert(`Image upload failed: ${error.message}`);
        } finally {
            setUploading(false);
        }
    };

    const onSubmit = async (data) => {
        try {
            const payload = {
                ...data,
                images: [data.image],
                price: Number(data.price),
                stock: Number(data.stock),
                weight: Number(data.weight),
                steepingInstructions: {
                    temperature: Number(data.steepingInstructions.temperature),
                    time: Number(data.steepingInstructions.time),
                    amount: String(data.steepingInstructions.amount || "2.5g")
                }
            };

            if (isEditMode) {
                await api.patch(`/products/${id}`, payload);
            } else {
                await api.post('/products', payload);
            }
            router.push('/admin');
        } catch (error) {
            console.error("Failed to save product:", error.response?.data || error.message);
            const msg = error.response?.data?.message || "Failed to save product.";
            alert(msg);
        }
    };

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-tl-paper">
            <div className="w-8 h-8 border-2 border-tl-matcha/20 border-t-tl-matcha rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F9F7F2] pt-32 px-6 pb-24">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-12">
                    <button 
                      type="button"
                      onClick={() => router.back()}
                      className="p-3 bg-white border border-tl-soot/5 rounded-full hover:bg-tl-matcha hover:text-white transition-all shadow-sm group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    </button>
                    <h1 className="font-serif text-4xl text-tl-soot italic">{isEditMode ? 'Edit Ritual' : 'New Ritual'}</h1>
                </div>
                
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white p-8 rounded-xl border border-tl-soot/5 shadow-sm space-y-6">
                            {/* Name */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-tl-soot/40 mb-3">Ritual Name</label>
                                <input 
                                    {...register('name', { required: 'Name is required' })}
                                    className="w-full bg-tl-paper/50 border border-tl-soot/10 p-4 rounded-sm font-serif text-lg focus:outline-none focus:border-tl-matcha transition-colors placeholder:italic"
                                    placeholder="e.g. Traditional Masala Chai"
                                />
                                {errors.name && <p className="text-red-500 text-[10px] mt-2 font-bold uppercase tracking-widest">{errors.name.message}</p>}
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-tl-soot/40 mb-3">The Story (Description)</label>
                                <textarea 
                                    {...register('description', { required: 'Description is required' })}
                                    rows={6}
                                    className="w-full bg-tl-paper/50 border border-tl-soot/10 p-4 rounded-sm text-sm focus:outline-none focus:border-tl-matcha transition-colors leading-relaxed"
                                    placeholder="Describe the soul of this tea ritual..."
                                />
                            </div>

                            {/* Inventory & Pricing Grid */}
                            <div className="grid grid-cols-3 gap-6 pt-4">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-tl-soot/40 mb-3">Price ($)</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-tl-soot/30 font-serif">$</span>
                                        <input 
                                            type="number" step="0.01"
                                            {...register('price', { required: true })}
                                            className="w-full bg-tl-paper/50 border border-tl-soot/10 p-4 pl-8 rounded-sm font-serif text-lg focus:outline-none focus:border-tl-matcha transition-colors"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-tl-soot/40 mb-3">Stock Units</label>
                                    <input 
                                        type="number"
                                        {...register('stock', { required: true })}
                                        className="w-full bg-tl-paper/50 border border-tl-soot/10 p-4 rounded-sm font-serif text-lg focus:outline-none focus:border-tl-matcha transition-colors"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-tl-soot/40 mb-3">Weight (g)</label>
                                    <input 
                                        type="number"
                                        {...register('weight', { required: true, min: 1 })}
                                        className="w-full bg-tl-paper/50 border border-tl-soot/10 p-4 rounded-sm font-serif text-lg focus:outline-none focus:border-tl-matcha transition-colors"
                                        placeholder="50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Steeping Ritual Section */}
                        <div className="bg-tl-soot p-8 rounded-xl shadow-xl text-white space-y-8">
                            <div className="flex items-center gap-3 border-b border-white/10 pb-6">
                                <Thermometer size={18} className="text-tl-matcha" />
                                <h3 className="font-serif text-xl italic tracking-wide">Steeping Ritual</h3>
                            </div>
                            
                            <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-3">
                                    <label className="block text-[8px] uppercase tracking-[0.4em] font-bold text-white/40">Temp (°C)</label>
                                    <input 
                                        type="number"
                                        {...register('steepingInstructions.temperature', { required: true })}
                                        className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-serif text-xl text-tl-matcha focus:outline-none focus:border-tl-matcha transition-colors"
                                        placeholder="85"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[8px] uppercase tracking-[0.4em] font-bold text-white/40">Time (min)</label>
                                    <input 
                                        type="number"
                                        {...register('steepingInstructions.time', { required: true })}
                                        className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-serif text-xl text-tl-matcha focus:outline-none focus:border-tl-matcha transition-colors"
                                        placeholder="3"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="block text-[8px] uppercase tracking-[0.4em] font-bold text-white/40">Amount</label>
                                    <input 
                                        {...register('steepingInstructions.amount')}
                                        className="w-full bg-white/5 border border-white/10 p-3 rounded-sm font-serif text-xl text-tl-matcha focus:outline-none focus:border-tl-matcha transition-colors"
                                        placeholder="2.5g"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Info Area */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-xl border border-tl-soot/5 shadow-sm space-y-8">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-tl-soot/40 mb-3">Ritual Visual</label>
                                <div className="aspect-[3/4] bg-tl-paper border-2 border-dashed border-tl-soot/10 flex items-center justify-center rounded-sm overflow-hidden mb-4 relative group">
                                    {imagePreview ? (
                                        <div className="relative w-full h-full">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-white text-[8px] font-bold uppercase tracking-widest">Change Visual</p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center p-4">
                                            <Image size={24} className="mx-auto text-tl-soot/20 mb-2" />
                                            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-tl-soot/40">Upload from PC</p>
                                        </div>
                                    )}
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={uploading}
                                        className="absolute inset-0 opacity-0 cursor-pointer z-20"
                                    />
                                    {uploading && (
                                        <div className="absolute inset-0 bg-white/80 z-30 flex flex-col items-center justify-center">
                                            <div className="w-6 h-6 border-2 border-tl-matcha border-t-transparent rounded-full animate-spin mb-2"></div>
                                            <p className="text-[8px] uppercase font-bold tracking-widest text-tl-matcha">Uploading...</p>
                                        </div>
                                    )}
                                </div>
                                <p className="text-[8px] text-center text-tl-soot/30 uppercase tracking-tighter">Portrait Aspect Ratio Recommended</p>
                            </div>

                            {/* Metadata Selection */}
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-tl-soot/40 mb-3">Origin</label>
                                    <input 
                                        {...register('origin')}
                                        className="w-full bg-tl-paper/50 border border-tl-soot/10 p-3 rounded-sm text-sm focus:outline-none focus:border-tl-matcha"
                                        placeholder="e.g. Darjeeling, India"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-tl-soot/40 mb-3">Classification</label>
                                    <select 
                                        {...register('category')}
                                        className="w-full bg-tl-paper/50 border border-tl-soot/10 p-3 rounded-sm text-sm focus:outline-none focus:border-tl-matcha"
                                    >
                                        {['Green', 'Black', 'Oolong', 'White', 'Herbal', 'Matcha', 'Pu-erh', 'Blends', 'Spiced', 'Pure'].map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-8 border-t border-tl-soot/5 space-y-4">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting || uploading}
                                    className="w-full bg-tl-soot text-white py-4 rounded-sm font-bold uppercase tracking-[0.3em] text-[10px] hover:bg-tl-matcha transition-all disabled:opacity-50 shadow-lg shadow-tl-soot/10 flex items-center justify-center gap-2"
                                >
                                    {isSubmitting ? (
                                        <div className="w-3 h-3 border border-white/20 border-t-white rounded-full animate-spin"></div>
                                    ) : <Package size={14} />}
                                    {isEditMode ? 'Update Ritual' : 'Commit Ritual'}
                                </button>
                                <button 
                                    type="button" 
                                    onClick={() => router.push('/admin')}
                                    className="w-full text-tl-soot/40 py-4 font-bold uppercase tracking-[0.3em] text-[8px] hover:text-red-500 transition-colors"
                                >
                                    Discard Changes
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductForm;
