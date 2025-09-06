import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { Package, Trash2, Edit, PlusCircle } from 'lucide-react';

const MyListingsPage: React.FC = () => {
    const { products, currentUser, deleteProduct } = useAppContext();

    const myListings = products.filter(p => p.sellerId === currentUser?.id);

    return (
        <Layout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-textDark flex items-center">
                    <Package className="mr-3 text-primary" size={28} />
                    My Listings
                </h1>
                <Link 
                    to="/add-product" 
                    className="inline-flex items-center justify-center bg-primary hover:bg-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    <PlusCircle className="mr-2" size={20} />
                    List New Item
                </Link>
            </div>

            {myListings.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {myListings.map(product => (
                            <li key={product.id} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4 flex-grow">
                                    <img src={product.imageUrls[0]} alt={product.title} className="w-24 h-24 rounded-md object-cover hidden sm:block" />
                                    <div className="flex-grow">
                                        <h2 className="font-semibold text-lg text-textDark">{product.title}</h2>
                                        <p className="text-primary font-bold text-md">${product.price.toFixed(2)}</p>
                                        <p className="text-textLight text-sm truncate max-w-md">{product.description}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 flex-shrink-0 mt-4 sm:mt-0">
                                    {/* Edit functionality can be added later by linking to a pre-filled AddProductPage */}
                                    <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors" title="Edit (feature coming soon)">
                                        <Edit size={18} />
                                    </button>
                                    <button onClick={() => deleteProduct(product.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors" title="Delete">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">You haven't listed any items yet.</h2>
                    <p className="text-gray-500 mt-2">Start selling by listing your first item!</p>
                </div>
            )}
        </Layout>
    );
};

export default MyListingsPage;