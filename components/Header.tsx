
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { Recycle, ShoppingCart, User as UserIcon, Menu, X, Package, Heart, LogOut } from 'lucide-react';

const Header: React.FC = () => {
    const { currentUser, logout, cart } = useAppContext();
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setIsProfileOpen(false);
        navigate('/');
    };
    
    const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const NavLinks: React.FC<{className?: string}> = ({className}) => (
        <div className={`flex items-center space-x-4 ${className}`}>
            {currentUser && (
                <Link to="/cart" className="relative text-primary hover:text-secondary transition-colors duration-300">
                    <ShoppingCart size={24} />
                    {totalCartItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                            {totalCartItems}
                        </span>
                    )}
                </Link>
            )}
        </div>
    );

    const UserMenu: React.FC = () => (
      <>
        {currentUser ? (
            <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="focus:outline-none">
                    <img src={currentUser.profilePicture} alt="Profile" className="w-10 h-10 rounded-full border-2 border-accent object-cover" />
                </button>
                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ring-1 ring-black ring-opacity-5">
                        <div className="px-4 py-2 text-sm text-gray-700">
                            <p className="font-semibold">{currentUser.username}</p>
                            <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                        </div>
                        <div className="border-t border-gray-100"></div>
                        <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           <UserIcon size={16} className="mr-2" /> Profile
                        </Link>
                        <Link to="/my-listings" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           <Package size={16} className="mr-2" /> My Listings
                        </Link>
                        <Link to="/my-purchases" onClick={() => setIsProfileOpen(false)} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                           <Heart size={16} className="mr-2" /> My Purchases
                        </Link>
                        <div className="border-t border-gray-100"></div>
                        <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                            <LogOut size={16} className="mr-2" /> Logout
                        </button>
                    </div>
                )}
            </div>
        ) : (
            <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-sm font-medium text-primary hover:text-secondary transition-colors">Login</Link>
                <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-secondary transition-colors">Sign Up</Link>
            </div>
        )}
      </>
    );

    return (
        <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
                        <Recycle size={28} className="text-accent" />
                        <span>EcoFinds</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-6">
                       <NavLinks />
                       <UserMenu />
                    </div>

                    <div className="md:hidden flex items-center">
                        <NavLinks className="mr-4"/>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-primary">
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-white pb-4">
                    <div className="px-5">
                       <UserMenu />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;