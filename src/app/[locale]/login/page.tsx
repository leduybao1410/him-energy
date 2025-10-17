'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button, Card, Input } from '@/components/ui';
import { Container, Section } from '@/components/ui';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { authRoute } from '@/constants/client-route/auth-route';
import { ClientRouteMap } from '@/constants/client-route/client-route-map';
import { getCookie, areCookiesEnabled } from '@/lib/cookies';
import CookieDebugger from '@/components/CookieDebugger';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
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

        if (!formData.username) {
            newErrors.username = 'Tên đăng nhập là bắt buộc';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Tên đăng nhập phải có ít nhất 3 ký tự';
        }

        if (!formData.password) {
            newErrors.password = 'Mật khẩu là bắt buộc';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
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

            // For demo purposes, accept any valid email/password
            if (formData.username && formData.password) {
                const response = await fetch(ClientRouteMap.auth.login.url, {
                    method: ClientRouteMap.auth.login.method,
                    body: JSON.stringify({ username: formData.username, password: formData.password }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const data = await response.json();
                if (data.token) {
                    // Store token in localStorage as fallback
                    localStorage.setItem('token', data.token);

                    // Check if cookie was set properly
                    const cookieToken = getCookie('ACCESS_TOKEN');
                    if (cookieToken) {
                        console.log('✅ Cookie set successfully:', cookieToken);
                    } else {
                        console.warn('⚠️ Cookie not found, using localStorage fallback');
                    }

                    // Check if cookies are enabled
                    if (!areCookiesEnabled()) {
                        console.warn('⚠️ Cookies are disabled in browser');
                    }

                    router.push('/admin/products');
                } else {
                    throw new Error('Login failed');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ general: 'Đăng nhập thất bại. Vui lòng thử lại.' });
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
                                    <Lock className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-primary mb-2">
                                    Đăng nhập
                                </h1>
                                <p className="text-muted-foreground">
                                    Đăng nhập vào tài khoản của bạn
                                </p>
                            </div>

                            {errors.general && (
                                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                    <p className="text-red-600 text-sm">{errors.general}</p>
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <Input
                                        type="text"
                                        name="username"
                                        label="Email"
                                        placeholder="Nhập email của bạn"
                                        value={formData.username}
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

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600">
                                            Ghi nhớ đăng nhập
                                        </span>
                                    </label>
                                    <button
                                        type="button"
                                        className="text-sm text-primary-500 hover:text-primary-600"
                                    >
                                        Quên mật khẩu?
                                    </button>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                            Đang đăng nhập...
                                        </div>
                                    ) : (
                                        'Đăng nhập'
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Chưa có tài khoản?{' '}
                                    <button
                                        type="button"
                                        className="text-primary-500 hover:text-primary-600 font-medium"
                                        onClick={() => router.push('/register')}
                                    >
                                        Đăng ký ngay
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
