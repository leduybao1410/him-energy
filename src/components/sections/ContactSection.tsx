'use client';

import { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Section, Container, Input, Textarea, Select, Button, Card } from '@/components/ui';

const ContactSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');
        setErrorMessage('');

        try {
            // Simple validation
            if (!formData.name || !formData.email || !formData.message) {
                const errorMsg = 'Vui lòng nhập họ tên, email và mô tả chi tiết nhu cầu.';
                setErrorMessage(errorMsg);
                setSubmitStatus('error');
                console.log('Validation Error:', errorMsg);
                throw new Error(errorMsg);
            }

            // Prepare data for API - only send required fields to WordPress
            const apiData = {
                name: formData.name,
                email: formData.email,
                message: `Dịch vụ quan tâm: ${formData.service || 'Không chọn'}
Số điện thoại: ${formData.phone || 'Không có'}

Nội dung chi tiết:
${formData.message}`
            };

            console.log('API Data:', apiData);

            // Call the email API
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData)
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMsg = result.error || 'Failed to submit form';
                setErrorMessage(errorMsg);
                setSubmitStatus('error');
                throw new Error(errorMsg);
            }

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                phone: '',
                service: '',
                message: ''
            });
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            if (!errorMessage) {
                setErrorMessage('Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.');
            }
        } finally {
            setIsSubmitting(false);
        }
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

                    <Card className="p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <Input
                                    label="Họ và tên *"
                                    name="name"
                                    type="text"
                                    placeholder="Nhập họ và tên"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                                <Input
                                    label="Số điện thoại"
                                    name="phone"
                                    type="tel"
                                    placeholder="Nhập số điện thoại"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <Input
                                label="Email *"
                                name="email"
                                type="email"
                                placeholder="Nhập email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                            <Select
                                label="Dịch vụ quan tâm"
                                name="service"
                                value={formData.service}
                                onChange={handleInputChange}
                            >
                                <option value="">Chọn dịch vụ</option>
                                <option value="Năng lượng Mặt trời">Năng lượng Mặt trời</option>
                                <option value="Năng lượng Gió">Năng lượng Gió</option>
                                <option value="Tư vấn Năng lượng">Tư vấn Năng lượng</option>
                                <option value="Khác">Khác</option>
                            </Select>
                            <Textarea
                                label="Tin nhắn *"
                                name="message"
                                rows={4}
                                placeholder="Mô tả nhu cầu của bạn..."
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />

                            {/* Status Messages */}
                            {submitStatus === 'success' && (
                                <div className="flex items-center space-x-2 text-green-600 bg-green-50 p-4 rounded-lg">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>Cảm ơn bạn! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.</span>
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-lg">
                                    <AlertCircle className="w-5 h-5" />
                                    <span>{errorMessage || 'Có lỗi xảy ra. Vui lòng thử lại sau.'}</span>
                                </div>
                            )}

                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="flex items-center space-x-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Đang gửi...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-2">
                                        <Send className="w-5 h-5" />
                                        <span>Gửi yêu cầu tư vấn</span>
                                    </div>
                                )}
                            </Button>
                        </form>
                    </Card>
                </div>
            </Container>
        </Section>
    );
};

export default ContactSection;
