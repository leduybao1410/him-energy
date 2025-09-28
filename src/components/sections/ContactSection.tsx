import { Phone, Mail, MapPin } from 'lucide-react';
import { Section, Container, Input, Textarea, Select, Button } from '@/components/ui';

const ContactSection = () => {
    const contactInfo = [
        {
            icon: <Phone className="w-6 h-6 text-white" />,
            title: 'Điện thoại',
            details: ['+84 123 456 789', '+84 987 654 321'],
            gradient: 'from-primary-500 to-secondary-500'
        },
        {
            icon: <Mail className="w-6 h-6 text-white" />,
            title: 'Email',
            details: ['info@himenergy.com', 'support@himenergy.com'],
            gradient: 'from-secondary-500 to-cyan-600'
        },
        {
            icon: <MapPin className="w-6 h-6 text-white" />,
            title: 'Địa chỉ',
            details: ['123 Đường Năng Lượng Xanh', 'Quận 1, TP. Hồ Chí Minh'],
            gradient: 'from-secondary-500 to-primary-600'
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic xử lý form submit
        console.log('Form submitted');
    };

    return (
        <Section id="contact" background="white">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Bắt đầu <span className="text-primary-600">Hành trình</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Sẵn sàng chuyển đổi sang năng lượng tái tạo? Hãy liên hệ với chúng tôi
                        để được tư vấn miễn phí và thiết kế giải pháp phù hợp nhất.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className={`w-12 h-12 bg-gradient-to-r ${info.gradient} rounded-full flex items-center justify-center flex-shrink-0`}>
                                    {info.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                                    {info.details.map((detail, detailIndex) => (
                                        <p key={detailIndex} className="text-gray-600">{detail}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gray-50 p-8 rounded-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="Họ và tên"
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    required
                                />
                                <Input
                                    label="Số điện thoại"
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    required
                                />
                            </div>
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Nhập email"
                                required
                            />
                            <Select label="Dịch vụ quan tâm">
                                <option>Năng lượng Mặt trời</option>
                                <option>Năng lượng Gió</option>
                                <option>Tư vấn Năng lượng</option>
                                <option>Khác</option>
                            </Select>
                            <Textarea
                                label="Tin nhắn"
                                rows={4}
                                placeholder="Mô tả nhu cầu của bạn..."
                            />
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                            >
                                Gửi yêu cầu tư vấn
                            </Button>
                        </form>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default ContactSection;
