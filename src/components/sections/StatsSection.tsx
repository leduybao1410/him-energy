import { Section, Container } from '@/components/ui';

const StatsSection = () => {
    const statsData = [
        {
            value: '50,000+',
            label: 'Tấn CO₂ đã tiết kiệm'
        },
        {
            value: '100+',
            label: 'Dự án hoàn thành'
        },
        {
            value: '500+',
            label: 'Khách hàng hài lòng'
        },
        {
            value: '15+',
            label: 'Năm kinh nghiệm'
        }
    ];

    return (
        <Section background="gradient">
            <Container maxWidth="4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Tác động <span className="text-primary-200">Đo lường được</span>
                    </h2>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Những con số ấn tượng thể hiện cam kết của chúng tôi trong việc
                        xây dựng tương lai bền vững.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {statsData.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                                {stat.value}
                            </div>
                            <div className="text-primary-100">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default StatsSection;
