import { serverRouteMap } from '@/constants/server-route/server-route-map';
import { setAuthorizationHeader } from '@/lib/api/apiFetch';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = Number(searchParams.get('page')) || 1;
        const per_page = Number(searchParams.get('per_page')) || 12;

        const apiUrl = `${serverRouteMap.products.list.url}?page=${page}&per_page=${per_page}`;
        const res = await fetch(apiUrl, {
            method: serverRouteMap.products.list.method,
        });

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




export async function POST(request: Request) {
    try {
        const requestBody = await request.json();

        const apiUrl = `${serverRouteMap.products.create.url}`;
        const response = await fetch(apiUrl, {
            method: serverRouteMap.products.create.method,
            headers: {
                ...CONTENT_TYPE_APPLICATION_JSON,
                ...setAuthorizationHeader(request),
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            return NextResponse.json(
                { error: 'Failed to create product' },
                { status: response.status }
            );
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
