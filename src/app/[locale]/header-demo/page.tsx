import { Metadata } from 'next';
import HeaderDemo from '@/components/HeaderDemo';
import HeaderImprovements from '@/components/HeaderImprovements';
import { Section } from '@/components/ui';

export const metadata: Metadata = {
    title: 'Header Demo - Him Energy',
    description: 'Demo các tùy chọn header khác nhau',
};

const HeaderDemoPage = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section với background trắng để test header visibility */}
            <Section className="bg-white py-20">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Demo Header Visibility
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Test các tùy chọn header khác nhau để đảm bảo hiển thị rõ ràng trên background trắng
                    </p>
                </div>
            </Section>

            {/* Demo Section */}
            <Section className="py-16">
                <HeaderDemo />
            </Section>

            {/* Improvements Section */}
            <Section className="py-16 bg-gray-50">
                <HeaderImprovements />
            </Section>

            {/* Test Section với background trắng */}
            <Section className="bg-white py-20">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Test Section với Background Trắng
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Header sẽ hiển thị rõ ràng trên background này với các tùy chọn đã chọn
                    </p>
                </div>
            </Section>

            {/* Test Section với background gradient */}
            <Section className="bg-gradient-to-br from-primary-100 to-secondary-100 py-20">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">
                        Test Section với Background Gradient
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Header cũng sẽ hiển thị tốt trên background gradient này
                    </p>
                </div>
            </Section>

            {/* Test Section với background đậm */}
            <Section className="bg-gradient-to-br from-primary-900 to-secondary-900 py-20">
                <div className="text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">
                        Test Section với Background Đậm
                    </h2>
                    <p className="text-lg text-gray-200 max-w-2xl mx-auto">
                        Header sẽ có style phù hợp với background đậm này
                    </p>
                </div>
            </Section>
        </div>
    );
};

export default HeaderDemoPage;
