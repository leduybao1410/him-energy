import { Method, PREFIX_API, HOST, PREFIX_WP } from "../utils";

export const serverImagesRoute = {
    get: {
        url: (id: string) => `${HOST}${PREFIX_WP}/media/${id}`,
        method: Method.GET,
    },
    list: {
        url: `${HOST}${PREFIX_WP}/media`,
        method: Method.GET,
    },
    create: {
        url: `${HOST}${PREFIX_WP}/media`,
        method: Method.POST,
    },
    delete: {
        url: (id: string) => `${HOST}${PREFIX_WP}/media/${id}?force=true`,
        method: Method.DELETE,
    },
}