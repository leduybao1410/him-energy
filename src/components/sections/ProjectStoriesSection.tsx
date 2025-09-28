import { Quote, Star, Calendar, MapPin, Users, Zap, Leaf } from 'lucide-react';
import { Section, Container } from '@/components/ui';

const ProjectStoriesSection = () => {
    const testimonials = [
        {
            id: 1,
            name: 'Nguyễn Văn Minh',
            position: 'Giám đốc Công ty TNHH Minh Phát',
            location: 'Bình Thuận',
            project: 'Nhà máy điện mặt trời Bình Thuận',
            content: 'Him Energy đã giúp chúng tôi chuyển đổi hoàn toàn sang năng lượng sạch. Chi phí điện giảm 60% và chúng tôi tự hào góp phần bảo vệ môi trường.',
            rating: 5,
            savings: '60% chi phí điện',
            image: '/solar.svg'
        },
        {
            id: 2,
            name: 'Trần Thị Lan',
            position: 'Chủ tịch HĐQT Tập đoàn Lan Hương',
            location: 'Ninh Thuận',
            project: 'Turbine gió Ninh Thuận',
            content: 'Dự án turbine gió không chỉ mang lại lợi ích kinh tế mà còn tạo ra hàng trăm việc làm cho địa phương. Chúng tôi rất hài lòng với chất lượng dịch vụ.',
            rating: 5,
            savings: '45% chi phí năng lượng',
            image: '/wind.svg'
        },
        {
            id: 3,
            name: 'Lê Hoàng Nam',
            position: 'CEO Công ty CP Năng lượng Nam Việt',
            location: 'Đà Nẵng',
            project: 'Hệ thống năng lượng hỗn hợp',
            content: 'Hệ thống tích hợp đa nguồn năng lượng của Him Energy đã giúp chúng tôi đạt được sự ổn định và hiệu quả cao nhất. Đây là giải pháp hoàn hảo cho tương lai.',
            rating: 5,
            savings: '70% chi phí vận hành',
            image: '/hydro.svg'
        }
    ];

    const caseStudies = [
        {
            id: 1,
            title: 'Chuyển đổi năng lượng cho Khu công nghiệp',
            challenge: 'Khu công nghiệp cần giảm 50% chi phí điện và đạt mục tiêu carbon neutral',
            solution: 'Lắp đặt hệ thống pin mặt trời 20MW kết hợp với hệ thống lưu trữ năng lượng',
            results: [
                'Giảm 65% chi phí điện',
                'Đạt mục tiêu carbon neutral sớm 2 năm',
                'Tạo ra 200 việc làm mới'
            ],
            timeline: '18 tháng',
            investment: '1.2 tỷ VNĐ'
        },
        {
            id: 2,
            title: 'Năng lượng tái tạo cho Cộng đồng nông thôn',
            challenge: 'Vùng nông thôn xa xôi chưa có điện lưới, cần giải pháp năng lượng bền vững',
            solution: 'Xây dựng hệ thống micro-grid sử dụng năng lượng mặt trời và gió',
            results: [
                'Cung cấp điện 24/7 cho 500 hộ gia đình',
                'Giảm 90% chi phí năng lượng',
                'Tạo ra 50 việc làm địa phương'
            ],
            timeline: '12 tháng',
            investment: '800 triệu VNĐ'
        }
    ];

    return (
        <Section background="gradient">
            <Container maxWidth="6xl">
                {/* Testimonials */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Câu chuyện <span className="text-primary-200">Thành công</span>
                    </h2>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Lắng nghe những chia sẻ chân thực từ khách hàng về hành trình
                        chuyển đổi năng lượng cùng Him Energy.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 mb-20">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                                ))}
                            </div>

                            <Quote className="w-8 h-8 text-primary-300 mb-4" />

                            <p className="text-white/90 mb-6 leading-relaxed">
                                &quot;{testimonial.content}&quot;
                            </p>

                            <div className="border-t border-white/20 pt-6">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-full flex items-center justify-center">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-8 h-8 text-white"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                                        <p className="text-white/70 text-sm">{testimonial.position}</p>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-white/80">
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-4 h-4" />
                                        {testimonial.location}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-4 h-4" />
                                        {testimonial.savings}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Case Studies */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Nghiên cứu <span className="text-primary-200">Tình huống</span>
                    </h3>
                    <p className="text-xl text-primary-100 max-w-3xl mx-auto">
                        Khám phá cách chúng tôi giải quyết những thách thức phức tạp
                        và mang lại kết quả vượt mong đợi.
                    </p>
                </div>

                <div className="space-y-12">
                    {caseStudies.map((study, index) => (
                        <div
                            key={study.id}
                            className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                                }`}
                        >
                            <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                                    <h4 className="text-2xl font-bold text-white mb-6">
                                        {study.title}
                                    </h4>

                                    <div className="space-y-6">
                                        <div>
                                            <h5 className="text-lg font-semibold text-primary-200 mb-2">
                                                Thách thức:
                                            </h5>
                                            <p className="text-white/80">
                                                {study.challenge}
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="text-lg font-semibold text-primary-200 mb-2">
                                                Giải pháp:
                                            </h5>
                                            <p className="text-white/80">
                                                {study.solution}
                                            </p>
                                        </div>

                                        <div>
                                            <h5 className="text-lg font-semibold text-primary-200 mb-3">
                                                Kết quả đạt được:
                                            </h5>
                                            <ul className="space-y-2">
                                                {study.results.map((result, resultIndex) => (
                                                    <li key={resultIndex} className="flex items-center gap-3 text-white/80">
                                                        <div className="w-2 h-2 bg-primary-400 rounded-full"></div>
                                                        {result}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className={`${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                                        <Calendar className="w-8 h-8 text-primary-300 mx-auto mb-3" />
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {study.timeline}
                                        </div>
                                        <div className="text-white/70 text-sm">
                                            Thời gian thực hiện
                                        </div>
                                    </div>

                                    <div className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                                        <Zap className="w-8 h-8 text-primary-300 mx-auto mb-3" />
                                        <div className="text-2xl font-bold text-white mb-1">
                                            {study.investment}
                                        </div>
                                        <div className="text-white/70 text-sm">
                                            Tổng đầu tư
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 p-6 bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-xl border border-primary-400/30">
                                    <h5 className="text-lg font-semibold text-white mb-3">
                                        Tác động bền vững:
                                    </h5>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-white/80">
                                        <div className="flex items-center gap-2">
                                            <Leaf className="w-4 h-4 text-green-400" />
                                            Giảm 80% CO₂
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-blue-400" />
                                            Tạo việc làm
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 text-yellow-400" />
                                            Tiết kiệm năng lượng
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 text-purple-400" />
                                            Hiệu quả cao
                                        </div>
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

export default ProjectStoriesSection;
