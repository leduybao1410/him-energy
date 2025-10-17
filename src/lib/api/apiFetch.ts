import { CONTENT_TYPE_APPLICATION_JSON } from "../utils";

export const apiFetch = async (url: string, options: RequestInit) => {
    const response = await fetch(url, {
        ...CONTENT_TYPE_APPLICATION_JSON,
        ...options,
    });
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response
}

export const setAuthorizationHeader = (request: Request): any => {
    const token = getAccessTokenFromRequest(request);
    if (token) {
        return {
            'Authorization': `Bearer ${token}`
        }
    }
    return {
        'Authorization': `Bearer ${token}`
    }
}


export const getAccessTokenFromRequest = (request: Request) => {
    const cookie = request.headers.get('cookie');
    if (!cookie) {
        return null;
    }
    const match = cookie.match(/ACCESS_TOKEN=([^;]+)/);
    return match ? match[1] : null;
}