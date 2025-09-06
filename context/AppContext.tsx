
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Product, CartItem, Purchase } from '../types';
import { MOCK_PRODUCTS } from '../constants';

interface AppContextType {
    currentUser: User | null;
    products: Product[];
    cart: CartItem[];
    purchases: Purchase[];
    login: (user: User) => void;
    logout: () => void;
    signup: (user: User) => void;
    updateUser: (updatedUser: User) => void;
    addProduct: (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (productId: string) => void;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    checkout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem('currentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [products, setProducts] = useState<Product[]>(() => {
        const storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : MOCK_PRODUCTS;
    });
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem(`cart_${currentUser?.id}`);
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [purchases, setPurchases] = useState<Purchase[]>(() => {
        const storedPurchases = localStorage.getItem(`purchases_${currentUser?.id}`);
        return storedPurchases ? JSON.parse(storedPurchases) : [];
    });

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            const userCart = localStorage.getItem(`cart_${currentUser.id}`);
            setCart(userCart ? JSON.parse(userCart) : []);
            const userPurchases = localStorage.getItem(`purchases_${currentUser.id}`);
            setPurchases(userPurchases ? JSON.parse(userPurchases) : []);
        } else {
            localStorage.removeItem('currentUser');
            setCart([]);
            setPurchases([]);
        }
    }, [currentUser]);

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`cart_${currentUser.id}`, JSON.stringify(cart));
        }
    }, [cart, currentUser]);

    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`purchases_${currentUser.id}`, JSON.stringify(purchases));
        }
    }, [purchases, currentUser]);

    const login = (user: User) => setCurrentUser(user);
    const logout = () => setCurrentUser(null);
    const signup = (user: User) => setCurrentUser(user);
    const updateUser = (updatedUser: User) => setCurrentUser(updatedUser);

    const addProduct = (product: Omit<Product, 'id' | 'sellerId' | 'sellerName'>) => {
        if (!currentUser) return;
        const newProduct: Product = {
            ...product,
            id: Date.now().toString(),
            sellerId: currentUser.id,
            sellerName: currentUser.username,
        };
        setProducts(prev => [newProduct, ...prev]);
    };

    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };

    const deleteProduct = (productId: string) => {
        setProducts(prev => prev.filter(p => p.id !== productId));
    };

    const addToCart = (product: Product) => {
        setCart(prev => {
            const existingItem = prev.find(item => item.id === product.id);
            if (existingItem) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };
    
    const clearCart = () => setCart([]);

    const checkout = () => {
        if (!currentUser) return;
        const newPurchases: Purchase[] = cart.map(item => ({
            ...item,
            purchaseDate: new Date().toISOString()
        }));
        setPurchases(prev => [...newPurchases, ...prev]);
        setCart([]);
    };

    return (
        <AppContext.Provider value={{
            currentUser, products, cart, purchases,
            login, logout, signup, updateUser,
            addProduct, updateProduct, deleteProduct,
            addToCart, removeFromCart, clearCart, checkout
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context;
};
