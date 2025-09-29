'use client';

import { CheckCircle, Eye, Palette, Zap, Shield } from 'lucide-react';
import { Card } from '@/components/ui';

const HeaderImprovements = () => {
    const improvements = [
        {
            icon: Eye,
            title: 'Enhanced Visibility',
            description: 'Header luôn hiển thị rõ ràng trên mọi background với shadow và border mạnh hơn',
            features: [
                'Shadow 2xl cho độ sâu tốt hơn',
                'Border với opacity phù hợp',
                'Backdrop blur mạnh hơn (xl)',
                'Background opacity tăng lên 98%'
            ]
        },
        {
            icon: Palette,
            title: 'Multiple Style Options',
            description: '3 tùy chọn style header khác nhau để phù hợp với từng loại trang',
            features: [
                'Auto: Tự động thay đổi theo scroll',
                'Fixed: Background cố định trắng',
                'Gradient: Background gradient emerald'
            ]
        },
        {
            icon: Zap,
            title: 'Smooth Animations',
            description: 'Animation mượt mà với duration 500ms cho tất cả transitions',
            features: [
                'Transition duration tăng lên 500ms',
                'Smooth color changes',
                'Hover effects được cải thiện',
                'Drop shadow animations'
            ]
        },
        {
            icon: Shield,
            title: 'Persistent Preferences',
            description: 'Lưu tùy chọn header vào localStorage để duy trì qua các session',
            features: [
                'Auto-save user preferences',
                'Load preferences on page load',
                'Development mode controls',
                'Easy reset option'
            ]
        }
    ];

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Cải tiến Header
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Header đã được cải tiến với nhiều tùy chọn để đảm bảo hiển thị rõ ràng trên mọi background
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {improvements.map((improvement, index) => (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                                    <improvement.icon className="w-6 h-6 text-primary-600" />
                                </div>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {improvement.title}
                                </h3>
                                <p className="text-gray-600 mb-4">
                                    {improvement.description}
                                </p>
                                <ul className="space-y-2">
                                    {improvement.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className="flex items-center space-x-2">
                                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                            <span className="text-sm text-gray-600">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="mt-12 bg-gradient-to-r from-primary-50 to-secondary-50 p-8 rounded-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                    Cách sử dụng
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Chọn Style</h4>
                        <p className="text-sm text-gray-600">
                            Chọn một trong 3 tùy chọn header phù hợp với trang của bạn
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">2</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Test Visibility</h4>
                        <p className="text-sm text-gray-600">
                            Kiểm tra header hiển thị rõ ràng trên các section khác nhau
                        </p>
                    </div>
                    <div className="text-center">
                        <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-white font-bold text-xl">3</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Lưu Preference</h4>
                        <p className="text-sm text-gray-600">
                            Tùy chọn sẽ được lưu tự động và áp dụng cho các lần truy cập sau
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderImprovements;
