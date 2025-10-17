import { authRoute } from "./server-auth-route";
import { serverImagesRoute } from "./server-images-route";
import { serverProductsRoute } from "./server-products-route";

export const serverRouteMap = {
    auth: authRoute,
    products: serverProductsRoute,
    images: serverImagesRoute,
}