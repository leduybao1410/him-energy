import { Star } from 'lucide-react';
import { Section, Container, Card } from '@/components/ui';

const TestimonialsSection = () => {
    const testimonialsData = [
        {
            name: 'Nguyễn Văn An',
            position: 'Giám đốc Công ty ABC',
            content: 'Him Energy đã giúp chúng tôi tiết kiệm 40% chi phí điện hàng tháng. Dịch vụ chuyên nghiệp và hỗ trợ tận tình.',
            initial: 'N',
            gradient: 'from-primary-500 to-secondary-500'
        },
        {
            name: 'Trần Thị Bình',
            position: 'Chủ hộ gia đình',
            content: 'Hệ thống năng lượng mặt trời hoạt động ổn định, hiệu suất cao. Đội ngũ kỹ thuật rất chuyên nghiệp và nhiệt tình.',
            initial: 'T',
            gradient: 'from-secondary-500 to-cyan-600'
        },
        {
            name: 'Lê Minh Cường',
            position: 'CEO Công ty XYZ',
            content: 'Dự án chuyển đổi năng lượng của Him Energy đã giúp chúng tôi đạt được mục tiêu bền vững và tiết kiệm chi phí đáng kể.',
            initial: 'L',
            gradient: 'from-secondary-500 to-primary-600'
        }
    ];

    const renderStars = () => {
        return [...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
        ));
    };

    return (
        <Section background="gray">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Khách hàng <span className="text-primary-600">Nói gì</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Phản hồi từ những khách hàng đã tin tưởng và lựa chọn Him Energy
                        cho giải pháp năng lượng của họ.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <Card key={index} hover>
                            <div className="flex items-center mb-4">
                                {renderStars()}
                            </div>
                            <p className="text-gray-600 mb-4 italic">
                                {'"'}{testimonial.content}{'"'}
                            </p>
                            <div className="flex items-center">
                                <div className={`w-12 h-12 bg-gradient-to-r ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold mr-4`}>
                                    {testimonial.initial}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                    <div className="text-sm text-gray-500">{testimonial.position}</div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default TestimonialsSection;
