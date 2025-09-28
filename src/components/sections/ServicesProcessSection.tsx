import { Search, FileText, Cog, CheckCircle, ArrowRight } from 'lucide-react';
import { Section, Container } from '@/components/ui';

const ServicesProcessSection = () => {
    const processSteps = [
        {
            icon: <Search className="w-8 h-8 text-white" />,
            title: 'Đánh giá & Khảo sát',
            description: 'Khảo sát địa điểm, đánh giá tiềm năng năng lượng và phân tích nhu cầu của khách hàng',
            details: [
                'Khảo sát địa hình và điều kiện thời tiết',
                'Đánh giá tiềm năng năng lượng mặt trời/gió',
                'Phân tích nhu cầu sử dụng điện',
                'Tính toán ROI và thời gian hoàn vốn'
            ],
            gradient: 'from-blue-500 to-blue-600'
        },
        {
            icon: <FileText className="w-8 h-8 text-white" />,
            title: 'Thiết kế & Lập kế hoạch',
            description: 'Thiết kế hệ thống tối ưu và lập kế hoạch triển khai chi tiết',
            details: [
                'Thiết kế hệ thống phù hợp với nhu cầu',
                'Lựa chọn thiết bị và công nghệ phù hợp',
                'Lập kế hoạch triển khai và timeline',
                'Chuẩn bị hồ sơ pháp lý và giấy phép'
            ],
            gradient: 'from-green-500 to-green-600'
        },
        {
            icon: <Cog className="w-8 h-8 text-white" />,
            title: 'Triển khai & Lắp đặt',
            description: 'Thực hiện lắp đặt hệ thống với đội ngũ kỹ thuật chuyên nghiệp',
            details: [
                'Lắp đặt thiết bị theo đúng tiêu chuẩn',
                'Kết nối hệ thống và kiểm tra an toàn',
                'Cài đặt hệ thống giám sát',
                'Vận hành thử nghiệm và hiệu chỉnh'
            ],
            gradient: 'from-orange-500 to-orange-600'
        },
        {
            icon: <CheckCircle className="w-8 h-8 text-white" />,
            title: 'Vận hành & Bảo trì',
            description: 'Hỗ trợ vận hành và bảo trì định kỳ để đảm bảo hiệu suất tối ưu',
            details: [
                'Giám sát hiệu suất hệ thống 24/7',
                'Bảo trì định kỳ và thay thế linh kiện',
                'Hỗ trợ kỹ thuật và sửa chữa',
                'Báo cáo hiệu suất và tối ưu hóa'
            ],
            gradient: 'from-purple-500 to-purple-600'
        }
    ];

    return (
        <Section id="services-process" background="gray">
            <Container maxWidth="6xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Quy trình <span className="text-primary-600">Làm việc</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Chúng tôi tuân thủ quy trình làm việc chuyên nghiệp để đảm bảo chất lượng và hiệu quả tối ưu
                    </p>
                </div>

                <div className="relative">
                    {/* Connection line */}
                    <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200"></div>

                    <div className="grid lg:grid-cols-4 gap-8">
                        {processSteps.map((step, index) => (
                            <div key={index} className="relative">
                                {/* Step number */}
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                                    {index + 1}
                                </div>

                                <div className="bg-white rounded-2xl shadow-lg p-6 mt-4 hover:shadow-xl transition-all duration-300">
                                    <div className={`w-16 h-16 ${step.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                                        {step.icon}
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                                        {step.title}
                                    </h3>

                                    <p className="text-gray-600 mb-4 text-center">
                                        {step.description}
                                    </p>

                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {step.details.map((detail, detailIndex) => (
                                            <li key={detailIndex} className="flex items-start gap-2">
                                                <CheckCircle className="w-4 h-4 text-primary-500 flex-shrink-0 mt-0.5" />
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="text-center mt-12">
                    <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center gap-2 mx-auto group">
                        Bắt đầu Dự án
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>
            </Container>
        </Section>
    );
};

export default ServicesProcessSection;
