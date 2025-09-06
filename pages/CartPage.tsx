
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartPage: React.FC = () => {
    const { cart, removeFromCart } = useAppContext();
    const navigate = useNavigate();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const containerVariants = {
        hidden: { opacity: 1 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: { opacity: 1, x: 0 }
    };

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-textDark mb-6">Shopping Cart</h1>
            {cart.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <motion.div 
                        className="lg:col-span-2 bg-white rounded-lg shadow-md divide-y divide-gray-200"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {cart.map(item => (
                                <motion.div 
                                    key={item.id} 
                                    className="p-4 flex items-center justify-between gap-4"
                                    variants={itemVariants}
                                    exit={{ opacity: 0, x: 50 }}
                                    layout
                                >
                                    <div className="flex items-center gap-4">
                                        <img src={item.imageUrls[0]} alt={item.title} className="w-24 h-24 rounded-md object-cover" />
                                        <div>
                                            <h2 className="font-semibold text-lg text-textDark">{item.title}</h2>
                                            <p className="text-textLight text-sm">Quantity: {item.quantity}</p>
                                            <p className="text-primary font-bold text-md">${item.price.toFixed(2)}</p>
                                        </div>
                                    </div>
                                    <motion.button 
                                        onClick={() => removeFromCart(item.id)} 
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <Trash2 size={20} />
                                    </motion.button>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                    <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>
                        <div className="flex justify-between text-textLight mb-2">
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-textLight mb-4">
                            <span>Shipping</span>
                            <span>Free</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg border-t pt-4">
                            <span>Total</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <motion.button 
                            onClick={handleCheckout} 
                            className="mt-6 w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-secondary transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Proceed to Checkout
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">Your cart is empty.</h2>
                    <p className="text-gray-500 mt-2">Explore our products and find something you love!</p>
                     <Link to="/" className="mt-6 inline-block bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-secondary transition-colors">
                        Start Shopping
                    </Link>
                </div>
            )}
        </Layout>
    );
};

export default CartPage;