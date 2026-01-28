import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(isLogin ? loginSchema : registerSchema),
  });

  const onSubmit = async (data) => {
    setError('');
    setLoading(true);
    try {
      if (isLogin) {
        await login(data.email, data.password);
      } else {
        await registerUser(data.name, data.email, data.password);
      }
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch gap-6 bg-gradient-to-br from-rout-paper via-[#F5F5F0] to-[#E8E8E3] pt-24 pb-6 px-6"> 
      {/* Left: Aesthetic Image Panel */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden lg:block w-5/12 relative overflow-hidden rounded-3xl shadow-2xl"
      >
        <img 
          src="https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=2574&auto=format&fit=crop" 
          alt="Tea Ritual" 
          className="w-full h-full object-cover grayscale-[20%] hover:grayscale-0 transition-all duration-[3s] hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-16 left-12 text-white max-w-lg">
           <span className="inline-block px-3 py-1 mb-4 border border-white/30 rounded-full text-xs uppercase tracking-[0.2em] backdrop-blur-md">The Daily Ritual</span>
           <h2 className="font-serif text-5xl mb-4 leading-tight">Stillness is the <br/> Ultimate Luxury.</h2>
        </div>
      </motion.div>

      {/* Right: Form Panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
        className="w-full lg:w-7/12 flex items-start justify-center lg:pt-8"
      >
        <div className="w-full max-w-md bg-white/40 backdrop-blur-sm p-10 rounded-3xl border border-white/50 shadow-sm">
            
            {/* Header */}
            <div className="text-center mb-10">
                <h1 className="font-decorative text-4xl text-rout-soot mb-2">ROUT</h1>
                <p className="text-rout-soot/50 text-xs uppercase tracking-[0.2em]">
                    {isLogin ? 'Welcome Back' : 'Begin Your Journey'}
                </p>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 text-red-600 p-3 text-sm mb-6 rounded-sm text-center border border-red-100">
                    {error}
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {!isLogin && (
                    <div className="relative">
                        <input 
                            {...register("name")}
                            type="text"
                            placeholder="Full Name"
                            className="w-full border-b border-rout-soot/20 py-3 bg-transparent focus:outline-none focus:border-rout-matcha transition-colors text-rout-soot placeholder-rout-soot/40 font-serif"
                        />
                        {errors.name && <span className="text-red-500 text-xs block mt-1">{errors.name.message}</span>}
                    </div>
                )}
                
                <div className="relative">
                    <input 
                        {...register("email")}
                        type="email"
                        placeholder="Email Address"
                        className="w-full border-b border-rout-soot/20 py-3 bg-transparent focus:outline-none focus:border-rout-matcha transition-colors text-rout-soot placeholder-rout-soot/40 font-serif"
                    />
                     {errors.email && <span className="text-red-500 text-xs block mt-1">{errors.email.message}</span>}
                </div>

                <div className="relative">
                    <input 
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="w-full border-b border-rout-soot/20 py-3 bg-transparent focus:outline-none focus:border-rout-matcha transition-colors text-rout-soot placeholder-rout-soot/40 font-serif"
                    />
                     {errors.password && <span className="text-red-500 text-xs block mt-1">{errors.password.message}</span>}
                </div>

                <button 
                    disabled={loading}
                    type="submit" 
                    className="w-full bg-rout-soot text-white py-4 mt-8 hover:bg-rout-matcha transition-colors duration-500 rounded-sm font-medium tracking-[0.1em] text-xs uppercase disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                    {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Join The Ritual')}
                </button>
            </form>

            {/* Divider */}
            <div className="relative flex py-8 items-center">
                <div className="flex-grow border-t border-rout-soot/10"></div>
                <span className="flex-shrink-0 mx-4 text-rout-soot/30 text-[10px] uppercase tracking-widest">Or Continue With</span>
                <div className="flex-grow border-t border-rout-soot/10"></div>
            </div>

            {/* Google Button */}
            <a 
                href="http://localhost:5000/api/v1/users/google"
                className="w-full border border-rout-soot/10 bg-white/50 flex items-center justify-center py-3.5 hover:bg-white hover:shadow-md transition-all duration-300 group rounded-sm"
            >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4 mr-3 grayscale group-hover:grayscale-0 transition-all" />
                <span className="text-rout-soot text-xs font-medium uppercase tracking-widest">Google</span>
            </a>

            {/* Toggle */}
            <div className="mt-8 text-center">
                <button 
                    onClick={() => { setIsLogin(!isLogin); setError(''); }}
                    className="text-rout-soot/60 text-xs hover:text-rout-matcha transition-colors decoration-1 underline-offset-4 border-b border-transparent hover:border-rout-matcha pb-0.5"
                >
                    {isLogin ? "New here? Create an account." : "Already have an account? Sign in."}
                </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;