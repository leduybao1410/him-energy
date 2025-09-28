'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section, Container } from "@/components/ui";
import { Sun, CheckCircle, ArrowRight, Shield, Zap, TrendingUp, Users } from 'lucide-react';
import Link from 'next/link';

export default function SolarEnergyPage() {
    const features = [
        {
            icon: <Zap className="w-8 h-8 text-yellow-500" />,
            title: 'Hiệu suất cao',
            description: 'Công nghệ pin mặt trời tiên tiến với hiệu suất chuyển đổi lên đến 22%'
        },
        {
            icon: <Shield className="w-8 h-8 text-green-500" />,
            title: 'Bảo hành dài hạn',
            description: 'Bảo hành sản phẩm 12 năm và bảo hành hiệu suất 25 năm'
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
            title: 'Tiết kiệm chi phí',
            description: 'Giảm 70-90% hóa đơn tiền điện và hoàn vốn trong 5-7 năm'
        },
        {
            icon: <Users className="w-8 h-8 text-purple-500" />,
            title: 'Hỗ trợ 24/7',
            description: 'Đội ngũ kỹ thuật chuyên nghiệp hỗ trợ vận hành và bảo trì'
        }
    ];

    const packages = [
        {
            name: 'Gói Gia đình',
            capacity: '3-5 kWp',
            price: 'Từ 45 triệu',
            features: [
                'Phù hợp nhà 2-4 phòng ngủ',
                'Tiết kiệm 50-70% hóa đơn điện',
                'Lắp đặt trong 1-2 ngày',
                'Bảo hành 25 năm'
            ],
            popular: false
        },
        {
            name: 'Gói Doanh nghiệp',
            capacity: '10-50 kWp',
            price: 'Từ 150 triệu',
            features: [
                'Phù hợp văn phòng, nhà xưởng',
                'Tiết kiệm 60-80% hóa đơn điện',
                'Lắp đặt trong 3-5 ngày',
                'Hỗ trợ tài chính linh hoạt'
            ],
            popular: true
        },
        {
            name: 'Gói Công nghiệp',
            capacity: '100+ kWp',
            price: 'Theo dự án',
            features: [
                'Phù hợp nhà máy, khu công nghiệp',
                'Tiết kiệm 70-90% hóa đơn điện',
                'Lắp đặt theo tiến độ dự án',
                'Tư vấn tài chính chuyên sâu'
            ],
            popular: false
        }
    ];

    return (
        <div className="min-h-screen bg-secondary w-full">
            <Header />

            {/* Hero Section */}
            <Section id="solar-hero" background="gradient">
                <Container maxWidth="6xl">
                    <div className="py-20 text-center">
                        <div className="mb-8">
                            <Sun className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                Năng lượng <span className="text-yellow-400">Mặt trời</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                                Hệ thống pin mặt trời hiệu suất cao với công nghệ tiên tiến,
                                giúp tiết kiệm chi phí điện và bảo vệ môi trường
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
                                <div className="text-white/80">Dự án đã triển khai</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">50MW</div>
                                <div className="text-white/80">Tổng công suất</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-yellow-400 mb-2">30%</div>
                                <div className="text-white/80">Tiết kiệm chi phí</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Features Section */}
            <Section id="solar-features" background="white">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Tại sao chọn <span className="text-primary-600">Năng lượng Mặt trời?</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Công nghệ tiên tiến, hiệu suất cao và dịch vụ chuyên nghiệp
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-50 transition-colors">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Packages Section */}
            <Section id="solar-packages" background="gray">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Gói dịch vụ <span className="text-primary-600">Phù hợp</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Lựa chọn gói dịch vụ phù hợp với nhu cầu và ngân sách của bạn
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg p-8 ${pkg.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        Phổ biến nhất
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                    <div className="text-3xl font-bold text-primary-600 mb-2">{pkg.capacity}</div>
                                    <div className="text-xl text-gray-600">{pkg.price}</div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {pkg.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${pkg.popular
                                        ? 'bg-primary-600 hover:bg-primary-700 text-white'
                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                                    }`}>
                                    Tư vấn ngay
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section id="solar-cta" background="primary">
                <Container maxWidth="4xl">
                    <div className="text-center py-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Sẵn sàng bắt đầu?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Liên hệ với chúng tôi để được tư vấn miễn phí và khảo sát địa điểm
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                                Tư vấn miễn phí
                            </button>
                            <Link
                                href="/services"
                                className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
                            >
                                Xem dịch vụ khác
                            </Link>
                        </div>
                    </div>
                </Container>
            </Section>

            <Footer />
        </div>
    );
}
