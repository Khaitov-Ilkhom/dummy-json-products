import {Navigate, useRoutes} from "react-router-dom";
import {lazy} from "react";
import {SuspenseElement as Suspense} from "@/components/shared/loading/loading.tsx";

const Home = lazy(() => import("../routes/home/home.tsx"))
const LikedProducts = lazy(() => import("../routes/liked-products/likedProducts.tsx"))
const CartProducts = lazy(() => import("../routes/cart-products/cartProducts.tsx"))
const ProductDetail = lazy(() => import("../routes/product-detail/productDetail.tsx"))
const Categories = lazy(() => import("../routes/categories/categories.tsx"))
const NotFound = lazy(() => import("../routes/not-found/not-found.tsx"))

const RouteController = () => {
  return (
      useRoutes([
        {
          path: "/",
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
        },
        {
          path: "categories/:id",
          element: <Suspense><Categories/></Suspense>
        },
        {
          path: "notfound",
          element: <Suspense><NotFound/></Suspense>
        },
        {
          path: "*",
          element: <Navigate to="/notfound" replace />
        },
      ])
  )
}
export default RouteController
