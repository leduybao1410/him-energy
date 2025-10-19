import { serverImagesRoute } from '@/constants/server-route/server-images-route';
import { setAuthorizationHeader } from '@/lib/api/apiFetch';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const perPage = searchParams.get('per_page');
        const page = searchParams.get('page');
        const fileType = searchParams.get('type'); // 'image' or 'pdf'

        // Build query parameters for WordPress media API
        const queryParams = new URLSearchParams({
            per_page: perPage ?? '20',
            page: page ?? '1',
        });

        // Add media type filter based on file type
        if (fileType === 'image') {
            queryParams.append('media_type', 'image');
        } else if (fileType === 'pdf') {
            queryParams.append('media_type', 'application');
        }

        const response = await fetch(`${serverImagesRoute.list.url}?${queryParams}`, {
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
                { error: 'Failed to fetch files', details: errorDetail },
                { status: response.status }
            );
        }

        const data = await response.json();
        const total = response.headers.get('X-WP-Total') ?? 0;
        const totalPages = response.headers.get('X-WP-TotalPages') ?? 1;

        // Filter files based on type
        let filteredData = data;
        if (fileType === 'image') {
            filteredData = data.filter((item: any) =>
                item.mime_type && item.mime_type.startsWith('image/')
            );
        } else if (fileType === 'pdf') {
            filteredData = data.filter((item: any) =>
                item.mime_type && item.mime_type === 'application/pdf'
            );
        }

        return NextResponse.json({
            data: filteredData,
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
        const formData = await request.formData();
        const file = formData.get('file');
        const title = formData.get('title');
        const description = formData.get('description');

        if (!file || !(file instanceof Blob)) {
            return NextResponse.json(
                { error: 'File is required' },
                { status: 400 }
            );
        }

        // Validate file type
        const fileType = (file as File).type;
        if (!fileType.startsWith('image/') && fileType !== 'application/pdf') {
            return NextResponse.json(
                { error: 'Only images and PDF files are allowed' },
                { status: 400 }
            );
        }

        // Construct the URL with query parameters if provided
        const wpCreateUrl = serverImagesRoute.create.url;
        const wpUrl = new URL(wpCreateUrl);

        // Create FormData to forward to WordPress
        const wpFormData = new FormData();
        wpFormData.append('file', file);
        if (title) wpFormData.append('title', String(title));
        if (description) wpFormData.append('description', String(description));

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
                { error: 'Failed to upload file', details: data },
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
