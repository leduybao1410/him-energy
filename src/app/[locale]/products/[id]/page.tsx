'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
    ProductDetailSection,
    ContactSection
} from "@/components/sections";
import { Product, RelatedProduct } from '@/types/product';

// Mock data - sẽ thay thế bằng API call thực tế
const mockProducts: Product[] = [
    {
        id: 1,
        name: "Tấm Pin Mặt Trời Mono 300W",
        slug: "tam-pin-mat-troi-mono-300w",
        description: "Tấm pin mặt trời mono silicon hiệu suất cao, phù hợp cho hệ thống điện mặt trời dân dụng và thương mại. Sản phẩm được sản xuất với công nghệ tiên tiến, đảm bảo hiệu suất chuyển đổi năng lượng tối ưu và độ bền cao trong mọi điều kiện thời tiết.",
        price: 2500000,
        category: "solar",
        image_url: "/solar.svg"
    },
    {
        id: 2,
        name: "Turbine Gió 1KW",
        slug: "turbine-gio-1kw",
        description: "Turbine gió công suất 1KW, thiết kế tối ưu cho vùng có tốc độ gió trung bình. Hệ thống được trang bị công nghệ điều khiển thông minh, tự động điều chỉnh góc cánh quạt để tối ưu hóa hiệu suất thu năng lượng gió.",
        price: 15000000,
        category: "wind",
        image_url: "/wind.svg"
    },
    {
        id: 3,
        name: "Pin Lưu Trữ Lithium 5KWh",
        slug: "pin-luu-tru-lithium-5kwh",
        description: "Hệ thống pin lưu trữ lithium-ion công nghệ cao, dung lượng 5KWh. Pin được thiết kế với công nghệ BMS (Battery Management System) thông minh, đảm bảo an toàn và kéo dài tuổi thọ pin.",
        price: 18000000,
        category: "battery",
        image_url: "/hydro.svg"
    },
    {
        id: 4,
        name: "Biến Tần Hybrid 5KW",
        slug: "bien-tan-hybrid-5kw",
        description: "Biến tần hybrid công suất 5KW, tích hợp MPPT và bộ sạc pin. Hệ thống cho phép kết nối đồng thời với lưới điện, pin lưu trữ và tải tiêu thụ, mang lại tính linh hoạt cao trong việc quản lý năng lượng.",
        price: 12000000,
        category: "inverter",
        image_url: "/solar.svg"
    },
    {
        id: 5,
        name: "Tấm Pin Poly 250W",
        slug: "tam-pin-poly-250w",
        description: "Tấm pin mặt trời poly silicon, giá cả hợp lý cho các dự án quy mô lớn. Sản phẩm được thiết kế với khung nhôm chắc chắn, chống ăn mòn và chịu được tải trọng gió lớn.",
        price: 2000000,
        category: "solar",
        image_url: "/solar.svg"
    },
    {
        id: 6,
        name: "Turbine Gió 500W",
        slug: "turbine-gio-500w",
        description: "Turbine gió mini công suất 500W, phù hợp cho hộ gia đình. Thiết kế nhỏ gọn, dễ lắp đặt và vận hành, phù hợp cho các khu vực có tốc độ gió thấp đến trung bình.",
        price: 8000000,
        category: "wind",
        image_url: "/wind.svg"
    }
];

const mockRelatedProducts: RelatedProduct[] = [
    {
        id: 2,
        name: "Turbine Gió 1KW",
        slug: "turbine-gio-1kw",
        price: 15000000,
        image_url: "/wind.svg",
        category: "wind"
    },
    {
        id: 3,
        name: "Pin Lưu Trữ Lithium 5KWh",
        slug: "pin-luu-tru-lithium-5kwh",
        price: 18000000,
        image_url: "/hydro.svg",
        category: "battery"
    },
    {
        id: 4,
        name: "Biến Tần Hybrid 5KW",
        slug: "bien-tan-hybrid-5kw",
        price: 12000000,
        image_url: "/solar.svg",
        category: "inverter"
    },
    {
        id: 5,
        name: "Tấm Pin Poly 250W",
        slug: "tam-pin-poly-250w",
        price: 2000000,
        image_url: "/solar.svg",
        category: "solar"
    }
];

export default function ProductDetail() {
    const params = useParams();
    const productId = parseInt(params.id as string);

    const [product, setProduct] = useState<Product | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);

            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Find product by ID
            const foundProduct = mockProducts.find(p => p.id === productId);

            if (foundProduct) {
                setProduct(foundProduct);
                // Get related products (same category, excluding current product)
                const related = mockRelatedProducts.filter(
                    p => p.category === foundProduct.category && p.id !== foundProduct.id
                );
                setRelatedProducts(related);
            }

            setLoading(false);
        };

        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen bg-secondary w-full align-center justify-center">
                <Header />
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-muted-foreground">Đang tải thông tin sản phẩm...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-secondary w-full align-center justify-center">
                <Header />
                <div className="flex items-center justify-center min-h-[50vh]">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h1 className="text-2xl font-bold text-primary mb-2">
                            Không tìm thấy sản phẩm
                        </h1>
                        <p className="text-muted-foreground">
                            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-secondary w-full align-center justify-center">
            <Header />
            <ProductDetailSection
                product={product}
                relatedProducts={relatedProducts}
            />
            <ContactSection />
            <Footer />
        </div>
    );
}
