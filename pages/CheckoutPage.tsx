import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { Lock, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';

const CheckoutPage: React.FC = () => {
    const { cart } = useAppContext();
    const navigate = useNavigate();
    const [formState, setFormState] = useState({
        name: '',
        address: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormState(prev => ({...prev, [id]: value }));
    }

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd send this data to a payment processor like Stripe.
        // For this demo, we'll just simulate a successful payment.
        navigate('/payment-status');
    };

     if (cart.length === 0) {
        return (
            <Layout>
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Your cart is empty.</h1>
                    <p className="text-textLight">Add items to your cart before proceeding to checkout.</p>
                </div>
            </Layout>
        )
    }

    return (
        <Layout>
            <div className="max-w-4xl mx-auto">
                 <h1 className="text-3xl font-bold text-textDark mb-6">Checkout</h1>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Payment Form */}
                    <motion.div 
                        className="bg-white p-8 rounded-lg shadow-lg"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold mb-6">Payment Information</h2>
                        <form onSubmit={handlePayment} className="space-y-4">
                             <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input type="text" id="name" value={formState.name} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                            </div>
                             <div>
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <input type="text" id="address" value={formState.address} onChange={handleInputChange} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                            </div>
                            <div>
                                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                                <div className="relative">
                                    <input type="text" id="cardNumber" value={formState.cardNumber} onChange={handleInputChange} placeholder="•••• •••• •••• ••••" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary pl-10" />
                                    <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20}/>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex-1">
                                    <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry</label>
                                    <input type="text" id="expiry" value={formState.expiry} onChange={handleInputChange} placeholder="MM/YY" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                                </div>
                                <div className="flex-1">
                                    <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                                    <input type="text" id="cvc" value={formState.cvc} onChange={handleInputChange} placeholder="•••" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                                </div>
                            </div>
                            <motion.button 
                                type="submit" 
                                className="w-full flex items-center justify-center mt-4 px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition-colors"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Lock size={16} className="mr-2"/>
                                Pay ${subtotal.toFixed(2)} securely
                            </motion.button>
                        </form>
                    </motion.div>
                     {/* Order Summary */}
                    <motion.div 
                        className="bg-white p-8 rounded-lg shadow-lg h-fit"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <h2 className="text-2xl font-semibold mb-6 border-b pb-4">Order Summary</h2>
                        <div className="space-y-4">
                            {cart.map(item => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                    <span className="text-textDark">{item.title} x {item.quantity}</span>
                                    <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-4 mt-6">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                    </motion.div>
                 </div>
            </div>
        </Layout>
    )
}

export default CheckoutPage;
