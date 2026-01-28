import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

// Schema Validation
const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code"),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number"),
});

const Checkout = () => {
  const { cartTotal, items } = useCart();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = (data) => {
    console.log("Processing Order:", data);
    alert("Order successfully placed! (Mock)");
  };

  const InputField = ({ label, name, type = "text", placeholder }) => (
    <div className="mb-4">
      <label className="block text-xs uppercase tracking-wider text-brand-gray mb-2">{label}</label>
      <input 
        {...register(name)}
        type={type}
        placeholder={placeholder}
        className={`w-full bg-transparent border-b ${errors[name] ? 'border-red-500' : 'border-brand-charcoal/20'} py-2 focus:outline-none focus:border-brand-matcha transition-colors placeholder-brand-charcoal/30 font-serif`}
      />
      {errors[name] && (
        <motion.span 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-red-500 text-xs mt-1 block"
        >
            {errors[name].message}
        </motion.span>
      )}
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 bg-brand-cream">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left: Form */}
        <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl mb-8 text-brand-charcoal">Checkout</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-3">
                 <span className="w-6 h-6 rounded-full bg-brand-charcoal text-white text-xs flex items-center justify-center font-sans">1</span>
                 Contact Information
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <InputField label="First Name" name="firstName" placeholder="Jane" />
                <InputField label="Last Name" name="lastName" placeholder="Doe" />
              </div>
              <InputField label="Email" name="email" type="email" placeholder="jane@example.com" />
              <InputField label="Phone" name="phone" placeholder="+1 555 000 0000" />
            </section>

            <section>
              <h2 className="text-xl font-serif mb-6 flex items-center gap-3">
                 <span className="w-6 h-6 rounded-full bg-brand-charcoal text-white text-xs flex items-center justify-center font-sans">2</span>
                 Shipping Details
              </h2>
              <InputField label="Address" name="address" placeholder="123 Tea Lane" />
              <div className="grid grid-cols-2 gap-6">
                <InputField label="City" name="city" placeholder="Kyoto" />
                <InputField label="ZIP Code" name="zipCode" placeholder="10001" />
              </div>
            </section>

            <button 
                type="submit" 
                className="w-full bg-brand-matcha text-white py-4 mt-8 hover:bg-[#3A4A1C] transition-colors duration-300 font-medium tracking-wide"
            >
                Confirm & Pay ${cartTotal.toFixed(2)}
            </button>
          </form>
        </motion.div>

        {/* Right: Order Summary */}
        <motion.div
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="bg-white/50 p-8 rounded-sm h-fit sticky top-24 backdrop-blur-sm"
        >
            <h3 className="font-serif text-2xl mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6">
                {items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                        <span className="text-brand-charcoal/80">{item.name} x {item.quantity}</span>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            <div className="border-t border-brand-charcoal/10 pt-4 flex justify-between items-center font-serif text-xl">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
            </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Checkout;
