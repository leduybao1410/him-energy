import { serverRouteMap } from '@/constants/server-route/server-route-map';
import { NextResponse } from 'next/server';

type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const lang_code = searchParams.get('lang_code') || 'VI'; // Default to Vietnamese

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const apiUrl = `${serverRouteMap.products.get.url(id)}/related?lang_code=${lang_code}`;
        const res = await fetch(apiUrl, {
            method: serverRouteMap.products.get.method,
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch related products' },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
