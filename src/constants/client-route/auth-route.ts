import { Method } from "../utils";

export const authRoute = {
    login: {
        url: '/api/auth/login',
        method: Method.POST,
    },
    validateToken: {
        url: '/api/auth/validate',
        method: Method.POST,
    },
}