
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Recycle } from 'lucide-react';
import { motion } from 'framer-motion';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAppContext();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // This is a mock authentication. In a real app, you'd call an API.
        const storedUser = localStorage.getItem('user'); // simplified for demo
        if (storedUser) {
            const user = JSON.parse(storedUser);
            if (user.email === email && user.password === password) {
                login(user);
                navigate('/');
                return;
            }
        }
        
        setError('Invalid email or password.');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-light to-secondary p-4">
            <motion.div 
                className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="text-center">
                     <Link to="/" className="flex items-center justify-center space-x-2 text-3xl font-bold text-primary mb-2">
                        <Recycle size={32} className="text-accent" />
                        <span>EcoFinds</span>
                    </Link>
                    <h2 className="text-xl text-textLight">Welcome back!</h2>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="bg-red-100 text-red-700 p-3 rounded-md text-sm">{error}</p>}
                    
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                    </div>

                    <div>
                        <motion.button 
                            type="submit" 
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Login
                        </motion.button>
                    </div>
                </form>

                <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/signup" className="font-medium text-primary hover:text-secondary">
                        Sign up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default LoginPage;