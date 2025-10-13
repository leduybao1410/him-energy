
import { NextResponse } from 'next/server';


type Params = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: Params }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/custom/v1/products/${id}`;
        const res = await fetch(apiUrl);

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to fetch product detail' },
                { status: res.status }
            );
        }

        const data = await res.json();

        if (!data || Object.keys(data).length === 0) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

