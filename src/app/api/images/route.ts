import { serverImagesRoute } from '@/constants/server-route/server-images-route';
import { setAuthorizationHeader } from '@/lib/api/apiFetch';
import { CONTENT_TYPE_APPLICATION_JSON } from '@/lib/utils';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const perPage = searchParams.get('per_page');
        const page = searchParams.get('page');

        const response = await fetch(`${serverImagesRoute.list.url}?per_page=${perPage ?? 10}&page=${page ?? 1}`, {
            method: serverImagesRoute.list.method,
            headers: setAuthorizationHeader(request)
        });

        if (!response.ok) {
            let errorDetail;
            try {
                errorDetail = await response.json();
            } catch {
                errorDetail = undefined;
            }
            return NextResponse.json(
                { error: 'Failed to fetch media', details: errorDetail },
                { status: response.status }
            );
        }

        const data = await response.json();
        const total = response.headers.get('X-WP-Total') ?? 0;
        const totalPages = response.headers.get('X-WP-TotalPages') ?? 1;
        return NextResponse.json({
            data,
            total,
            totalPages,
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
        // Parse query parameters for options like per_page and page

        // Expecting a multipart/form-data upload
        const formData = await request.formData();
        const file = formData.get('file');
        const title = formData.get('title');
        const description = formData.get('description');

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json(
                { error: 'Image file is required' },
                { status: 400 }
            );
        }

        // Construct the URL with query parameters if provided
        const wpCreateUrl = serverImagesRoute.create.url;
        const wpUrl = new URL(wpCreateUrl);


        // Create FormData to forward to WordPress
        const wpFormData = new FormData();
        wpFormData.append('file', file);
        // if (title) wpFormData.append('title', String(title));
        // if (description) wpFormData.append('description', String(description));

        // Prepare headers for WP (do NOT set Content-Type on fetch, browser will handle boundaries for multipart)
        const headers: Record<string, string> = {
            ...setAuthorizationHeader(request),
        };

        const wpRes = await fetch(wpUrl.toString(), {
            method: serverImagesRoute.create.method,
            headers,
            body: wpFormData,
        });

        const data = await wpRes.json();

        if (!wpRes.ok) {
            return NextResponse.json(
                { error: 'Failed to upload image', details: data },
                { status: wpRes.status }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

