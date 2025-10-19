import { authRoute } from "./auth-route";
import { ClientImagesRoute } from "./client-images-route";
import { ClientProductsRoute } from "./client-products-route";
import { ClientFilesRoute } from "./client-files-route";

export const ClientRouteMap = {
    auth: authRoute,
    products: ClientProductsRoute,
    images: ClientImagesRoute,
    files: ClientFilesRoute,
}