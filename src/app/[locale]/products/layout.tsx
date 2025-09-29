import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sản phẩm - Him Energy",
    description: "Khám phá bộ sưu tập sản phẩm năng lượng tái tạo đa dạng của Him Energy, từ tấm pin mặt trời đến hệ thống lưu trữ năng lượng hiện đại.",
    keywords: "sản phẩm năng lượng, tấm pin mặt trời, turbine gió, pin lưu trữ, biến tần, Him Energy",
    openGraph: {
        title: "Sản phẩm - Him Energy",
        description: "Khám phá bộ sưu tập sản phẩm năng lượng tái tạo đa dạng của Him Energy, từ tấm pin mặt trời đến hệ thống lưu trữ năng lượng hiện đại.",
        type: "website",
        locale: "vi_VN",
    },
};

export default function ProductsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
