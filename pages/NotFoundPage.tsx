
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

const NotFoundPage: React.FC = () => {
    return (
        <Layout>
            <div className="text-center py-20">
                <h1 className="text-6xl font-extrabold text-primary mb-4">404</h1>
                <h2 className="text-3xl font-bold text-textDark mb-2">Page Not Found</h2>
                <p className="text-textLight mb-8">
                    Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </p>
                <Link 
                    to="/" 
                    className="inline-block bg-primary text-white font-bold py-3 px-8 rounded-lg hover:bg-secondary transition-colors"
                >
                    Go Back Home
                </Link>
            </div>
        </Layout>
    );
};

export default NotFoundPage;
