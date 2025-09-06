import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { motion } from 'framer-motion';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <motion.div 
            className="bg-white rounded-lg shadow-md overflow-hidden group"
            whileHover={{ y: -8, scale: 1.03, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <Link to={`/product/${product.id}`} className="block">
                <div className="relative">
                    <img 
                        src={product.imageUrls[0]} 
                        alt={product.title} 
                        className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                     <div className="absolute top-2 left-2 bg-secondary text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {product.category}
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-textDark truncate group-hover:text-primary transition-colors">{product.title}</h3>
                    <p className="text-sm text-textLight mt-1">by {product.sellerName}</p>
                    <p className="text-xl font-bold text-primary mt-2">${product.price.toFixed(2)}</p>
                </div>
            </Link>
        </motion.div>
    );
};

export default ProductCard;