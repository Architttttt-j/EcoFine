import React from 'react';
import Header from './Header';
import Footer from './Footer';
// FIX: Import Transition type from framer-motion to explicitly type animation transitions.
import { motion, Transition } from 'framer-motion';

const pageVariants = {
    initial: {
        opacity: 0,
        y: 20
    },
    in: {
        opacity: 1,
        y: 0
    },
    out: {
        opacity: 0,
        y: -20
    }
};

// FIX: Explicitly type pageTransition with the Transition type.
// This helps TypeScript correctly infer the types for properties like 'ease' and 'type',
// which expect specific string literals, resolving the assignment error.
const pageTransition: Transition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5
};


const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen font-sans text-textDark bg-background">
            <Header />
            <motion.main 
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8"
            >
                {children}
            </motion.main>
            <Footer />
        </div>
    );
};

export default Layout;
