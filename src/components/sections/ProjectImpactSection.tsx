import { TrendingUp, Leaf, Users, Globe, Zap, Award } from 'lucide-react';
import { Section, Container } from '@/components/ui';

const ProjectImpactSection = () => {
    const impactMetrics = [
        {
            icon: <Leaf className="w-8 h-8" />,
            value: '80,000+',
            label: 'Tấn CO₂ đã tiết kiệm',
            description: 'Góp phần giảm thiểu biến đổi khí hậu',
            color: 'text-green-400'
        },
        {
            icon: <Users className="w-8 h-8" />,
            value: '80,000+',
            label: 'Hộ gia đình được cung cấp điện',
            description: 'Mang năng lượng sạch đến mọi nhà',
            color: 'text-blue-400'
        },
        {
            icon: <Zap className="w-8 h-8" />,
            value: '155 MW',
            label: 'Tổng công suất lắp đặt',
            description: 'Đủ cung cấp cho một thành phố nhỏ',
            color: 'text-yellow-400'
        },
        {
            icon: <Globe className="w-8 h-8" />,
            value: '7.5 tỷ',
            label: 'VNĐ đầu tư',
            description: 'Thúc đẩy phát triển kinh tế xanh',
            color: 'text-purple-400'
        }
    ];

    const achievements = [
        {
            icon: <Award className="w-12 h-12 text-primary-400" />,
            title: 'Giải thưởng Dự án Xanh 2023',
            description: 'Được vinh danh là dự án năng lượng tái tạo xuất sắc nhất năm',
            year: '2023'
        },
        {
            icon: <TrendingUp className="w-12 h-12 text-primary-400" />,
            title: 'Chứng nhận ISO 14001',
            description: 'Đạt tiêu chuẩn quốc tế về quản lý môi trường',
            year: '2022'
        },
        {
            icon: <Globe className="w-12 h-12 text-primary-400" />,
            title: 'Thành viên RE100',
            description: 'Cam kết sử dụng 100% năng lượng tái tạo',
            year: '2024'
        }
    ];

    return (
        <Section background="white">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Tác động <span className="text-primary-600">Đo lường được</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Những con số ấn tượng thể hiện cam kết của chúng tôi trong việc
                        xây dựng tương lai bền vững và tạo ra giá trị thực tế cho cộng đồng.
                    </p>
                </div>

                {/* Impact Metrics */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {impactMetrics.map((metric, index) => (
                        <div
                            key={index}
                            className="text-center p-6 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                        >
                            <div className={`${metric.color} mb-4 flex justify-center`}>
                                {metric.icon}
                            </div>
                            <div className="text-3xl font-bold text-gray-900 mb-2">
                                {metric.value}
                            </div>
                            <div className="text-lg font-semibold text-gray-700 mb-2">
                                {metric.label}
                            </div>
                            <div className="text-sm text-gray-600">
                                {metric.description}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Achievements */}
                <div className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl p-12 text-white">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-bold mb-4">
                            Thành tựu & Chứng nhận
                        </h3>
                        <p className="text-xl text-primary-100 max-w-2xl mx-auto">
                            Những giải thưởng và chứng nhận quốc tế khẳng định chất lượng
                            và uy tín của các dự án Him Energy.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {achievements.map((achievement, index) => (
                            <div
                                key={index}
                                className="text-center p-6 bg-white/10 rounded-2xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
                            >
                                <div className="mb-4 flex justify-center">
                                    {achievement.icon}
                                </div>
                                <div className="text-sm text-primary-200 mb-2">
                                    {achievement.year}
                                </div>
                                <h4 className="text-xl font-bold mb-3">
                                    {achievement.title}
                                </h4>
                                <p className="text-primary-100">
                                    {achievement.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Environmental Impact Visualization */}
                <div className="mt-20 text-center">
                    <h3 className="text-3xl font-bold text-gray-900 mb-8">
                        Tác động Môi trường
                    </h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="p-6 bg-green-50 rounded-2xl border-2 border-green-200">
                            <div className="text-4xl font-bold text-green-600 mb-2">80,000+</div>
                            <div className="text-green-700 font-semibold mb-2">Cây xanh tương đương</div>
                            <div className="text-green-600 text-sm">
                                Lượng CO₂ tiết kiệm tương đương với việc trồng 80,000 cây xanh
                            </div>
                        </div>
                        <div className="p-6 bg-blue-50 rounded-2xl border-2 border-blue-200">
                            <div className="text-4xl font-bold text-blue-600 mb-2">1,200+</div>
                            <div className="text-blue-700 font-semibold mb-2">Xe ô tô loại bỏ</div>
                            <div className="text-blue-600 text-sm">
                                Tương đương với việc loại bỏ 1,200 xe ô tô khỏi đường phố
                            </div>
                        </div>
                        <div className="p-6 bg-purple-50 rounded-2xl border-2 border-purple-200">
                            <div className="text-4xl font-bold text-purple-600 mb-2">15,000+</div>
                            <div className="text-purple-700 font-semibold mb-2">Thùng dầu tiết kiệm</div>
                            <div className="text-purple-600 text-sm">
                                Tương đương với việc tiết kiệm 15,000 thùng dầu mỗi năm
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default ProjectImpactSection;
