import { Calendar, MapPin, Users, Zap } from 'lucide-react';
import { Section, Container } from '@/components/ui';

const ProjectShowcaseSection = () => {
    const projectsData = [
        {
            id: 1,
            title: 'Nhà máy điện mặt trời Bình Thuận',
            location: 'Bình Thuận, Việt Nam',
            date: '2023',
            capacity: '50 MW',
            image: '/solar.svg',
            description: 'Dự án điện mặt trời quy mô lớn đầu tiên tại miền Nam, cung cấp năng lượng sạch cho 25,000 hộ gia đình.',
            impact: {
                co2Reduction: '25,000 tấn/năm',
                households: '25,000 hộ',
                investment: '2.5 tỷ VNĐ'
            },
            features: [
                'Công nghệ pin mặt trời hiệu suất cao',
                'Hệ thống theo dõi thông minh',
                'Bảo trì tự động 24/7'
            ]
        },
        {
            id: 2,
            title: 'Turbine gió Ninh Thuận',
            location: 'Ninh Thuận, Việt Nam',
            date: '2022',
            capacity: '30 MW',
            image: '/wind.svg',
            description: 'Hệ thống turbine gió ven biển với công nghệ tiên tiến, tận dụng tối đa nguồn gió biển.',
            impact: {
                co2Reduction: '15,000 tấn/năm',
                households: '15,000 hộ',
                investment: '1.8 tỷ VNĐ'
            },
            features: [
                'Thiết kế chống bão cấp 12',
                'Vận hành tự động từ xa',
                'Hiệu suất cao, tiếng ồn thấp'
            ]
        },
        {
            id: 3,
            title: 'Hệ thống năng lượng hỗn hợp Đà Nẵng',
            location: 'Đà Nẵng, Việt Nam',
            date: '2024',
            capacity: '75 MW',
            image: '/hydro.svg',
            description: 'Dự án tích hợp năng lượng mặt trời, gió và thủy điện, tạo ra hệ thống năng lượng bền vững.',
            impact: {
                co2Reduction: '40,000 tấn/năm',
                households: '40,000 hộ',
                investment: '3.2 tỷ VNĐ'
            },
            features: [
                'Tích hợp đa nguồn năng lượng',
                'Hệ thống lưu trữ thông minh',
                'Quản lý tải điện tối ưu'
            ]
        }
    ];

    return (
        <Section id="projects" background="secondary">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Dự án <span className="text-primary-600">Tiêu biểu</span>
                    </h2>
                    <p className="text-xl text-white/80 max-w-3xl mx-auto">
                        Khám phá những dự án năng lượng tái tạo quy mô lớn mà chúng tôi đã thực hiện,
                        mang lại tác động tích cực cho cộng đồng và môi trường.
                    </p>
                </div>

                <div className="space-y-16">
                    {projectsData.map((project, index) => (
                        <div
                            key={project.id}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                                }`}
                        >
                            <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                                    <div className="aspect-video bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-32 h-32 text-white"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-black/20"></div>
                                </div>
                            </div>

                            <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                <div className="space-y-6">
                                    <div>
                                        <h3 className="text-3xl font-bold text-white mb-4">
                                            {project.title}
                                        </h3>
                                        <p className="text-white/80 text-lg leading-relaxed">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4">
                                        <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                            <Calendar className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                                            <div className="text-white font-semibold">{project.date}</div>
                                            <div className="text-white/60 text-sm">Năm hoàn thành</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                            <MapPin className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                                            <div className="text-white font-semibold">{project.capacity}</div>
                                            <div className="text-white/60 text-sm">Công suất</div>
                                        </div>
                                        <div className="text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                                            <Zap className="w-6 h-6 text-primary-400 mx-auto mb-2" />
                                            <div className="text-white font-semibold">{project.impact.co2Reduction}</div>
                                            <div className="text-white/60 text-sm">CO₂ tiết kiệm</div>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-xl font-semibold text-white">Tác động tích cực:</h4>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="flex items-center gap-3">
                                                <Users className="w-5 h-5 text-primary-400" />
                                                <span className="text-white/80">{project.impact.households} hộ gia đình</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Zap className="w-5 h-5 text-primary-400" />
                                                <span className="text-white/80">{project.impact.investment} đầu tư</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-xl font-semibold text-white">Tính năng nổi bật:</h4>
                                        <ul className="space-y-2">
                                            {project.features.map((feature, featureIndex) => (
                                                <li key={featureIndex} className="flex items-center gap-3 text-white/80">
                                                    <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ProjectShowcaseSection;
