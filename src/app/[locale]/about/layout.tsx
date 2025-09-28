import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Về chúng tôi - Him Energy | Sứ mệnh, Tầm nhìn & Đội ngũ",
    description: "Tìm hiểu về Him Energy - công ty hàng đầu trong lĩnh vực năng lượng tái tạo. Khám phá sứ mệnh, tầm nhìn, đội ngũ chuyên gia và hành trình phát triển của chúng tôi.",
    keywords: "về Him Energy, sứ mệnh, tầm nhìn, đội ngũ, lịch sử công ty, năng lượng tái tạo, chuyên gia năng lượng",
    authors: [{ name: "Him Energy" }],
    openGraph: {
        title: "Về chúng tôi - Him Energy | Sứ mệnh, Tầm nhìn & Đội ngũ",
        description: "Tìm hiểu về Him Energy - công ty hàng đầu trong lĩnh vực năng lượng tái tạo. Khám phá sứ mệnh, tầm nhìn, đội ngũ chuyên gia và hành trình phát triển của chúng tôi.",
        type: "website",
        locale: "vi_VN",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
