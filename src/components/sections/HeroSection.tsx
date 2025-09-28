import { ArrowRight, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui';

const HeroSection = () => {
    const handleGetStarted = () => {
        // Logic để xử lý khi click "Bắt đầu ngay"
        console.log('Get started clicked');
    };

    const handleLearnMore = () => {
        // Logic để xử lý khi click "Tìm hiểu thêm"
        console.log('Learn more clicked');
    };

    return (
        <section className="relative min-h-screen overflow-hidden !flex items-center justify-center">
            {/* Background with gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-secondary-500 to-primary-900">
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-32 h-32 bg-primary-400/20 rounded-full animate-pulse"></div>
                <div className="absolute top-40 right-20 w-24 h-24 bg-secondary-400/20 rounded-full animate-pulse delay-1000"></div>
                <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-cyan-400/20 rounded-full animate-pulse delay-2000"></div>
            </div>

            <div className="relative z-10 bg-secondary-700/20 rounded-2xl mx-auto px-4 text-center text-white">
                <div className="max-w-4xl mx-auto py-4">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                        <span className="bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                            Powering a
                        </span>
                        <br />
                        <span className="text-white">Sustainable Future</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
                        Chúng tôi tiên phong trong việc phát triển các giải pháp năng lượng tái tạo
                        thông minh, giúp doanh nghiệp và cộng đồng chuyển đổi sang tương lai xanh bền vững.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            variant="primary"
                            size="md"
                            onClick={handleGetStarted}
                        >
                            Bắt đầu ngay
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="md"
                            onClick={handleLearnMore}
                        >
                            Tìm hiểu thêm
                            <ChevronRight className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
