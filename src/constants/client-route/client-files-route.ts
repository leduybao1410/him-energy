import { Method } from "../utils";

export const ClientFilesRoute = {
    list: {
        url: '/api/files',
        method: Method.GET,
    },
    create: {
        url: '/api/files',
        method: Method.POST,
    },
    delete: {
        url: (id: string) => `/api/files/${id}`,
        method: Method.DELETE,
    },
}
