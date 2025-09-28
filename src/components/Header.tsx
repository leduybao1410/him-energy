'use client';

import { useState, useEffect } from 'react';
import { Menu, X, Sun, Wind, Leaf, ChevronDown } from 'lucide-react';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigationItems = [
        { name: 'Trang chủ', href: '#home' },
        { name: 'Giải pháp', href: '#solutions', hasDropdown: true },
        { name: 'Về chúng tôi', href: '#about' },
        { name: 'Dự án', href: '#projects' },
        { name: 'Liên hệ', href: '#contact' },
    ];

    const solutionsDropdown = [
        { name: 'Năng lượng Mặt trời', icon: Sun, href: '#solar' },
        { name: 'Năng lượng Gió', icon: Wind, href: '#wind' },
        { name: 'Tư vấn Năng lượng', icon: Leaf, href: '#consulting' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-emerald-100'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Sun className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className={`text-2xl font-bold ${isScrolled ? 'text-gray-900' : 'text-white'}`}>Him Energy</h1>
                            <p className="text-xs text-primary-600 font-medium">Năng lượng xanh</p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-6">
                        {navigationItems.map((item) => (
                            <div key={item.name} className="relative group">
                                <a
                                    href={item.href}
                                    className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-300 ${isScrolled
                                        ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                                        : 'text-white hover:text-primary-300 hover:bg-white/10'
                                        }`}
                                >
                                    <span>{item.name}</span>
                                    {item.hasDropdown && (
                                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                                    )}
                                </a>

                                {/* Dropdown for Solutions */}
                                {item.hasDropdown && (
                                    <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="p-2">
                                            {solutionsDropdown.map((solution) => (
                                                <a
                                                    key={solution.name}
                                                    href={solution.href}
                                                    className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary-50 transition-colors duration-200 group/item"
                                                >
                                                    <div className="w-8 h-8 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-lg flex items-center justify-center group-hover/item:from-primary-200 group-hover/item:to-secondary-200 transition-all duration-200">
                                                        <solution.icon className="w-4 h-4 text-primary-600" />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-gray-900">{solution.name}</div>
                                                        <div className="text-sm text-gray-500">Giải pháp tối ưu</div>
                                                    </div>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <button className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${isScrolled
                            ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25'
                            : 'bg-white/20 hover:bg-white/30 text-white border border-white/30 backdrop-blur-sm'
                            }`}>
                            Báo giá miễn phí
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className={`lg:hidden p-2 rounded-lg transition-colors duration-300 ${isScrolled
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-white hover:bg-white/10'
                            }`}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg">
                        <div className="container mx-auto px-4 py-6">
                            <nav className="space-y-4">
                                {navigationItems.map((item) => (
                                    <div key={item.name}>
                                        <a
                                            href={item.href}
                                            className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {item.name}
                                        </a>
                                        {item.hasDropdown && (
                                            <div className="ml-4 mt-2 space-y-2">
                                                {solutionsDropdown.map((solution) => (
                                                    <a
                                                        key={solution.name}
                                                        href={solution.href}
                                                        className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                                                        onClick={() => setIsMenuOpen(false)}
                                                    >
                                                        <solution.icon className="w-4 h-4" />
                                                        <span>{solution.name}</span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-gray-200">
                                    <button
                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Báo giá miễn phí
                                    </button>
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
