'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Sun, Wind, Leaf, ChevronDown } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { useAuth } from '@/hooks/useAuth';
import { UserIcon } from 'lucide-react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [headerStyle, setHeaderStyle] = useState<'auto' | 'fixed' | 'gradient'>('auto');
    const t = useTranslations('common');

    const { isAuthenticated, logout } = useAuth();

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Load header style preference from localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const savedStyle = localStorage.getItem('headerStyle') as 'auto' | 'fixed' | 'gradient';
        if (savedStyle && ['auto', 'fixed', 'gradient'].includes(savedStyle)) {
            setHeaderStyle(savedStyle);
        }
    }, []);

    // Save header style preference to localStorage
    useEffect(() => {
        if (typeof window === 'undefined') return;

        localStorage.setItem('headerStyle', headerStyle);
    }, [headerStyle]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const navigationItems = [
        { name: t('navigation.home'), href: '/', isExternal: false },
        { name: t('navigation.services'), href: '/services', isExternal: false },
        { name: t('navigation.products'), href: '/products', isExternal: false },
        // { name: t('navigation.solutions'), href: '#solutions', hasDropdown: true },
        { name: t('navigation.about'), href: '/about', isExternal: false },
        // { name: t('navigation.projects'), href: '/projects', isExternal: false },
        { name: t('navigation.contact'), href: '/contact', isExternal: false },
    ];

    const solutionsDropdown = [
        { name: t('solutions.solar'), icon: Sun, href: '/services/solar' },
        { name: t('solutions.wind'), icon: Wind, href: '/services/wind' },
        { name: t('solutions.consulting'), icon: Leaf, href: '/services/consulting' },
    ];


    // Xác định style của header
    const getHeaderClasses = () => {
        if (headerStyle === 'fixed') {
            return 'bg-white/98 backdrop-blur-xl shadow-2xl border-b border-emerald-200/50';
        }
        if (headerStyle === 'gradient') {
            return 'bg-gradient-to-r from-white/95 via-emerald-50/95 to-white/95 backdrop-blur-xl shadow-2xl border-b border-emerald-200/50';
        }
        // Auto mode - thay đổi dựa trên scroll
        return isScrolled
            ? 'bg-white/98 backdrop-blur-xl shadow-2xl border-b border-emerald-200/50'
            :
            'bg-transparent';
        //  'bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-lg border-b border-white/20';
    };

    const getTextClasses = (isScrolled: boolean) => {
        if (headerStyle === 'fixed' || headerStyle === 'gradient') {
            return {
                title: 'text-gray-900 drop-shadow-sm',
                subtitle: 'text-primary-600',
                nav: 'text-gray-700 hover:text-primary-600 hover:bg-primary-50 shadow-sm',
                button: 'text-gray-700 hover:bg-gray-100 shadow-sm',
                cta: 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25'
            };
        }
        return {
            title: isScrolled ? 'text-gray-900 drop-shadow-sm' : 'text-white drop-shadow-lg',
            subtitle: isScrolled ? 'text-primary-600' : 'text-white/90',
            nav: isScrolled ? 'text-gray-700 hover:text-primary-600 hover:bg-primary-50 shadow-none ' : ' text-white  hover:text-primary-300 hover:bg-white/20 drop-shadow-lg hover:drop-shadow-xl',
            button: isScrolled ? 'text-gray-700 hover:bg-gray-100 shadow-sm' : 'text-white hover:bg-white/20 drop-shadow-lg',
            cta: isScrolled ? 'bg-primary-600 hover:bg-primary-700 text-white shadow-lg shadow-primary-500/25' : 'bg-white/30 hover:bg-white/40 text-white border border-white/40 backdrop-blur-sm drop-shadow-lg'
        };
    };

    const textClasses = getTextClasses(isScrolled);
    const currentLocale = useLocale();

    const isActive = (href: string) => {
        if (typeof window === 'undefined') return false;
        const currentPath = window.location.pathname;
        return currentPath === `/${currentLocale}${href === '/' ? '' : href}`;
    };


    return (
        <header

            className={`fixed top-0 left-0 right-0 z-50 transition-all  duration-500 ${getHeaderClasses()}`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-3">
                        {/* <div className="relative">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                                <Sun className="w-6 h-6 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                        </div>
                        <div>
                            <h1 className={`text-2xl font-bold transition-colors duration-500 ${textClasses.title}`}>Him Energy</h1>
                            <p className={`text-xs font-medium transition-colors duration-500 ${textClasses.subtitle}`}>{t('navigation.greenEnergy')}</p> 
                        </div>*/}
                        <img src="/energy_logo_rectangle.png" alt="Him Energy" width={130} height={100} className='rounded-lg' />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-3">
                        {navigationItems.map((item) => (
                            <div key={item.name} className="relative group">
                                {item.isExternal === false ? (
                                    <Link
                                        href={item.href}
                                        data-active={isActive(item.href)}
                                        className={`flex flex-nowrap items-center space-x-1 p-2 rounded-lg transition-all duration-500 ${textClasses.nav} data-[active=true]:text-primary-600 `}
                                    >
                                        <span className="whitespace-nowrap">{item.name}</span>
                                    </Link>
                                ) : (
                                    <a
                                        href={item.href}
                                        className={`flex items-center space-x-1 px-4 py-2 rounded-lg transition-all duration-500 ${textClasses.nav} data-[active=true]:text-primary-600 `}
                                    >
                                        <span>{item.name}</span>
                                    </a>
                                )}

                            </div>
                        ))}
                    </nav>

                    {/* CTA Button & Language Switcher */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <LanguageSwitcher />

                        {/* Header Style Switcher - chỉ hiển thị trong development */}
                        {/* {process.env.NODE_ENV === 'development' && (
                            <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg p-1">
                                <button
                                    onClick={() => setHeaderStyle('auto')}
                                    className={`px-3 py-1 text-xs rounded transition-all duration-300 ${headerStyle === 'auto'
                                        ? 'bg-white/30 text-white'
                                        : 'text-white/70 hover:text-white'
                                        }`}
                                >
                                    Auto
                                </button>
                                <button
                                    onClick={() => setHeaderStyle('fixed')}
                                    className={`px-3 py-1 text-xs rounded transition-all duration-300 ${headerStyle === 'fixed'
                                        ? 'bg-white/30 text-white'
                                        : 'text-white/70 hover:text-white'
                                        }`}
                                >
                                    Fixed
                                </button>
                                <button
                                    onClick={() => setHeaderStyle('gradient')}
                                    className={`px-3 py-1 text-xs rounded transition-all duration-300 ${headerStyle === 'gradient'
                                        ? 'bg-white/30 text-white'
                                        : 'text-white/70 hover:text-white'
                                        }`}
                                >
                                    Gradient
                                </button>
                            </div>
                        )} */}

                        <button className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-500 ${textClasses.cta}`}>
                            {t('navigation.getQuote')}
                        </button>
                        {isAuthenticated && (
                            <DropdownMenu modal={true}>
                                <DropdownMenuTrigger className="cursor-pointer border border-white/80 bg-gray-600/50 hover:bg-gray-600 text-white rounded-full p-2 transition-all duration-500">
                                    <UserIcon className="w-6 h-6 text-white" />
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align='end' className='mt-2 border-white/80'>
                                    <DropdownMenuItem className='cursor-pointer bg-white/80' onClick={logout}>
                                        {t('navigation.logout')}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMenu}
                        className={`lg:hidden p-2 rounded-lg transition-all duration-500 ${textClasses.button}`}
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className={`lg:hidden absolute top-full left-0 right-0 backdrop-blur-xl border-t shadow-2xl ${headerStyle === 'fixed' || headerStyle === 'gradient'
                        ? 'bg-white/98 border-gray-200/50'
                        : 'bg-white/98 border-gray-200/50'
                        }`}>
                        <div className="container mx-auto px-4 py-6">
                            <nav className="space-y-4">
                                {navigationItems.map((item) => (
                                    <div key={item.name}>
                                        {item.isExternal === false ? (
                                            <Link
                                                href={item.href}
                                                className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <a
                                                href={item.href}
                                                className="block px-4 py-3 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors duration-200"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {item.name}
                                            </a>
                                        )}
                                    </div>
                                ))}
                                <div className="pt-4 border-t border-gray-200 space-y-4">
                                    <LanguageSwitcher />
                                    <button
                                        className="w-full bg-primary-600 hover:bg-primary-700 text-white  font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {t('navigation.getQuote')}
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
