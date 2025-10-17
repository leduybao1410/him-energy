'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button, Card, Input } from '@/components/ui';
import { Container, Section } from '@/components/ui';
import { Eye, EyeOff, Lock, Mail, User, UserCheck } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Họ tên là bắt buộc';
        }

        if (!formData.email) {
            newErrors.email = 'Email là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email không hợp lệ';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Xác nhận mật khẩu là bắt buộc';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // For demo purposes, accept any valid registration
            if (formData.email && formData.password && formData.name) {
                // Store registration data (in real app, send to API)
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', formData.email);
                localStorage.setItem('userName', formData.name);

                // Redirect to products page
                router.push('/products');
            }
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ general: 'Đăng ký thất bại. Vui lòng thử lại.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-secondary w-full">
            <Section className="py-20">
                <Container>
                    <div className="max-w-md mx-auto">
                        <Card className="p-8">
                            <div className="text-center mb-8">
                                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <UserCheck className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-primary mb-2">
                                    Đăng ký tài khoản
                                </h1>
                                <p className="text-muted-foreground">
                                    Tạo tài khoản mới để sử dụng dịch vụ
                                </p>
                            </div>

                            {errors.general && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{errors.general}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="relative">
                                    <Input
                                        type="text"
                                        name="name"
                                        label="Họ và tên"
                                        placeholder="Nhập họ tên của bạn"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        error={errors.name}
                                        className="pl-10"
                                    />
                                    <User className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                                </div>

                                <div className="relative">
                                    <Input
                                        type="email"
                                        name="email"
                                        label="Email"
                                        placeholder="Nhập email của bạn"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        error={errors.email}
                                        className="pl-10"
                                    />
                                    <Mail className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                                </div>

                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        label="Mật khẩu"
                                        placeholder="Nhập mật khẩu"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        error={errors.password}
                                        className="pl-10 pr-10"
                                    />
                                    <Lock className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                <div className="relative">
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        label="Xác nhận mật khẩu"
                                        placeholder="Nhập lại mật khẩu"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        error={errors.confirmPassword}
                                        className="pl-10 pr-10"
                                    />
                                    <Lock className="absolute left-3 top-9 w-5 h-5 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                                        required
                                    />
                                    <span className="ml-2 text-sm text-gray-600">
                                        Tôi đồng ý với{' '}
                                        <button
                                            type="button"
                                            className="text-primary-500 hover:text-primary-600"
                                        >
                                            Điều khoản sử dụng
                                        </button>
                                        {' '}và{' '}
                                        <button
                                            type="button"
                                            className="text-primary-500 hover:text-primary-600"
                                        >
                                            Chính sách bảo mật
                                        </button>
                                    </span>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Đang tạo tài khoản...
                                        </div>
                                    ) : (
                                        'Đăng ký'
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Đã có tài khoản?{' '}
                                    <button
                                        type="button"
                                        className="text-primary-500 hover:text-primary-600 font-medium"
                                        onClick={() => router.push('/login')}
                                    >
                                        Đăng nhập ngay
                                    </button>
                                </p>
                            </div>
                        </Card>
                    </div>
                </Container>
            </Section>

        </div>
    );
}
