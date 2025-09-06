import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from 'react-router-dom';
import { AppProvider, useAppContext } from './context/AppContext';
import { AnimatePresence } from 'framer-motion';

// Import all pages
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentStatusPage from './pages/PaymentStatusPage';
import ProfilePage from './pages/ProfilePage';
import MyListingsPage from './pages/MyListingsPage';
import MyPurchasesPage from './pages/MyPurchasesPage';
import AddProductPage from './pages/AddProductPage';
import NotFoundPage from './pages/NotFoundPage';

// A component to protect routes that require authentication
const ProtectedRoute: React.FC = () => {
    const { currentUser } = useAppContext();
    // If no user is logged in, redirect to the login page
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    // Otherwise, render the child routes
    return <Outlet />;
};

// Component to define all application routes
const AppRoutes: React.FC = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductDetailPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                
                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/payment-status" element={<PaymentStatusPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/my-listings" element={<MyListingsPage />} />
                    <Route path="/my-purchases" element={<MyPurchasesPage />} />
                    <Route path="/add-product" element={<AddProductPage />} />
                </Route>

                {/* Catch-all route for 404 Not Found pages */}
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </AnimatePresence>
    );
};

// The main App component that provides the context to all routes
const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AppProvider>
  );
};

export default App;