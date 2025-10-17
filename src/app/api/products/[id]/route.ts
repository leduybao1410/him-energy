
import { serverRouteMap } from '@/constants/server-route/server-route-map';
import { setAuthorizationHeader } from '@/lib/api/apiFetch';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/lib/utils';
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

        const apiUrl = `${serverRouteMap.products.get.url(id)}`;
        const res = await fetch(apiUrl, {
            method: serverRouteMap.products.get.method,
        });

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

export async function PUT(request: Request, { params }: { params: Params }) {
    try {
        const { id } = await params;
        const requestBody = await request.json();

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const apiUrl = `${serverRouteMap.products.update.url(id)}`;
        const res = await fetch(apiUrl, {
            method: serverRouteMap.products.update.method,
            headers: {
                ...CONTENT_TYPE_APPLICATION_JSON,
                ...setAuthorizationHeader(request),
            },
            body: JSON.stringify(requestBody),
        });


        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to update product' },
                { status: res.status }
            );
        }

        const data = await res.json();
        console.log(data);
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request, { params }: { params: Params }) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const apiUrl = `${serverRouteMap.products.delete.url(id)}`;
        const res = await fetch(apiUrl, {
            method: serverRouteMap.products.delete.method,
            headers: {
                ...setAuthorizationHeader(request),
                ...CONTENT_TYPE_APPLICATION_JSON,
            }
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: 'Failed to delete product' },
                { status: res.status }
            );
        }

        return NextResponse.json({ message: 'Product deleted successfully' });

    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

