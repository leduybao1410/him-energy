import { Users, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Section, Container, Card } from '@/components/ui';

const TeamSection = () => {
    const teamMembers = [
        {
            name: 'Nguyễn Văn Minh',
            position: 'CEO & Founder',
            experience: '15+ năm kinh nghiệm',
            education: 'Thạc sĩ Kỹ thuật Năng lượng',
            description: 'Chuyên gia hàng đầu trong lĩnh vực năng lượng tái tạo với hơn 15 năm kinh nghiệm.',
            icon: <Briefcase className="w-6 h-6" />
        },
        {
            name: 'Trần Thị Lan',
            position: 'CTO',
            experience: '12+ năm kinh nghiệm',
            education: 'Tiến sĩ Công nghệ Thông tin',
            description: 'Chuyên gia công nghệ với kinh nghiệm sâu về hệ thống năng lượng thông minh.',
            icon: <Award className="w-6 h-6" />
        },
        {
            name: 'Lê Hoàng Nam',
            position: 'Head of Engineering',
            experience: '10+ năm kinh nghiệm',
            education: 'Thạc sĩ Kỹ thuật Điện',
            description: 'Kỹ sư trưởng với chuyên môn về thiết kế và triển khai hệ thống năng lượng.',
            icon: <GraduationCap className="w-6 h-6" />
        },
        {
            name: 'Phạm Thị Hương',
            position: 'Head of Operations',
            experience: '8+ năm kinh nghiệm',
            education: 'Thạc sĩ Quản trị Kinh doanh',
            description: 'Chuyên gia vận hành với kinh nghiệm quản lý dự án năng lượng quy mô lớn.',
            icon: <Users className="w-6 h-6" />
        }
    ];

    return (
        <Section id="team" background="gray">
            <Container maxWidth="6xl">
                <div className="flex flex-col items-center justify-center">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                            Đội ngũ <span className="text-primary-600">chuyên gia</span>
                        </h2>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Đội ngũ của chúng tôi bao gồm những chuyên gia hàng đầu với nhiều năm kinh nghiệm
                            trong lĩnh vực năng lượng tái tạo và công nghệ xanh.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
                        {teamMembers.map((member, index) => (
                            <Card key={index} className="text-center" hover>
                                <div className="flex flex-col items-center">
                                    <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mb-4">
                                        <div className="text-primary-600">
                                            {member.icon}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {member.name}
                                    </h3>

                                    <p className="text-primary-600 font-semibold mb-3">
                                        {member.position}
                                    </p>

                                    <div className="space-y-2 mb-4">
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Kinh nghiệm:</span> {member.experience}
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            <span className="font-medium">Học vấn:</span> {member.education}
                                        </p>
                                    </div>

                                    <p className="text-gray-600 text-sm leading-relaxed">
                                        {member.description}
                                    </p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default TeamSection;
