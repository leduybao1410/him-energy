import { Sun, Wind, Leaf, CheckCircle } from 'lucide-react';
import { Section, Container, AnimationText } from '@/components/ui';

const ServicesSection = () => {
    const servicesData = [
        {
            icon: <Sun className="w-20 h-20 text-white" />,
            title: 'Năng lượng Mặt trời',
            description: 'Hệ thống pin mặt trời hiệu suất cao với công nghệ tiên tiến, giúp tiết kiệm chi phí điện và bảo vệ môi trường.',
            gradient: 'from-yellow-400 to-orange-500',
            features: [
                'Lắp đặt và bảo trì chuyên nghiệp',
                'Bảo hành lên đến 25 năm',
                'Hỗ trợ tài chính linh hoạt'
            ]
        },
        {
            icon: <Wind className="w-20 h-20 text-white" />,
            title: 'Năng lượng Gió',
            description: 'Turbine gió công nghiệp và dân dụng với thiết kế tối ưu, tận dụng tối đa nguồn năng lượng gió tự nhiên.',
            gradient: 'from-secondary-400 to-cyan-500',
            features: [
                'Thiết kế tùy chỉnh theo địa hình',
                'Vận hành tự động 24/7',
                'Hiệu suất cao, tiếng ồn thấp'
            ]
        },
        {
            icon: <Leaf className="w-20 h-20 text-white" />,
            title: 'Tư vấn Năng lượng',
            description: 'Dịch vụ tư vấn chuyên sâu về chuyển đổi năng lượng, giúp tối ưu hóa hiệu quả và giảm chi phí vận hành.',
            gradient: 'from-primary-400 to-secondary-500',
            features: [
                'Đánh giá năng lượng toàn diện',
                'Thiết kế giải pháp tùy chỉnh',
                'Hỗ trợ thực hiện và vận hành'
            ]
        }
    ];

    return (
        <Section id="solutions" background="light-grey" backgroundImage="/Vinteg_wind_power_4.jpg">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <AnimationText
                        animation="slideInDown"
                        timing="slow"
                        delay="medium"
                        trigger="onScroll"
                        className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Giải pháp <span className="text-primary-600 animate-pulse">Năng lượng</span>
                    </AnimationText>
                    <AnimationText
                        animation="slideInDown"
                        timing="slow"
                        delay="medium"
                        trigger="onScroll"
                        className="text-xl text-white/80 max-w-3xl mx-auto"
                        as="p"
                    >
                        Cung cấp đa dạng các giải pháp năng lượng tái tạo phù hợp với mọi nhu cầu
                        từ hộ gia đình đến doanh nghiệp lớn.
                    </AnimationText>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {servicesData.map((service, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className={`h-64 bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                                {service.icon}
                            </div>
                            <div className="p-6 bg-white/90">
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                                <p className="text-gray-600 mb-4">
                                    {service.description}
                                </p>
                                <ul className="space-y-2 text-sm text-gray-600">
                                    {service.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center gap-2">
                                            <CheckCircle className="w-4 h-4 text-primary-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ServicesSection;
