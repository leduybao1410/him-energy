'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button, Card } from '@/components/ui';
import { Container, Section } from '@/components/ui';
import { Package, Users, TrendingUp, Settings, Plus, Edit, Eye } from 'lucide-react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);

    useEffect(() => {
        // Check if user is logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userName = localStorage.getItem('userName');
        const userEmail = localStorage.getItem('userEmail');

        if (!isLoggedIn || !userName || !userEmail) {
            router.push('/login');
            return;
        }

        setUser({ name: userName, email: userEmail });
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
        router.push('/');
    };

    if (!user) {
        return (
            <div className="min-h-screen bg-secondary w-full">
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
            </div>
        );
    }

    const stats = [
        {
            title: 'Tổng sản phẩm',
            value: '24',
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Khách hàng',
            value: '156',
            icon: Users,
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'Doanh thu tháng',
            value: '2.4M VND',
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-100'
        },
        {
            title: 'Đơn hàng',
            value: '89',
            icon: Package,
            color: 'text-orange-600',
            bgColor: 'bg-orange-100'
        }
    ];

    const quickActions = [
        {
            title: 'Thêm sản phẩm mới',
            description: 'Tạo sản phẩm mới cho cửa hàng',
            icon: Plus,
            action: () => router.push('/admin/products'),
            color: 'text-primary-600',
            bgColor: 'bg-primary-100'
        },
        {
            title: 'Quản lý sản phẩm',
            description: 'Xem và chỉnh sửa sản phẩm',
            icon: Edit,
            action: () => router.push('/admin/products'),
            color: 'text-blue-600',
            bgColor: 'bg-blue-100'
        },
        {
            title: 'Xem cửa hàng',
            description: 'Xem trang sản phẩm công khai',
            icon: Eye,
            action: () => router.push('/products'),
            color: 'text-green-600',
            bgColor: 'bg-green-100'
        },
        {
            title: 'Cài đặt',
            description: 'Cấu hình hệ thống',
            icon: Settings,
            action: () => console.log('Settings clicked'),
            color: 'text-gray-600',
            bgColor: 'bg-gray-100'
        }
    ];

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-secondary w-full">

                <Section className="py-16">
                    <Container>
                        <div className="mb-8">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h1 className="text-3xl font-bold text-primary mb-2">
                                        Chào mừng, {user.name}!
                                    </h1>
                                    <p className="text-muted-foreground">
                                        Quản lý cửa hàng năng lượng của bạn
                                    </p>
                                </div>
                                <Button
                                    variant="outline"
                                    onClick={handleLogout}
                                >
                                    Đăng xuất
                                </Button>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {stats.map((stat, index) => (
                                <Card key={index} className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-muted-foreground mb-1">
                                                {stat.title}
                                            </p>
                                            <p className="text-2xl font-bold text-primary">
                                                {stat.value}
                                            </p>
                                        </div>
                                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>

                        {/* Quick Actions */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-primary mb-6">
                                Thao tác nhanh
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {quickActions.map((action, index) => (
                                    <Card
                                        key={index}
                                        className="p-6 cursor-pointer hover:shadow-lg transition-shadow"
                                        onClick={action.action}
                                    >
                                        <div className={`w-12 h-12 ${action.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                                            <action.icon className={`w-6 h-6 ${action.color}`} />
                                        </div>
                                        <h3 className="font-semibold text-primary mb-2">
                                            {action.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {action.description}
                                        </p>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold text-primary mb-6">
                                Hoạt động gần đây
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                                        <Package className="w-5 h-5 text-primary-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-primary">
                                            Sản phẩm mới được thêm
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Tấm Pin Mặt Trời Mono 300W
                                        </p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        2 giờ trước
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-primary">
                                            Khách hàng mới đăng ký
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Nguyễn Văn A
                                        </p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        4 giờ trước
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                        <TrendingUp className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-primary">
                                            Đơn hàng mới
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            #ORD-001 - 2,500,000 VND
                                        </p>
                                    </div>
                                    <span className="text-sm text-muted-foreground">
                                        6 giờ trước
                                    </span>
                                </div>
                            </div>
                        </Card>
                    </Container>
                </Section>

            </div>
        </ProtectedRoute>
    );
}
