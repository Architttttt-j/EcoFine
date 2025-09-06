import React from 'react';
import Layout from '../components/Layout';
import { useAppContext } from '../context/AppContext';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const MyPurchasesPage: React.FC = () => {
    const { purchases } = useAppContext();

    return (
        <Layout>
            <h1 className="text-3xl font-bold text-textDark mb-6 flex items-center">
                <Heart className="mr-3 text-primary" size={28} />
                My Purchases
            </h1>

            {purchases.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <ul className="divide-y divide-gray-200">
                        {purchases.map(item => (
                            <li key={`${item.id}-${item.purchaseDate}`} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4 flex-grow">
                                    <img src={item.imageUrls[0]} alt={item.title} className="w-24 h-24 rounded-md object-cover hidden sm:block" />
                                    <div className="flex-grow">
                                        <Link to={`/product/${item.id}`} className="font-semibold text-lg text-textDark hover:text-primary transition-colors">{item.title}</Link>
                                        <p className="text-primary font-bold text-md">${item.price.toFixed(2)}</p>
                                        <p className="text-textLight text-sm">Purchased on: {new Date(item.purchaseDate).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 mt-4 sm:mt-0">
                                     <Link to={`/product/${item.id}`} className="px-4 py-2 text-sm font-medium text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                                        View Item
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow-sm">
                    <h2 className="text-xl font-semibold text-gray-800">You have no past purchases.</h2>
                    <p className="text-gray-500 mt-2">Find something you love and make your first purchase!</p>
                     <Link to="/" className="mt-6 inline-block bg-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-secondary transition-colors">
                        Start Shopping
                    </Link>
                </div>
            )}
        </Layout>
    );
};

export default MyPurchasesPage;