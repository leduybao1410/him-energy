import { NextResponse } from 'next/server';

// This expects a JSON body: { username: string, password: string }
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/wp-json/jwt-auth/v1/token`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            let details;
            try { details = await response.json(); } catch { details = undefined; }
            return NextResponse.json(
                { error: 'Invalid credentials', details },
                { status: response.status }
            );
        }

        const data = await response.json();

        // Set JWT token into a cookie
        const token = data.token;
        if (token) {
            // Create response with JSON data
            const response = NextResponse.json(data);

            // Set cookie with proper attributes
            // For development: use SameSite=Lax, no Secure flag
            // For production: use SameSite=Strict or Lax with Secure flag
            const isDevelopment = process.env.NODE_ENV === 'development';

            response.cookies.set('ACCESS_TOKEN', token, {
                path: '/',
                maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
                httpOnly: true, // More secure, prevents XSS
                sameSite: isDevelopment ? 'lax' : 'strict',
                secure: !isDevelopment, // Only secure in production
            });

            return response;
        }

        // Fail-safe, in case token not present
        return NextResponse.json(
            { error: 'Token not returned from API' },
            { status: 500 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
