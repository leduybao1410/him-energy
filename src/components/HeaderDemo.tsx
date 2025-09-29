'use client';

import { useState } from 'react';
import { Button } from '@/components/ui';

const HeaderDemo = () => {
    const [selectedStyle, setSelectedStyle] = useState<'auto' | 'fixed' | 'gradient'>('auto');

    const headerStyles = {
        auto: {
            name: 'Auto (Mặc định)',
            description: 'Header tự động thay đổi style dựa trên scroll - trong suốt khi ở đầu trang, có background khi scroll',
            className: 'bg-gradient-to-r from-white/20 via-white/10 to-white/20 backdrop-blur-lg border-b border-white/20'
        },
        fixed: {
            name: 'Fixed Background',
            description: 'Header luôn có background trắng cố định với shadow mạnh - đảm bảo hiển thị rõ trên mọi background',
            className: 'bg-white/98 backdrop-blur-xl shadow-2xl border-b border-emerald-200/50'
        },
        gradient: {
            name: 'Gradient Background',
            description: 'Header có gradient background với màu emerald nhẹ - tạo contrast tốt và thẩm mỹ cao',
            className: 'bg-gradient-to-r from-white/95 via-emerald-50/95 to-white/95 backdrop-blur-xl shadow-2xl border-b border-emerald-200/50'
        }
    };

    const handleStyleChange = (style: 'auto' | 'fixed' | 'gradient') => {
        setSelectedStyle(style);
        localStorage.setItem('headerStyle', style);
        // Reload page để áp dụng style mới
        window.location.reload();
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Tùy chọn Header</h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
                {Object.entries(headerStyles).map(([key, style]) => (
                    <div
                        key={key}
                        className={`p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer ${selectedStyle === key
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                        onClick={() => handleStyleChange(key as 'auto' | 'fixed' | 'gradient')}
                    >
                        <div className={`h-16 rounded-lg mb-4 ${style.className}`}></div>
                        <h3 className="font-semibold text-gray-900 mb-2">{style.name}</h3>
                        <p className="text-sm text-gray-600">{style.description}</p>
                    </div>
                ))}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Hướng dẫn sử dụng:</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                    <li>• <strong>Auto:</strong> Phù hợp cho trang có hero section với background đậm</li>
                    <li>• <strong>Fixed:</strong> Tốt nhất cho trang có nhiều section với background trắng</li>
                    <li>• <strong>Gradient:</strong> Cân bằng giữa thẩm mỹ và khả năng hiển thị</li>
                </ul>
            </div>

            <div className="mt-6 flex justify-center">
                <Button
                    variant="outline"
                    onClick={() => {
                        localStorage.removeItem('headerStyle');
                        window.location.reload();
                    }}
                >
                    Reset về mặc định
                </Button>
            </div>
        </div>
    );
};

export default HeaderDemo;
