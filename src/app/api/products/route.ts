import { NextResponse } from 'next/server';

type Product = {
    id: number;
    name: string;
    price: number;
    category: string;
    thumbnail_url: string;
    description: string;
};

const mockProducts: Product[] = [
    {
        id: 1,
        name: 'Tấm Pin Poly 250W',
        price: 3500000,
        category: 'solar',
        thumbnail_url: '/solar.svg',
        description: 'Tấm Pin Poly 250W'
    },
    {
        id: 2,
        name: 'Bộ hòa lưới Inverter 3kW',
        price: 16800000,
        category: 'inverter',
        thumbnail_url: '/inverter.svg',
        description: 'Bộ hòa lưới Inverter 3kW'
    },
    {
        id: 3,
        name: 'Khung giàn nhôm định hình',
        price: 1100000,
        category: 'rack',
        thumbnail_url: '/rack.svg',
        description: 'Khung giàn nhôm định hình'
    },
    // ... more products if desired
];

function filterProducts(products: Product[], query: URLSearchParams): Product[] {
    let filtered = [...products];

    const category = query.get('category');
    if (category) {
        filtered = filtered.filter(p => p.category === category);
    }

    const search = query.get('search');
    if (search) {
        filtered = filtered.filter(
            p =>
                p.name.toLowerCase().includes(search.toLowerCase()) ||
                p.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    const min_price = Number(query.get('min_price'));
    if (!isNaN(min_price) && min_price !== 0) {
        filtered = filtered.filter(p => p.price >= min_price);
    }

    const max_price = Number(query.get('max_price'));
    if (!isNaN(max_price) && max_price !== 0) {
        filtered = filtered.filter(p => p.price <= max_price);
    }

    const sort = query.get('sort');
    if (sort) {
        switch (sort) {
            case 'priceLow':
                filtered = filtered.sort((a, b) => a.price - b.price);
                break;
            case 'priceHigh':
                filtered = filtered.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                filtered = filtered.sort((a, b) => b.id - a.id);
                break;
        }
    } else {
        filtered = filtered.sort((a, b) => b.id - a.id);
    }

    return filtered;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    let filteredProducts = filterProducts(mockProducts, searchParams);

    // Pagination
    const page = Number(searchParams.get('page')) || 1;
    const per_page = Number(searchParams.get('per_page')) || 12;
    const startIndex = (page - 1) * per_page;
    const endIndex = startIndex + per_page;

    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredProducts.length / per_page);

    return NextResponse.json({
        products: paginatedProducts,
        totalPages,
        totalProducts: filteredProducts.length
    });
}
