import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import NotFoundPage from './NotFoundPage';
import { ShoppingCart, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const variants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { products, addToCart, currentUser } = useAppContext();
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    
    const product = products.find(p => p.id === id);

    const [[page, direction], setPage] = useState([0, 0]);

    if (!product) {
        return <NotFoundPage />;
    }

    const imageIndex = page % product.imageUrls.length;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    const handleAddToCart = () => {
        if (!currentUser) {
            navigate('/login');
            return;
        }
        addToCart(product);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    return (
        <Layout>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-4">
                     <button onClick={() => navigate(-1)} className="flex items-center text-primary hover:text-secondary mb-4 font-semibold transition-colors">
                        <ChevronLeft size={20} className="mr-1" />
                        Back to products
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
                    {/* Image Carousel */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="relative aspect-square w-full overflow-hidden rounded-lg shadow-lg">
                            <AnimatePresence initial={false} custom={direction}>
                                <motion.img
                                    key={page}
                                    src={product.imageUrls[imageIndex]}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    transition={{
                                        x: { type: "spring", stiffness: 300, damping: 30 },
                                        opacity: { duration: 0.2 }
                                    }}
                                    className="absolute h-full w-full object-cover"
                                />
                            </AnimatePresence>
                            {product.imageUrls.length > 1 && (
                                <>
                                    <div className="absolute right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 cursor-pointer" onClick={() => paginate(1)}>
                                        <ChevronRight className="h-6 w-6 text-gray-800" />
                                    </div>
                                    <div className="absolute left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 cursor-pointer" onClick={() => paginate(-1)}>
                                        <ChevronLeft className="h-6 w-6 text-gray-800" />
                                    </div>
                                </>
                            )}
                        </div>
                         {product.imageUrls.length > 1 && (
                            <div className="flex justify-center gap-2">
                                {product.imageUrls.map((_, i) => (
                                    <div
                                        key={i}
                                        onClick={() => setPage([i, i > imageIndex ? 1 : -1])}
                                        className={`h-16 w-16 cursor-pointer rounded-md border-2 overflow-hidden ${imageIndex === i ? 'border-primary' : 'border-transparent'}`}
                                    >
                                      <img src={_} alt={`thumbnail ${i+1}`} className="h-full w-full object-cover"/>
                                    </div>
                                ))}
                            </div>
                        )}
                    </motion.div>

                    {/* Details */}
                    <motion.div 
                        className="flex flex-col"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold text-textDark mb-2">{product.title}</h1>
                        <p className="text-3xl font-bold text-primary mb-4">${product.price.toFixed(2)}</p>
                        
                        <div className="flex items-center space-x-4 text-textLight mb-6">
                            <div className="flex items-center">
                                <Tag size={16} className="mr-2 text-secondary" />
                                <span>{product.category}</span>
                            </div>
                            <div className="flex items-center">
                                <User size={16} className="mr-2 text-secondary" />
                                <span>Sold by {product.sellerName}</span>
                            </div>
                        </div>

                        <p className="text-textLight leading-relaxed mb-6 flex-grow">{product.description}</p>
                        
                        <div className="mt-auto">
                            <motion.button 
                                onClick={handleAddToCart}
                                className="w-full flex items-center justify-center bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-secondary transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ShoppingCart className="mr-2" size={20} />
                                <AnimatePresence mode="wait">
                                    <motion.span
                                        key={showSuccess ? 'added' : 'add'}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        {showSuccess ? 'Added!' : 'Add to Cart'}
                                    </motion.span>
                                </AnimatePresence>
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </Layout>
    );
};

export default ProductDetailPage;