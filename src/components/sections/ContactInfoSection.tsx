"use client";

import { Phone, Mail, MapPin, Clock, MessageCircle, Globe } from 'lucide-react';
import { Section, Container, Card } from '@/components/ui';

const ContactInfoSection = () => {
    const contactInfo = [
        {
            icon: <Phone className="w-8 h-8 text-white" />,
            title: 'Điện thoại',
            details: ['+84 123 456 789', '+84 987 654 321'],
            description: 'Gọi ngay để được tư vấn miễn phí',
            gradient: 'from-primary-500 to-secondary-500',
            action: 'tel:+84123456789'
        },
        {
            icon: <Mail className="w-8 h-8 text-white" />,
            title: 'Email',
            details: ['info@himenergy.com', 'support@himenergy.com'],
            description: 'Gửi email cho chúng tôi bất cứ lúc nào',
            gradient: 'from-secondary-500 to-cyan-600',
            action: 'mailto:info@himenergy.com'
        },
        {
            icon: <MapPin className="w-8 h-8 text-white" />,
            title: 'Địa chỉ',
            details: ['123 Đường Năng Lượng Xanh', 'Quận 1, TP. Hồ Chí Minh', 'Việt Nam'],
            description: 'Đến thăm văn phòng của chúng tôi',
            gradient: 'from-cyan-500 to-primary-600',
            action: 'https://maps.google.com'
        },
        {
            icon: <Clock className="w-8 h-8 text-white" />,
            title: 'Giờ làm việc',
            details: ['Thứ 2 - Thứ 6: 8:00 - 17:30', 'Thứ 7: 8:00 - 12:00', 'Chủ nhật: Nghỉ'],
            description: 'Thời gian phục vụ khách hàng',
            gradient: 'from-primary-600 to-secondary-600',
            action: null
        },
        {
            icon: <MessageCircle className="w-8 h-8 text-white" />,
            title: 'Chat trực tuyến',
            details: ['Hỗ trợ 24/7', 'Phản hồi nhanh chóng'],
            description: 'Trò chuyện với chuyên gia ngay',
            gradient: 'from-secondary-600 to-cyan-500',
            action: '#chat'
        },
        {
            icon: <Globe className="w-8 h-8 text-white" />,
            title: 'Website',
            details: ['www.himenergy.com', 'Cập nhật tin tức mới nhất'],
            description: 'Khám phá thêm về chúng tôi',
            gradient: 'from-cyan-600 to-primary-500',
            action: 'https://www.himenergy.com'
        }
    ];

    return (
        <Section id="contact-info" background="gray">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Thông tin <span className="text-primary-600">liên hệ</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn.
                        Hãy chọn cách liên hệ phù hợp nhất với bạn.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {contactInfo.map((info, index) => (
                        <Card
                            key={index}
                            className={`p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${info.action ? 'cursor-pointer' : ''
                                }`}
                            onClick={() => info.action && window.open(info.action, '_blank')}
                        >
                            <div className={`w-16 h-16 bg-gradient-to-r ${info.gradient} rounded-full flex items-center justify-center mx-auto mb-6`}>
                                {info.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">{info.title}</h3>
                            <p className="text-gray-600 mb-6">{info.description}</p>
                            <div className="space-y-2">
                                {info.details.map((detail, detailIndex) => (
                                    <p key={detailIndex} className="text-gray-700 font-medium">
                                        {detail}
                                    </p>
                                ))}
                            </div>
                            {info.action && (
                                <div className="mt-6">
                                    <span className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                                        Nhấn để liên hệ
                                    </span>
                                </div>
                            )}
                        </Card>
                    ))}
                </div>

                {/* Additional Info */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Tại sao chọn chúng tôi?
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span>Tư vấn miễn phí 24/7</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span>Đội ngũ chuyên gia giàu kinh nghiệm</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span>Giải pháp tùy chỉnh theo nhu cầu</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span>Hỗ trợ sau bán hàng tận tình</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Cam kết của chúng tôi
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                    <span>Phản hồi trong vòng 2 giờ</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                    <span>Báo giá chi tiết và minh bạch</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                    <span>Bảo hành sản phẩm dài hạn</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                    <span>Hỗ trợ kỹ thuật chuyên nghiệp</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default ContactInfoSection;
