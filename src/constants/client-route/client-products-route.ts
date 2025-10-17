import { Method } from "../utils";

export const ClientProductsRoute = {
    list: {
        url: '/api/products',
        method: Method.GET,
    },
    create: {
        url: '/api/products',
        method: Method.POST,
    },
    update: {
        url: (id: string) => `/api/products/${id}`,
        method: Method.PUT,
    },
    delete: {
        url: (id: string) => `/api/products/${id}`,
        method: Method.DELETE,
    },
}