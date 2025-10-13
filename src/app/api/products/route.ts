import { NextResponse } from 'next/server';
import { Product } from '@/types/product';

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Tấm Pin Poly 250W',
        slug: 'tam-pin-poly-250w',
        price: 3500000,
        category: 'solar',
        thumbnail_url: '/solar.svg',
        description: 'Tấm Pin Poly 250W',
        features: ['Chất lượng cao, bền bỉ', 'Bảo hành 25 năm', 'Hiệu suất cao, tiết kiệm năng lượng'],
        image_url: ['/solar.svg'],
        specifications: {
            capacity: '250W',
            efficiency: '20.5%',
            size: '1956 x 992 x 40mm',
            weight: '10kg',
            warranty: '25 năm',
            origin: 'Việt Nam'
        }
    },
    {
        id: 2,
        name: 'Bộ hòa lưới Inverter 3kW',
        slug: 'bo-hoa-luoi-inverter-3kw',
        price: 16800000,
        category: 'inverter',
        thumbnail_url: '/solar.svg',
        description: 'Bộ hòa lưới Inverter 3kW',
        features: ['Chất lượng cao, bền bỉ', 'Bảo hành 25 năm', 'Hiệu suất cao, tiết kiệm năng lượng'],
        image_url: ['/solar.svg'],
        specifications: {
            capacity: '3kW',
            efficiency: '20.5%',
            size: '1956 x 992 x 40mm',
            weight: '10kg',
            warranty: '25 năm',
            origin: 'Việt Nam'
        }
    },
    {
        id: 3,
        name: 'Khung giàn nhôm định hình',
        slug: 'khung-gian-nhom-dinh-hinh',
        price: 1100000,
        category: 'solar',
        thumbnail_url: '/solar.svg',
        description: 'Khung giàn nhôm định hình',
        features: ['Chất lượng cao, bền bỉ', 'Bảo hành 25 năm', 'Hiệu suất cao, tiết kiệm năng lượng'],
        image_url: ['/solar.svg'],
        specifications: {
            capacity: 'N/A',
            efficiency: 'N/A',
            size: '1956 x 992 x 40mm',
            weight: '10kg',
            warranty: '25 năm',
            origin: 'Việt Nam'
        }
    },
    {
        id: 4,
        name: 'Turbine Gió 1KW',
        slug: 'turbine-gio-1kw',
        price: 15000000,
        category: 'wind',
        thumbnail_url: '/wind.svg',
        description: 'Turbine gió công suất 1KW, thiết kế tối ưu cho vùng có tốc độ gió trung bình.',
        features: ['Chất lượng cao, bền bỉ', 'Bảo hành 25 năm', 'Hiệu suất cao, tiết kiệm năng lượng'],
        image_url: ['/wind.svg'],
        specifications: {
            capacity: '1KW',
            efficiency: '20.5%',
            size: '1956 x 992 x 40mm',
            weight: '10kg',
            warranty: '25 năm',
            origin: 'Việt Nam'
        }
    },
    {
        id: 5,
        name: 'Pin Lưu Trữ Lithium 5KWh',
        slug: 'pin-luu-tru-lithium-5kwh',
        price: 18000000,
        category: 'battery',
        thumbnail_url: '/hydro.svg',
        description: 'Hệ thống pin lưu trữ lithium-ion công nghệ cao, dung lượng 5KWh.',
        features: ['Chất lượng cao, bền bỉ', 'Bảo hành 25 năm', 'Hiệu suất cao, tiết kiệm năng lượng'],
        image_url: ['/hydro.svg'],
        specifications: {
            capacity: '5KWh',
            efficiency: '20.5%',
            size: '1956 x 992 x 40mm',
            weight: '10kg',
            warranty: '25 năm',
            origin: 'Việt Nam'
        }
    }
];

// All filter options have been removed - returning all products

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page')) || 1;
        const per_page = Number(searchParams.get('per_page')) || 12;

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/products?page=${page}&per_page=${per_page}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch products' },
                { status: res.status }
            );
        }

        const data = await res.json();

        // Check if response already paginated or slice is needed
        // If API returns { products: [...], total: 100 }, use directly
        // Otherwise, fallback to slicing
        let products: any[] = [];
        let totalProducts: number = 0;

        if (Array.isArray(data)) {
            // API returned an array, do pagination here
            products = data.slice(0, per_page); // Only first page since API accepts page/per_page
            totalProducts = data.length;
        } else if ('products' in data && Array.isArray(data.products)) {
            products = data.products;
            totalProducts = data.total || data.products.length;
        } else {
            // Unexpected shape
            return NextResponse.json({ error: 'Invalid products data' }, { status: 500 });
        }

        const totalPages = Math.ceil(totalProducts / per_page);

        return NextResponse.json({
            products,
            totalPages,
            totalProducts
        });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

