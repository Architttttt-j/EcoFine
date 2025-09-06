import React, { useState, useMemo } from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../constants';
import { Search, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../types';

const ProductFeed: React.FC = () => {
    const { products } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const filteredProducts: Product[] = useMemo(() => {
        return products.filter(product => {
            const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
            const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [products, searchTerm, selectedCategory]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1
        }
    };
    
    return (
        <div className="space-y-8">
            {/* Search and Filter Section */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search for items..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent"
                            aria-label="Search for items"
                        />
                    </div>
                    <div className="relative">
                        <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="w-full md:w-48 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                            aria-label="Filter by category"
                        >
                            <option>All</option>
                            {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div>
                <h2 className="text-2xl font-bold text-textDark mb-4">Featured Items</h2>
                 {filteredProducts.length > 0 ? (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredProducts.map(product => (
                            <motion.div key={product.id} variants={itemVariants}>
                                <ProductCard product={product} />
                            </motion.div>
                        ))}
                    </motion.div>
                ) : (
                     <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                        <h3 className="text-xl font-semibold text-gray-800">No items found</h3>
                        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductFeed;
