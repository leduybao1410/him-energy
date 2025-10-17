export const PREFIX_API = '/wp-json/custom/v1';
export const PREFIX_AUTH = '/wp-json/jwt-auth/v1';
export const PREFIX_WP = '/wp-json/wp/v2';

export const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
}

export const HOST = process.env.NEXT_PUBLIC_API_URL || 'https://leduybao.io.vn';