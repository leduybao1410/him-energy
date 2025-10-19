import { HOST, Method, PREFIX_AUTH } from "../utils";

export const serverAuthRoute = {
    login: {
        url: `${HOST}${PREFIX_AUTH}/token`,
        method: Method.POST,
    },
    validateToken: {
        url: `${HOST}${PREFIX_AUTH}/token/validate`,
        method: Method.POST,
    },
}