'use client';

import { useState } from 'react';
import {
    Sun,
    Mail,
    Phone,
    MapPin,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    ArrowRight,
    CheckCircle,
    Leaf,
    Wind,
    Zap
} from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail('');
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    const quickLinks = [
        { name: 'Về chúng tôi', href: '#about' },
        { name: 'Giải pháp', href: '#solutions' },
        { name: 'Dự án', href: '#projects' },
        { name: 'Tin tức', href: '#news' },
        { name: 'Tuyển dụng', href: '#careers' },
        { name: 'Liên hệ', href: '#contact' },
    ];

    const services = [
        { name: 'Năng lượng Mặt trời', icon: Sun },
        { name: 'Năng lượng Gió', icon: Wind },
        { name: 'Tư vấn Năng lượng', icon: Leaf },
        { name: 'Hệ thống Lưu trữ', icon: Zap },
    ];

    const socialLinks = [
        { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
        { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
        { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
        { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
        { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
    ];

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                {/* bg-emerald-400 */}
                <div className="absolute top-10 left-10 w-32 h-32  rounded-full animate-pulse"></div>-
                <div className="absolute top-40 right-20 w-24 h-24 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-teal-400 rounded-full animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10">
                {/* Main Footer Content */}
                <div className="container mx-auto px-4 py-16">
                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                        {/* Company Info */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="relative">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <Sun className="w-7 h-7 text-white" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold">Him Energy</h3>
                                    <p className="text-primary-300 text-sm">Năng lượng xanh cho tương lai</p>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-6 max-w-md leading-relaxed">
                                Chúng tôi tiên phong trong việc phát triển các giải pháp năng lượng tái tạo
                                thông minh, giúp doanh nghiệp và cộng đồng chuyển đổi sang tương lai xanh bền vững.
                            </p>

                            {/* Newsletter Signup */}
                            <div className="mb-6">
                                <h4 className="text-lg font-semibold mb-3">Đăng ký nhận tin tức</h4>
                                <form onSubmit={handleSubscribe} className="flex gap-2">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Nhập email của bạn"
                                        className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent placeholder-gray-400"
                                        required
                                    />
                                    <button
                                        type="submit"
                                        className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-primary-500/25 flex items-center gap-2"
                                    >
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                </form>
                                {isSubscribed && (
                                    <div className="flex items-center gap-2 mt-2 text-primary-400">
                                        <CheckCircle className="w-4 h-4" />
                                        <span className="text-sm">Đăng ký thành công!</span>
                                    </div>
                                )}
                            </div>

                            {/* Social Links */}
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        className={`w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition-all duration-300 ${social.color}`}
                                        aria-label={social.name}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center gap-2 group"
                                        >
                                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-lg font-semibold mb-6">Dịch vụ</h4>
                            <ul className="space-y-3">
                                {services.map((service) => (
                                    <li key={service.name}>
                                        <a
                                            href="#"
                                            className="text-gray-300 hover:text-primary-400 transition-colors duration-300 flex items-center gap-3 group"
                                        >
                                            <div className="w-6 h-6 bg-primary-500/20 rounded-lg flex items-center justify-center group-hover:bg-primary-500/30 transition-colors duration-300">
                                                <service.icon className="w-3 h-3 text-primary-400" />
                                            </div>
                                            {service.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Contact Info Bar */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 py-6">
                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                    <Phone className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Điện thoại</p>
                                    <p className="font-semibold">+84 123 456 789</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                    <Mail className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Email</p>
                                    <p className="font-semibold">info@himenergy.com</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-primary-400" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">Địa chỉ</p>
                                    <p className="font-semibold">TP. Hồ Chí Minh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10">
                    <div className="container mx-auto px-4 py-6">
                        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-gray-400 text-sm">
                                © 2024 Him Energy. Tất cả quyền được bảo lưu.
                            </p>
                            <div className="flex flex-wrap gap-6 text-sm">
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                                >
                                    Chính sách bảo mật
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                                >
                                    Điều khoản sử dụng
                                </a>
                                <a
                                    href="#"
                                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                                >
                                    Cookie Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
