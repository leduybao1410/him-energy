import { authRoute } from "@/constants/server-route/server-auth-route";
import { Method } from "@/constants/utils";
import { getAccessTokenFromRequest } from "@/lib/api/apiFetch";
import { CONTENT_TYPE_APPLICATION_JSON } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const accessToken = getAccessTokenFromRequest(request);
        if (!accessToken) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const response = await fetch(authRoute.validateToken.url, {
            method: authRoute.validateToken.method,
            headers: {
                ...CONTENT_TYPE_APPLICATION_JSON
            },
            body: JSON.stringify({ token: accessToken })
        });
        if (!response.ok) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        return NextResponse.json({ message: 'Token is valid' });
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}