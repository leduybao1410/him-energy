'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section, Container } from "@/components/ui";
import { Wind, CheckCircle, ArrowRight, Shield, Zap, TrendingUp, Users, Volume2 } from 'lucide-react';
import Link from 'next/link';

export default function WindPowerPage() {
    const features = [
        {
            icon: <Zap className="w-8 h-8 text-cyan-500" />,
            title: 'Hiệu suất cao',
            description: 'Turbine gió với công nghệ tiên tiến, hiệu suất chuyển đổi lên đến 45%'
        },
        {
            icon: <Volume2 className="w-8 h-8 text-green-500" />,
            title: 'Tiếng ồn thấp',
            description: 'Thiết kế cánh quạt tối ưu giảm tiếng ồn xuống dưới 40dB'
        },
        {
            icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
            title: 'Vận hành 24/7',
            description: 'Tự động vận hành liên tục, tận dụng tối đa năng lượng gió'
        },
        {
            icon: <Users className="w-8 h-8 text-purple-500" />,
            title: 'Bảo trì thông minh',
            description: 'Hệ thống giám sát từ xa và bảo trì dự đoán'
        }
    ];

    const turbineTypes = [
        {
            name: 'Turbine Gió Dân dụng',
            capacity: '1-10 kW',
            height: '12-30m',
            features: [
                'Phù hợp nhà riêng, trang trại',
                'Tiết kiệm 40-60% hóa đơn điện',
                'Lắp đặt trong 2-3 ngày',
                'Bảo hành 15 năm'
            ],
            price: 'Từ 80 triệu',
            popular: false
        },
        {
            name: 'Turbine Gió Công nghiệp',
            capacity: '50-500 kW',
            height: '50-100m',
            features: [
                'Phù hợp nhà máy, khu công nghiệp',
                'Tiết kiệm 50-70% hóa đơn điện',
                'Lắp đặt trong 1-2 tuần',
                'Hỗ trợ tài chính linh hoạt'
            ],
            price: 'Từ 500 triệu',
            popular: true
        },
        {
            name: 'Turbine Gió Quy mô lớn',
            capacity: '1-5 MW',
            height: '100-150m',
            features: [
                'Phù hợp dự án năng lượng tái tạo',
                'Sản xuất điện thương mại',
                'Lắp đặt theo tiến độ dự án',
                'Tư vấn tài chính chuyên sâu'
            ],
            price: 'Theo dự án',
            popular: false
        }
    ];

    const advantages = [
        {
            title: 'Nguồn năng lượng vô tận',
            description: 'Gió là nguồn năng lượng tự nhiên, không bao giờ cạn kiệt'
        },
        {
            title: 'Thân thiện môi trường',
            description: 'Không phát thải khí nhà kính, góp phần bảo vệ môi trường'
        },
        {
            title: 'Chi phí vận hành thấp',
            description: 'Sau khi lắp đặt, chi phí vận hành và bảo trì rất thấp'
        },
        {
            title: 'Tạo việc làm địa phương',
            description: 'Tạo ra nhiều cơ hội việc làm trong lĩnh vực năng lượng tái tạo'
        }
    ];

    return (
        <div className="min-h-screen bg-secondary w-full">
            <Header />

            {/* Hero Section */}
            <Section id="wind-hero" background="gradient">
                <Container maxWidth="6xl">
                    <div className="py-20 text-center">
                        <div className="mb-8">
                            <Wind className="w-20 h-20 text-cyan-400 mx-auto mb-6" />
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                Năng lượng <span className="text-cyan-400">Gió</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                                Turbine gió công nghiệp và dân dụng với thiết kế tối ưu,
                                tận dụng tối đa nguồn năng lượng gió tự nhiên
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mt-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-cyan-400 mb-2">200+</div>
                                <div className="text-white/80">Dự án đã triển khai</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-cyan-400 mb-2">25MW</div>
                                <div className="text-white/80">Tổng công suất</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-cyan-400 mb-2">95%</div>
                                <div className="text-white/80">Hiệu suất vận hành</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Features Section */}
            <Section id="wind-features" background="white">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Ưu điểm của <span className="text-primary-600">Năng lượng Gió</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Công nghệ tiên tiến, hiệu suất cao và thân thiện với môi trường
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

            {/* Advantages Section */}
            <Section id="wind-advantages" background="gray">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Lợi ích <span className="text-primary-600">Bền vững</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Năng lượng gió mang lại nhiều lợi ích cho môi trường và kinh tế
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {advantages.map((advantage, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{advantage.title}</h3>
                                <p className="text-gray-600 text-lg">{advantage.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Turbine Types Section */}
            <Section id="wind-turbines" background="white">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Loại Turbine <span className="text-primary-600">Phù hợp</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Lựa chọn loại turbine gió phù hợp với nhu cầu và điều kiện địa lý
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {turbineTypes.map((turbine, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg p-8 ${turbine.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                                {turbine.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        Phổ biến nhất
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{turbine.name}</h3>
                                    <div className="text-3xl font-bold text-primary-600 mb-2">{turbine.capacity}</div>
                                    <div className="text-lg text-gray-600 mb-2">Chiều cao: {turbine.height}</div>
                                    <div className="text-xl text-gray-800 font-semibold">{turbine.price}</div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {turbine.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-3">
                                            <CheckCircle className="w-5 h-5 text-primary-500 flex-shrink-0" />
                                            <span className="text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${turbine.popular
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
            <Section id="wind-cta" background="primary">
                <Container maxWidth="4xl">
                    <div className="text-center py-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Khám phá tiềm năng gió?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Liên hệ với chúng tôi để được đánh giá tiềm năng gió và tư vấn giải pháp phù hợp
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="bg-white text-primary-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                                Đánh giá tiềm năng gió
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
