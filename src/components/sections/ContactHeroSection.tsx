import { Container } from '@/components/ui';

const ContactHeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-primary-600 via-secondary-600 to-cyan-600 py-24 lg:py-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.1%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
            </div>

            <Container maxWidth="6xl" className="relative z-10">
                <div className="text-center text-white">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                        Liên hệ với <span className="text-yellow-300">chúng tôi</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
                        Sẵn sàng bắt đầu hành trình năng lượng tái tạo?
                        Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            <span className="text-white font-medium">info@himenergy.com</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3">
                            <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                            <span className="text-white font-medium">+84 123 456 789</span>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Decorative Elements */}
            <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-300/20 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 bg-cyan-300/20 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full blur-lg"></div>
        </section >
    );
};

export default ContactHeroSection;
