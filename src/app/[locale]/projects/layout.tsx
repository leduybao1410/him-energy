import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dự án - Him Energy",
    description: "Khám phá các dự án năng lượng tái tạo tiêu biểu của Him Energy và tác động tích cực đến môi trường.",
    keywords: "dự án năng lượng, năng lượng tái tạo, Him Energy, dự án xanh, bền vững",
    openGraph: {
        title: "Dự án - Him Energy",
        description: "Khám phá các dự án năng lượng tái tạo tiêu biểu của Him Energy và tác động tích cực đến môi trường.",
        type: "website",
        locale: "vi_VN",
    },
};

export default function ProjectsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
