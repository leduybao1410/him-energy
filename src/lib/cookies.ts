/**
 * Cookie utility functions for client-side cookie management
 */

/**
 * Get a cookie value by name
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
    if (typeof document === 'undefined') return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() || null;
    }
    return null;
}

/**
 * Set a cookie with specified options
 * @param name - Cookie name
 * @param value - Cookie value
 * @param options - Cookie options
 */
export function setCookie(
    name: string,
    value: string,
    options: {
        expires?: Date;
        maxAge?: number;
        path?: string;
        domain?: string;
        secure?: boolean;
        sameSite?: 'strict' | 'lax' | 'none';
    } = {}
): void {
    if (typeof document === 'undefined') return;

    let cookieString = `${name}=${value}`;

    if (options.expires) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
    }

    if (options.maxAge) {
        cookieString += `; max-age=${options.maxAge}`;
    }

    if (options.path) {
        cookieString += `; path=${options.path}`;
    }

    if (options.domain) {
        cookieString += `; domain=${options.domain}`;
    }

    if (options.secure) {
        cookieString += `; secure`;
    }

    if (options.sameSite) {
        cookieString += `; samesite=${options.sameSite}`;
    }

    document.cookie = cookieString;
}

/**
 * Delete a cookie by name
 * @param name - Cookie name
 * @param path - Cookie path (default: '/')
 */
export function deleteCookie(name: string, path: string = '/'): void {
    setCookie(name, '', {
        expires: new Date(0),
        path: path
    });
}

/**
 * Check if cookies are enabled in the browser
 * @returns boolean indicating if cookies are enabled
 */
export function areCookiesEnabled(): boolean {
    if (typeof document === 'undefined') return false;

    try {
        const testCookie = 'test_cookie_enabled';
        setCookie(testCookie, 'test');
        const enabled = getCookie(testCookie) === 'test';
        deleteCookie(testCookie);
        return enabled;
    } catch {
        return false;
    }
}
