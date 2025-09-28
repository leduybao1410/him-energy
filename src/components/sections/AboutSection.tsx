import { Globe, Zap, Users } from 'lucide-react';
import { Section, Container, IconCard } from '@/components/ui';

const AboutSection = () => {
    const aboutData = [
        {
            icon: <Globe className="w-8 h-8" />,
            title: 'Sứ mệnh xanh',
            description: 'Giảm thiểu tác động môi trường thông qua các giải pháp năng lượng tái tạo thông minh và bền vững.',
            iconBg: 'primary' as const
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: 'Đổi mới công nghệ',
            description: 'Ứng dụng công nghệ tiên tiến nhất để tối ưu hóa hiệu suất và giảm chi phí năng lượng.',
            iconBg: 'secondary' as const
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: 'Đối tác tin cậy',
            description: 'Xây dựng mối quan hệ lâu dài với khách hàng thông qua dịch vụ chuyên nghiệp và hỗ trợ tận tình.',
            iconBg: 'cyan' as const
        }
    ];

    return (
        <Section id="about" background="secondary">
            <Container maxWidth="6xl">
                <div className="flex flex-col items-center justify-center">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Về <span className="text-primary-600">Him Energy</span>
                        </h2>
                        <p className="text-xl text-white/80 leading-relaxed">
                            Chúng tôi là những chuyên gia hàng đầu trong lĩnh vực năng lượng tái tạo,
                            cam kết mang đến những giải pháp bền vững và hiệu quả cho tương lai xanh.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 w-full">
                        {aboutData.map((item, index) => (
                            <IconCard
                                key={index}
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                                iconBg={item.iconBg}
                            />
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default AboutSection;
