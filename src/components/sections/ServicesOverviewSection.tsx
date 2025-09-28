import { Sun, Wind, Users, ArrowRight, CheckCircle } from 'lucide-react';
import { Section, Container } from '@/components/ui';
import Link from 'next/link';

const ServicesOverviewSection = () => {
    const servicesData = [
        {
            icon: <Sun className="w-16 h-16 text-white" />,
            title: 'Năng lượng Mặt trời',
            description: 'Hệ thống pin mặt trời hiệu suất cao với công nghệ tiên tiến, giúp tiết kiệm chi phí điện và bảo vệ môi trường.',
            gradient: 'from-yellow-400 to-orange-500',
            features: [
                'Lắp đặt và bảo trì chuyên nghiệp',
                'Bảo hành lên đến 25 năm',
                'Hỗ trợ tài chính linh hoạt',
                'Giám sát hiệu suất 24/7'
            ],
            link: '/services/solar',
            stats: {
                projects: '500+',
                capacity: '50MW',
                savings: '30%'
            }
        },
        {
            icon: <Wind className="w-16 h-16 text-white" />,
            title: 'Năng lượng Gió',
            description: 'Turbine gió công nghiệp và dân dụng với thiết kế tối ưu, tận dụng tối đa nguồn năng lượng gió tự nhiên.',
            gradient: 'from-cyan-400 to-blue-500',
            features: [
                'Thiết kế tùy chỉnh theo địa hình',
                'Vận hành tự động 24/7',
                'Hiệu suất cao, tiếng ồn thấp',
                'Bảo trì định kỳ chuyên nghiệp'
            ],
            link: '/services/wind',
            stats: {
                projects: '200+',
                capacity: '25MW',
                efficiency: '95%'
            }
        },
        {
            icon: <Users className="w-16 h-16 text-white" />,
            title: 'Tư vấn Năng lượng',
            description: 'Dịch vụ tư vấn chuyên sâu về chuyển đổi năng lượng, giúp tối ưu hóa hiệu quả và giảm chi phí vận hành.',
            gradient: 'from-green-400 to-emerald-500',
            features: [
                'Đánh giá năng lượng toàn diện',
                'Thiết kế giải pháp tùy chỉnh',
                'Hỗ trợ thực hiện và vận hành',
                'Tư vấn tài chính và pháp lý'
            ],
            link: '/services/consulting',
            stats: {
                clients: '1000+',
                savings: '40%',
                satisfaction: '98%'
            }
        }
    ];

    return (
        <Section id="services-overview" background="white">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Dịch vụ <span className="text-primary-600">Chuyên nghiệp</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Chúng tôi cung cấp giải pháp năng lượng tái tạo toàn diện với đội ngũ chuyên gia giàu kinh nghiệm
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className={`h-48 bg-gradient-to-br ${service.gradient} flex items-center justify-center relative`}>
                                {service.icon}
                                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-2">
                                    <div className="text-white text-sm font-semibold">
                                        {Object.values(service.stats)[0]}
                                    </div>
                                    <div className="text-white/80 text-xs">
                                        {Object.keys(service.stats)[0]}
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-white">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-4">
                                    {service.description}
                                </p>

                                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    {Object.entries(service.stats).map(([key, value], statIndex) => (
                                        <div key={statIndex} className="text-center">
                                            <div className="text-lg font-bold text-primary-600">{value}</div>
                                            <div className="text-xs text-gray-500 capitalize">{key}</div>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    href={service.link}
                                    className="w-full bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 group"
                                >
                                    Tìm hiểu thêm
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ServicesOverviewSection;
