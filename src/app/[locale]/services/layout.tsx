import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dịch vụ - HIM Energy',
    description: 'Khám phá các dịch vụ năng lượng tái tạo của HIM Energy: Năng lượng mặt trời, năng lượng gió và tư vấn chuyên nghiệp.',
};

export default function ServicesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
