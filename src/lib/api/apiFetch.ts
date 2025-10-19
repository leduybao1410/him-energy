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

// Enhanced API fetch with language support
export const apiFetchWithLang = async (
    url: string,
    langCode: string = 'VI',
    options: RequestInit = {}
) => {
    // Add lang_code parameter to URL
    const urlObj = new URL(url, window.location.origin);
    urlObj.searchParams.set('lang_code', langCode);

    const response = await fetch(urlObj.toString(), {
        ...CONTENT_TYPE_APPLICATION_JSON,
        ...options,
    });

    if (!response.ok) {
        throw new Error(response.statusText);
    }
    return response;
}

// Fetch products with language support
export const fetchProducts = async (
    langCode: string = 'VI',
    category?: string,
    page: number = 1,
    perPage: number = 12
) => {
    const params = new URLSearchParams({
        lang_code: langCode,
        page: page.toString(),
        per_page: perPage.toString()
    });

    if (category) {
        params.append('category', category);
    }

    const url = `/api/products?${params.toString()}`;
    const response = await apiFetch(url, { method: 'GET' });
    return response.json();
}

// Fetch single product with language support
export const fetchProduct = async (id: string, langCode: string = 'VI') => {
    const url = `/api/products/${id}?lang_code=${langCode}`;
    const response = await apiFetch(url, { method: 'GET' });
    return response.json();
}

// Fetch related products with language support
export const fetchRelatedProducts = async (id: string, langCode: string = 'VI') => {
    const url = `/api/products/${id}/related?lang_code=${langCode}`;
    const response = await apiFetch(url, { method: 'GET' });
    return response.json();
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