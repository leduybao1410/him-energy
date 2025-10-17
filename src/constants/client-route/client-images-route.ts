import { Method } from "../utils";

export const ClientImagesRoute = {
    list: {
        url: '/api/images',
        method: Method.GET,
    },
    create: {
        url: '/api/images',
        method: Method.POST,
    },
    delete: {
        url: (id: string) => `/api/images/${id}`,
        method: Method.DELETE,
    },
}