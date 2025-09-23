import { Zap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-cyan-500/20">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="relative">
                                <Zap className="h-8 w-8 text-cyan-400" />
                                <div className="absolute inset-0 h-8 w-8 bg-cyan-400/20 rounded-full animate-pulse"></div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Him Energy
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed">
                            Pioneering the future of sustainable energy solutions. We harness the power of nature to create a cleaner, brighter tomorrow for generations to come.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                <Linkedin className="h-5 w-5" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#solutions" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    Solar Solutions
                                </a>
                            </li>
                            <li>
                                <a href="#wind" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    Wind Energy
                                </a>
                            </li>
                            <li>
                                <a href="#hydro" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    Hydroelectric
                                </a>
                            </li>
                            <li>
                                <a href="#storage" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    Energy Storage
                                </a>
                            </li>
                            <li>
                                <a href="#smart-grid" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    Smart Grid
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Company</h3>
                        <ul className="space-y-3">
                            <li>
                                <a href="#about" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="#careers" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#news" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    News & Updates
                                </a>
                            </li>
                            <li>
                                <a href="#sustainability" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    Sustainability
                                </a>
                            </li>
                            <li>
                                <a href="#investors" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                    Investors
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-white">Contact Us</h3>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-cyan-400" />
                                <span className="text-gray-400">info@himenergy.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-cyan-400" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-cyan-400 mt-0.5" />
                                <span className="text-gray-400">
                                    123 Energy Street<br />
                                    Green City, GC 12345
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} Him Energy. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <a href="#privacy" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#terms" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                Terms of Service
                            </a>
                            <a href="#cookies" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
