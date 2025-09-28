import { Target, Lightbulb, Heart } from 'lucide-react';
import { Section, Container, IconCard } from '@/components/ui';

const MissionSection = () => {
    const missionData = [
        {
            icon: <Target className="w-8 h-8" />,
            title: 'Sứ mệnh của chúng tôi',
            description: 'Mang đến những giải pháp năng lượng tái tạo tiên tiến, góp phần xây dựng một tương lai bền vững cho thế hệ mai sau.',
            iconBg: 'primary' as const
        },
        {
            icon: <Lightbulb className="w-8 h-8" />,
            title: 'Tầm nhìn',
            description: 'Trở thành công ty hàng đầu trong lĩnh vực năng lượng tái tạo tại Việt Nam, dẫn đầu xu hướng chuyển đổi năng lượng xanh.',
            iconBg: 'secondary' as const
        },
        {
            icon: <Heart className="w-8 h-8" />,
            title: 'Giá trị cốt lõi',
            description: 'Đặt sự bền vững, đổi mới và trách nhiệm xã hội làm nền tảng cho mọi hoạt động và quyết định của công ty.',
            iconBg: 'cyan' as const
        }
    ];

    return (
        <Section id="mission" background="white">
            <Container maxWidth="6xl">
                <div className="flex flex-col items-center justify-center">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Sứ mệnh & <span className="text-primary-600">Tầm nhìn</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Chúng tôi cam kết mang đến những giá trị bền vững thông qua việc phát triển
                            các giải pháp năng lượng tái tạo thông minh và hiệu quả.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 w-full">
                        {missionData.map((item, index) => (
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

export default MissionSection;
