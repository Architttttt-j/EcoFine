
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PaymentStatusPage: React.FC = () => {
    const { checkout } = useAppContext();

    // The checkout logic is triggered here to finalize the purchase after successful
    // navigation from the payment form. This moves items from cart to purchases.
    useEffect(() => {
        checkout();
    }, [checkout]);

    return (
        <Layout>
            <motion.div 
                className="max-w-2xl mx-auto text-center bg-white p-10 rounded-lg shadow-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
            >
                <CheckCircle className="mx-auto text-green-500 h-20 w-20 mb-4" />
                <h1 className="text-3xl font-bold text-textDark mb-2">Payment Successful!</h1>
                <p className="text-textLight mb-8">
                    Thank you for your purchase. Your order has been confirmed.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link 
                        to="/" 
                        className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-secondary transition-colors"
                    >
                        Continue Shopping
                    </Link>
                     <Link 
                        to="/my-purchases" 
                        className="inline-block bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        View My Purchases
                    </Link>
                </div>
            </motion.div>
        </Layout>
    );
};

export default PaymentStatusPage;
