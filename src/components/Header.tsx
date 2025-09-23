'use client';

import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-cyan-500/20">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <div className="relative">
                            <Zap className="h-8 w-8 text-cyan-400" />
                            <div className="absolute inset-0 h-8 w-8 bg-cyan-400/20 rounded-full animate-pulse"></div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Him Energy
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-8">
                        <a
                            href="#solutions"
                            className="text-white hover:text-cyan-400 transition-colors duration-300 relative group"
                        >
                            Solutions
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a
                            href="#technology"
                            className="text-white hover:text-cyan-400 transition-colors duration-300 relative group"
                        >
                            Technology
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a
                            href="#about"
                            className="text-white hover:text-cyan-400 transition-colors duration-300 relative group"
                        >
                            About Us
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <a
                            href="#contact"
                            className="text-white hover:text-cyan-400 transition-colors duration-300 relative group"
                        >
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-full transition-all duration-300"></span>
                        </a>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/25">
                            Get Started
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden text-white hover:text-cyan-400 transition-colors duration-300"
                    >
                        {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 pb-4 border-t border-cyan-500/20 pt-4">
                        <nav className="flex flex-col space-y-4">
                            <a
                                href="#solutions"
                                className="text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Solutions
                            </a>
                            <a
                                href="#technology"
                                className="text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Technology
                            </a>
                            <a
                                href="#about"
                                className="text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                About Us
                            </a>
                            <a
                                href="#contact"
                                className="text-white hover:text-cyan-400 transition-colors duration-300 py-2"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Contact
                            </a>
                            <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 w-full mt-4">
                                Get Started
                            </button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
