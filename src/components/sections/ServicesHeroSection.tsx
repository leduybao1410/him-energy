import { ArrowRight, Sun, Wind, Users } from 'lucide-react';
import { Section, Container } from '@/components/ui';

const ServicesHeroSection = () => {
    return (
        <Section id="services-hero" background="gradient">
            <Container maxWidth="6xl">
                <div className="text-center py-20">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            Dịch vụ <span className="text-yellow-400">Năng lượng</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
                            Cung cấp giải pháp năng lượng tái tạo toàn diện, từ thiết kế đến triển khai và vận hành
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mt-16">
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <Sun className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Năng lượng Mặt trời</h3>
                            <p className="text-white/80 text-sm">
                                Hệ thống pin mặt trời hiệu suất cao với công nghệ tiên tiến
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <Wind className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Năng lượng Gió</h3>
                            <p className="text-white/80 text-sm">
                                Turbine gió công nghiệp và dân dụng với thiết kế tối ưu
                            </p>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                            <Users className="w-12 h-12 text-green-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-white mb-2">Tư vấn Chuyên nghiệp</h3>
                            <p className="text-white/80 text-sm">
                                Dịch vụ tư vấn chuyên sâu về chuyển đổi năng lượng
                            </p>
                        </div>
                    </div>

                    <div className="mt-12">
                        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto group">
                            Khám phá Dịch vụ
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default ServicesHeroSection;
