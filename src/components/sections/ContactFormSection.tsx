'use client';

import { useState } from 'react';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Section, Container, Input, Textarea, Select, Button, Card } from '@/components/ui';

const ContactFormSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        timeline: '',
        message: '',
        newsletter: false
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
        }));
    };

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
Ngân sách: ${formData.budget || 'Không chọn'}
Thời gian triển khai: ${formData.timeline || 'Không chọn'}
Công ty: ${formData.company || 'Không có'}
Số điện thoại: ${formData.phone || 'Không có'}
Đăng ký newsletter: ${formData.newsletter ? 'Có' : 'Không'}

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
                company: '',
                service: '',
                budget: '',
                timeline: '',
                message: '',
                newsletter: false
            });
        } catch (error) {
            console.error('Form submission error:', error);
            setSubmitStatus('error');
            setErrorMessage('Có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const serviceOptions = [
        'Năng lượng Mặt trời',
        'Năng lượng Gió',
        'Tư vấn Năng lượng',
        'Hệ thống Lưu trữ',
        'Hiệu quả Năng lượng',
        'Khác'
    ];

    const budgetOptions = [
        'Dưới 100 triệu VNĐ',
        '100 - 500 triệu VNĐ',
        '500 triệu - 1 tỷ VNĐ',
        '1 - 5 tỷ VNĐ',
        'Trên 5 tỷ VNĐ',
        'Chưa xác định'
    ];

    const timelineOptions = [
        'Ngay lập tức',
        'Trong 1 tháng',
        'Trong 3 tháng',
        'Trong 6 tháng',
        'Trong 1 năm',
        'Chưa xác định'
    ];

    return (
        <Section id="contact-form" background="white">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Gửi yêu cầu <span className="text-primary-600">tư vấn</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Điền thông tin chi tiết để chúng tôi có thể tư vấn giải pháp phù hợp nhất cho bạn.
                        Tất cả thông tin sẽ được bảo mật tuyệt đối.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Form */}
                    <div className="lg:col-span-2">
                        <Card className="p-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Personal Information */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input
                                        label="Họ và tên *"
                                        name="name"
                                        type="text"
                                        placeholder="Nhập họ và tên đầy đủ"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        label="Số điện thoại *"
                                        name="phone"
                                        type="tel"
                                        placeholder="Nhập số điện thoại"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <Input
                                        label="Email *"
                                        name="email"
                                        type="email"
                                        placeholder="Nhập địa chỉ email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                    <Input
                                        label="Công ty/Tổ chức"
                                        name="company"
                                        type="text"
                                        placeholder="Tên công ty (nếu có)"
                                        value={formData.company}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {/* Service Information */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Select
                                        label="Dịch vụ quan tâm *"
                                        name="service"
                                        value={formData.service}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Chọn dịch vụ</option>
                                        {serviceOptions.map((service, index) => (
                                            <option key={index} value={service}>{service}</option>
                                        ))}
                                    </Select>
                                    <Select
                                        label="Ngân sách dự kiến"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Chọn ngân sách</option>
                                        {budgetOptions.map((budget, index) => (
                                            <option key={index} value={budget}>{budget}</option>
                                        ))}
                                    </Select>
                                </div>

                                <Select
                                    label="Thời gian triển khai mong muốn"
                                    name="timeline"
                                    value={formData.timeline}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Chọn thời gian</option>
                                    {timelineOptions.map((timeline, index) => (
                                        <option key={index} value={timeline}>{timeline}</option>
                                    ))}
                                </Select>

                                <Textarea
                                    label="Mô tả chi tiết nhu cầu *"
                                    name="message"
                                    rows={6}
                                    placeholder="Hãy mô tả chi tiết về dự án, nhu cầu sử dụng năng lượng, diện tích, vị trí lắp đặt..."
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                />

                                {/* Newsletter Subscription */}
                                <div className="flex items-center space-x-3">
                                    <input
                                        type="checkbox"
                                        id="newsletter"
                                        name="newsletter"
                                        checked={formData.newsletter}
                                        onChange={handleInputChange}
                                        className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500"
                                    />
                                    <label htmlFor="newsletter" className="text-sm text-gray-600">
                                        Tôi muốn nhận thông tin về các sản phẩm và dịch vụ mới từ HIM Energy
                                    </label>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-4">
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
                                </div>

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
                            </form>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Quick Contact */}
                        <Card className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Liên hệ nhanh
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Email</p>
                                        <p className="text-sm text-gray-600">info@himenergy.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Điện thoại</p>
                                        <p className="text-sm text-gray-600">+84 123 456 789</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Process Steps */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Quy trình tư vấn
                            </h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        1
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Gửi yêu cầu</p>
                                        <p className="text-sm text-gray-600">Điền form hoặc gọi điện</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        2
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Tư vấn sơ bộ</p>
                                        <p className="text-sm text-gray-600">Phân tích nhu cầu</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        3
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Khảo sát thực tế</p>
                                        <p className="text-sm text-gray-600">Đánh giá hiện trạng</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                        4
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Báo giá chi tiết</p>
                                        <p className="text-sm text-gray-600">Đề xuất giải pháp</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* FAQ */}
                        <Card className="p-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Câu hỏi thường gặp
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">
                                        Thời gian phản hồi là bao lâu?
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Chúng tôi sẽ phản hồi trong vòng 2 giờ làm việc.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">
                                        Có mất phí tư vấn không?
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Tư vấn ban đầu hoàn toàn miễn phí.
                                    </p>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900 text-sm">
                                        Có hỗ trợ khảo sát không?
                                    </p>
                                    <p className="text-sm text-gray-600 mt-1">
                                        Có, chúng tôi sẽ khảo sát miễn phí tại địa điểm.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default ContactFormSection;
