import { NextResponse } from 'next/server';

export async function POST() {
    try {
        // Create response
        const response = NextResponse.json({ message: 'Logged out successfully' });

        // Clear the ACCESS_TOKEN cookie
        response.cookies.set('ACCESS_TOKEN', '', {
            path: '/',
            maxAge: 0, // Expire immediately
            httpOnly: true,
            sameSite: process.env.NODE_ENV === 'development' ? 'lax' : 'strict',
            secure: process.env.NODE_ENV !== 'development',
        });

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
