import { NextResponse } from 'next/server';

// POST function to submit contact form data to WordPress
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, message } = body;

        // Validate required fields
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Construct the WordPress API URL
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/ccf/v1/submit`;

        // Forward the request to WordPress
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message })
        });

        if (!response.ok) {
            let errorDetails;
            try {
                errorDetails = await response.json();
            } catch {
                errorDetails = undefined;
            }

            return NextResponse.json(
                {
                    error: 'Failed to submit contact form',
                    details: errorDetails
                },
                { status: response.status }
            );
        }

        const data = await response.json();

        return NextResponse.json(data, { status: 200 });

    } catch (error) {
        console.error('Contact form submission error:', error);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
