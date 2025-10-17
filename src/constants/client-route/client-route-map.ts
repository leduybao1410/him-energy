import { authRoute } from "./auth-route";
import { ClientImagesRoute } from "./client-images-route";
import { ClientProductsRoute } from "./client-products-route";

export const ClientRouteMap = {
    auth: authRoute,
    products: ClientProductsRoute,
    images: ClientImagesRoute,
}