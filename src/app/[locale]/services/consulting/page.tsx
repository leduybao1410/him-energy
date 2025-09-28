'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Section, Container } from "@/components/ui";
import { Users, CheckCircle, ArrowRight, Shield, Zap, TrendingUp, FileText, Target, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function ConsultingPage() {
    const services = [
        {
            icon: <FileText className="w-8 h-8 text-green-500" />,
            title: 'Đánh giá Năng lượng',
            description: 'Phân tích toàn diện hiện trạng sử dụng năng lượng và xác định tiềm năng tiết kiệm'
        },
        {
            icon: <Target className="w-8 h-8 text-blue-500" />,
            title: 'Thiết kế Giải pháp',
            description: 'Thiết kế hệ thống năng lượng tái tạo tối ưu phù hợp với nhu cầu và ngân sách'
        },
        {
            icon: <Lightbulb className="w-8 h-8 text-yellow-500" />,
            title: 'Tư vấn Tài chính',
            description: 'Hỗ trợ tìm nguồn tài chính, tính toán ROI và lập kế hoạch đầu tư'
        },
        {
            icon: <Shield className="w-8 h-8 text-purple-500" />,
            title: 'Hỗ trợ Pháp lý',
            description: 'Tư vấn về quy định, giấy phép và thủ tục pháp lý liên quan'
        }
    ];

    const consultingPackages = [
        {
            name: 'Gói Cơ bản',
            duration: '1-2 tuần',
            price: 'Từ 10 triệu',
            features: [
                'Đánh giá năng lượng cơ bản',
                'Báo cáo tiềm năng tiết kiệm',
                'Đề xuất giải pháp tổng quan',
                'Tư vấn qua điện thoại'
            ],
            popular: false
        },
        {
            name: 'Gói Chuyên nghiệp',
            duration: '2-4 tuần',
            price: 'Từ 25 triệu',
            features: [
                'Đánh giá năng lượng chi tiết',
                'Thiết kế hệ thống tối ưu',
                'Tính toán ROI chính xác',
                'Hỗ trợ tìm nguồn tài chính',
                'Tư vấn trực tiếp tại chỗ'
            ],
            popular: true
        },
        {
            name: 'Gói Toàn diện',
            duration: '4-8 tuần',
            price: 'Từ 50 triệu',
            features: [
                'Đánh giá năng lượng toàn diện',
                'Thiết kế hệ thống chuyên sâu',
                'Hỗ trợ thực hiện dự án',
                'Giám sát và đánh giá hiệu quả',
                'Hỗ trợ pháp lý và thủ tục'
            ],
            popular: false
        }
    ];

    const processSteps = [
        {
            step: '01',
            title: 'Tiếp nhận yêu cầu',
            description: 'Thu thập thông tin về nhu cầu, ngân sách và mục tiêu của khách hàng'
        },
        {
            step: '02',
            title: 'Khảo sát và đánh giá',
            description: 'Khảo sát địa điểm, đánh giá hiện trạng và tiềm năng năng lượng'
        },
        {
            step: '03',
            title: 'Thiết kế giải pháp',
            description: 'Thiết kế hệ thống tối ưu và lập kế hoạch triển khai chi tiết'
        },
        {
            step: '04',
            title: 'Báo cáo và tư vấn',
            description: 'Trình bày giải pháp, tư vấn tài chính và hỗ trợ quyết định'
        }
    ];

    const expertise = [
        {
            title: 'Kinh nghiệm 10+ năm',
            description: 'Đội ngũ chuyên gia giàu kinh nghiệm trong lĩnh vực năng lượng tái tạo'
        },
        {
            title: '1000+ dự án',
            description: 'Đã tư vấn thành công cho hơn 1000 dự án năng lượng tái tạo'
        },
        {
            title: 'Tiết kiệm 40%',
            description: 'Giúp khách hàng tiết kiệm trung bình 40% chi phí năng lượng'
        },
        {
            title: 'Hài lòng 98%',
            description: '98% khách hàng hài lòng với dịch vụ tư vấn của chúng tôi'
        }
    ];

    return (
        <div className="min-h-screen bg-secondary w-full">
            <Header />

            {/* Hero Section */}
            <Section id="consulting-hero" background="gradient">
                <Container maxWidth="6xl">
                    <div className="py-20 text-center">
                        <div className="mb-8">
                            <Users className="w-20 h-20 text-green-400 mx-auto mb-6" />
                            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                                Tư vấn <span className="text-green-400">Năng lượng</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                                Dịch vụ tư vấn chuyên sâu về chuyển đổi năng lượng,
                                giúp tối ưu hóa hiệu quả và giảm chi phí vận hành
                            </p>
                        </div>

                        <div className="grid md:grid-cols-4 gap-6 mt-12">
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-green-400 mb-2">10+</div>
                                <div className="text-white/80">Năm kinh nghiệm</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-green-400 mb-2">1000+</div>
                                <div className="text-white/80">Dự án đã tư vấn</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-green-400 mb-2">40%</div>
                                <div className="text-white/80">Tiết kiệm chi phí</div>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                                <div className="text-3xl font-bold text-green-400 mb-2">98%</div>
                                <div className="text-white/80">Khách hàng hài lòng</div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Services Section */}
            <Section id="consulting-services" background="white">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Dịch vụ <span className="text-primary-600">Tư vấn</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Cung cấp giải pháp tư vấn toàn diện cho mọi nhu cầu năng lượng tái tạo
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {services.map((service, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-50 transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600">{service.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Expertise Section */}
            <Section id="consulting-expertise" background="gray">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Chuyên môn <span className="text-primary-600">Hàng đầu</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Đội ngũ chuyên gia giàu kinh nghiệm và thành tích ấn tượng
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {expertise.map((item, index) => (
                            <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                                <h3 className="text-2xl font-bold text-primary-600 mb-4">{item.title}</h3>
                                <p className="text-gray-600">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Process Section */}
            <Section id="consulting-process" background="white">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Quy trình <span className="text-primary-600">Tư vấn</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Quy trình làm việc chuyên nghiệp đảm bảo chất lượng tư vấn tối ưu
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="text-center">
                                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                                    {step.step}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* Packages Section */}
            <Section id="consulting-packages" background="gray">
                <Container maxWidth="6xl">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Gói tư vấn <span className="text-primary-600">Phù hợp</span>
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                            Lựa chọn gói tư vấn phù hợp với quy mô và nhu cầu của dự án
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {consultingPackages.map((pkg, index) => (
                            <div key={index} className={`relative bg-white rounded-2xl shadow-lg p-8 ${pkg.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''}`}>
                                {pkg.popular && (
                                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        Phổ biến nhất
                                    </div>
                                )}

                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                                    <div className="text-lg text-gray-600 mb-2">Thời gian: {pkg.duration}</div>
                                    <div className="text-3xl font-bold text-primary-600">{pkg.price}</div>
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
                                    Đăng ký tư vấn
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                </Container>
            </Section>

            {/* CTA Section */}
            <Section id="consulting-cta" background="primary">
                <Container maxWidth="4xl">
                    <div className="text-center py-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Cần tư vấn chuyên nghiệp?
                        </h2>
                        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                            Liên hệ với chúng tôi để được tư vấn miễn phí và đánh giá tiềm năng dự án
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
