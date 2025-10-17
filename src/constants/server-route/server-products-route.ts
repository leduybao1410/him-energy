import { Method, PREFIX_API, HOST } from "../utils";

export const serverProductsRoute = {
    get: {
        url: (id: string) => `${HOST}${PREFIX_API}/products/${id}`,
        method: Method.GET,
    },
    list: {
        url: `${HOST}${PREFIX_API}/products`,
        method: Method.GET,
    },
    create: {
        url: `${HOST}${PREFIX_API}/products`,
        method: Method.POST,
    },
    update: {
        url: (id: string) => `${HOST}${PREFIX_API}/products/${id}`,
        method: Method.PUT,
    },
    delete: {
        url: (id: string) => `${HOST}${PREFIX_API}/products/${id}`,
        method: Method.DELETE,
    },
}