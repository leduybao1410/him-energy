'use client';

import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Car, Bus, Train } from 'lucide-react';
import { Section, Container, Card } from '@/components/ui';

const ContactMapSection = () => {
    const [mapLoaded, setMapLoaded] = useState(false);

    useEffect(() => {
        // Simulate map loading
        const timer = setTimeout(() => {
            setMapLoaded(true);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const officeInfo = {
        address: '123 Đường Năng Lượng Xanh, Quận 1, TP. Hồ Chí Minh',
        coordinates: '10.7769, 106.7009', // Ho Chi Minh City coordinates
        phone: '+84 123 456 789',
        email: 'info@himenergy.com',
        hours: {
            weekdays: '8:00 - 17:30',
            saturday: '8:00 - 12:00',
            sunday: 'Nghỉ'
        }
    };

    const directions = [
        {
            icon: <Car className="w-6 h-6 text-primary-600" />,
            title: 'Bằng xe hơi',
            description: 'Từ trung tâm TP.HCM: 15-20 phút',
            details: 'Đi theo đường Nguyễn Huệ, rẽ phải vào đường Năng Lượng Xanh'
        },
        {
            icon: <Bus className="w-6 h-6 text-secondary-600" />,
            title: 'Bằng xe buýt',
            description: 'Tuyến 01, 03, 19',
            details: 'Dừng tại trạm "Năng Lượng Xanh", đi bộ 2 phút'
        },
        {
            icon: <Train className="w-6 h-6 text-cyan-600" />,
            title: 'Bằng metro',
            description: 'Tuyến 1 (Bến Thành - Suối Tiên)',
            details: 'Ga Bến Thành, đi bộ 10 phút về phía đông'
        }
    ];

    return (
        <Section id="contact-map" background="gray">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Tìm đường đến <span className="text-primary-600">văn phòng</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Văn phòng chính của chúng tôi tọa lạc tại trung tâm TP. Hồ Chí Minh,
                        dễ dàng tiếp cận bằng nhiều phương tiện khác nhau.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Map */}
                    <div className="lg:col-span-2">
                        <Card className="p-0 overflow-hidden">
                            <div className="relative h-96 bg-gray-200">
                                {!mapLoaded ? (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="text-center">
                                            <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                            <p className="text-gray-600">Đang tải bản đồ...</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative h-full">
                                        {/* Embedded Google Map */}
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.325120123456!2d106.6987!3d10.7769!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDQ2JzM2LjgiTiAxMDbCsDQxJzU1LjIiRQ!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            title="HIM Energy Office Location"
                                        />

                                        {/* Map Overlay Info */}
                                        <div className="absolute top-4 left-4 bg-white rounded-lg p-4 shadow-lg max-w-xs">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <MapPin className="w-5 h-5 text-primary-600" />
                                                <h3 className="font-bold text-gray-900">HIM Energy</h3>
                                            </div>
                                            <p className="text-sm text-gray-600">{officeInfo.address}</p>
                                            <div className="mt-2 flex space-x-2">
                                                <a
                                                    href={`tel:${officeInfo.phone}`}
                                                    className="text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded"
                                                >
                                                    Gọi ngay
                                                </a>
                                                <a
                                                    href={`https://maps.google.com/?q=${officeInfo.coordinates}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-xs bg-secondary-100 text-secondary-700 px-2 py-1 rounded"
                                                >
                                                    Chỉ đường
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>

                    {/* Office Info & Directions */}
                    <div className="space-y-6">
                        {/* Office Information */}
                        <Card className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Thông tin văn phòng</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="font-medium text-gray-900">Địa chỉ</p>
                                    <p className="text-sm text-gray-600">{officeInfo.address}</p>
                                </div>

                                <div>
                                    <p className="font-medium text-gray-900">Điện thoại</p>
                                    <a href={`tel:${officeInfo.phone}`} className="text-sm text-primary-600 hover:underline">
                                        {officeInfo.phone}
                                    </a>
                                </div>

                                <div>
                                    <p className="font-medium text-gray-900">Email</p>
                                    <a href={`mailto:${officeInfo.email}`} className="text-sm text-primary-600 hover:underline">
                                        {officeInfo.email}
                                    </a>
                                </div>

                                <div>
                                    <p className="font-medium text-gray-900 mb-2">Giờ làm việc</p>
                                    <div className="text-sm text-gray-600 space-y-1">
                                        <p>Thứ 2 - Thứ 6: {officeInfo.hours.weekdays}</p>
                                        <p>Thứ 7: {officeInfo.hours.saturday}</p>
                                        <p>Chủ nhật: {officeInfo.hours.sunday}</p>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Directions */}
                        <Card className="p-6">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-secondary-500 rounded-full flex items-center justify-center">
                                    <Navigation className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">Hướng dẫn đường đi</h3>
                            </div>

                            <div className="space-y-4">
                                {directions.map((direction, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-1">
                                            {direction.icon}
                                        </div>
                                        <div>
                                            <p className="font-medium text-gray-900">{direction.title}</p>
                                            <p className="text-sm text-gray-600">{direction.description}</p>
                                            <p className="text-xs text-gray-500 mt-1">{direction.details}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="p-6 bg-gradient-to-br from-primary-50 to-secondary-50">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Hành động nhanh</h3>
                            <div className="space-y-3">
                                <a
                                    href={`https://maps.google.com/?q=${officeInfo.coordinates}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 w-full p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <Navigation className="w-5 h-5 text-primary-600" />
                                    <span className="text-gray-900">Mở Google Maps</span>
                                </a>
                                <a
                                    href={`tel:${officeInfo.phone}`}
                                    className="flex items-center space-x-2 w-full p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <svg className="w-5 h-5 text-secondary-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                    </svg>
                                    <span className="text-gray-900">Gọi điện ngay</span>
                                </a>
                                <a
                                    href={`mailto:${officeInfo.email}`}
                                    className="flex items-center space-x-2 w-full p-3 bg-white rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <svg className="w-5 h-5 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                    </svg>
                                    <span className="text-gray-900">Gửi email</span>
                                </a>
                            </div>
                        </Card>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Tiện ích xung quanh
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span>Bãi đỗ xe miễn phí</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span>Trung tâm thương mại gần đó</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span>Nhà hàng, quán cà phê</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                                    <span>Ngân hàng, ATM</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                Lưu ý khi đến thăm
                            </h3>
                            <ul className="space-y-3 text-gray-600">
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                    <span>Vui lòng đặt lịch hẹn trước</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                    <span>Mang theo giấy tờ tùy thân</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                    <span>Tuân thủ quy định an toàn</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <div className="w-2 h-2 bg-secondary-500 rounded-full"></div>
                                    <span>Liên hệ trước khi đến</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default ContactMapSection;
