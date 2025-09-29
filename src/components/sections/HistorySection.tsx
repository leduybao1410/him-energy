import { Calendar, TrendingUp, Globe, Award } from 'lucide-react';
import { Section, Container, Card } from '@/components/ui';

const HistorySection = () => {
    const historyData = [
        {
            year: '2018',
            title: 'Thành lập công ty',
            description: 'Him Energy được thành lập với sứ mệnh mang đến những giải pháp năng lượng tái tạo bền vững.',
            icon: <Calendar className="w-6 h-6" />,
            achievements: ['Thành lập với 5 nhân viên', 'Dự án đầu tiên: 1MW solar farm']
        },
        {
            year: '2019',
            title: 'Mở rộng quy mô',
            description: 'Triển khai thành công nhiều dự án năng lượng mặt trời quy mô lớn tại miền Nam.',
            icon: <TrendingUp className="w-6 h-6" />,
            achievements: ['Mở rộng lên 20 nhân viên', 'Hoàn thành 10MW solar projects']
        },
        {
            year: '2021',
            title: 'Đa dạng hóa công nghệ',
            description: 'Bắt đầu phát triển các giải pháp năng lượng gió và hệ thống lưu trữ năng lượng.',
            icon: <Globe className="w-6 h-6" />,
            achievements: ['Ra mắt wind energy solutions', 'Phát triển battery storage systems']
        },
        {
            year: '2023',
            title: 'Công nhận quốc tế',
            description: 'Nhận được chứng nhận ISO 14001 và trở thành đối tác chiến lược của nhiều tập đoàn lớn.',
            icon: <Award className="w-6 h-6" />,
            achievements: ['ISO 14001 certification', '50+ completed projects', '100+ employees']
        }
    ];

    return (
        <Section id="history" background="secondary">
            <Container maxWidth="6xl">
                <div className="flex flex-col items-center justify-center">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Hành trình <span className="text-primary-600">phát triển</span>
                        </h2>
                        <p className="text-xl text-white/80 leading-relaxed">
                            Từ những ngày đầu thành lập đến nay, chúng tôi đã không ngừng phát triển
                            và đạt được những thành tựu đáng tự hào trong lĩnh vực năng lượng tái tạo.
                        </p>
                    </div>

                    <div className="relative w-full">
                        {/* Timeline line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-primary-600/30 rounded-full"></div>

                        <div className="space-y-12">
                            {historyData.map((item, index) => (
                                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                                    {/* Content */}
                                    <div className={`md:w-1/2 w-full ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                                        <Card className="bg-white/10 backdrop-blur-sm border-white/20" hover>
                                            <div className="flex md:flex-row flex-col items-start md:space-x-4 space-y-4 md:space-y-0">
                                                <div className={`flex-shrink-0${index % 2 == 0 && ' ml-auto'}`}>
                                                    <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                                                        <div className="text-white">
                                                            {item.icon}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-primary-400 font-bold md:text-lg text-base mb-2">
                                                        {item.year}
                                                    </div>
                                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-white/80 md:text-lg text-base mb-4">
                                                        {item.description}
                                                    </p>
                                                    <div className="space-y-1">
                                                        {item.achievements.map((achievement, idx) => (
                                                            <div key={idx} className="text-sm md:text-base text-primary-300">
                                                                • {achievement}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>

                                    {/* Timeline dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-600 rounded-full border-4 border-secondary-700 md:block hidden"></div>

                                    {/* Spacer for opposite side */}
                                    <div className="w-1/2"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </Container >
        </Section >
    );
};

export default HistorySection;
