import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { CATEGORIES } from '../constants';
import { PlusCircle } from 'lucide-react';
import type { Product } from '../types';

const AddProductPage: React.FC = () => {
    const { addProduct } = useAppContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(CATEGORIES[0]);
    const [price, setPrice] = useState('');
    const [imageUrls, setImageUrls] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !category || !price || !imageUrls) {
            setError('Please fill in all fields.');
            return;
        }
        
        const priceNumber = parseFloat(price);
        if (isNaN(priceNumber) || priceNumber <= 0) {
            setError('Please enter a valid price.');
            return;
        }
        
        const urls = imageUrls.split(',').map(url => url.trim()).filter(url => url);
        if (urls.length === 0) {
            setError('Please provide at least one valid image URL.');
            return;
        }


        const newProduct: Omit<Product, 'id' | 'sellerId' | 'sellerName'> = {
            title,
            description,
            category,
            price: priceNumber,
            imageUrls: urls,
        };

        addProduct(newProduct);
        navigate('/my-listings');
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-textDark mb-6 flex items-center">
                    <PlusCircle className="mr-3 text-primary" size={28} />
                    List a New Item
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</p>}
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"></textarea>
                    </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                            <select id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary">
                                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
                            <input type="number" id="price" value={price} onChange={e => setPrice(e.target.value)} required min="0.01" step="0.01" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="imageUrls" className="block text-sm font-medium text-gray-700">Image URLs (comma-separated)</label>
                        <textarea id="imageUrls" value={imageUrls} onChange={e => setImageUrls(e.target.value)} required rows={3} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary" placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg" />
                    </div>
                    <div>
                        <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddProductPage;