import {useRoutes} from "react-router-dom";
import {lazy} from "react";
import {SuspenseElement as Suspense} from "@/components/layout/loading/loading.tsx";

const Home = lazy(() => import("../routes/home/home.tsx"))
const LikedProducts = lazy(() => import("../routes/liked-products/likedProducts.tsx"))
const CartProducts = lazy(() => import("../routes/cart-products/cartProducts.tsx"))
const ProductDetail = lazy(() => import("../routes/product-detail/productDetail.tsx"))

const RouteController = () => {
  return (
      useRoutes([
        {
          path: "",
          element: <Suspense><Home/></Suspense>
        },
        {
          path: "liked-products",
          element: <Suspense><LikedProducts/></Suspense>
        },
        {
          path: "cart-products",
          element: <Suspense><CartProducts/></Suspense>
        },
        {
          path: "product-detail/:id",
          element: <Suspense><ProductDetail/></Suspense>
        }
      ])
  )
}
export default RouteController
