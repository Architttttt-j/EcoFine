
import React from 'react';
import { Recycle } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0">
                        <div className="flex items-center space-x-2 text-xl font-bold text-primary">
                            <Recycle size={24} className="text-accent" />
                            <span>EcoFinds</span>
                        </div>
                        <p className="text-sm text-textLight mt-1">Buy. Sell. Sustain.</p>
                    </div>
                    <p className="text-sm text-textLight">
                        © {new Date().getFullYear()} EcoFinds. All rights reserved.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="#" className="text-textLight hover:text-primary transition-colors">Privacy Policy</a>
                        <a href="#" className="text-textLight hover:text-primary transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;