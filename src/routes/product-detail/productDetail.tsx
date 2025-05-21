import {useParams} from "react-router-dom";
import {useGetProducts} from "@/hooks/useDummJsonHook.ts";
import Navbar from "@/components/layout/navbar/navbar.tsx";
import ProductDetails from "@/components/layout/detail/productDetails.tsx";
import Loading from "@/components/shared/loading/loading.tsx";
import Breadcrumbs from "@/components/shared/breadcrumb/breadcrumb.tsx";

const ProductDetail = () => {
  const {id} = useParams();
  const {product, productLoading} = useGetProducts(id)

  return (
      <div className="w-full">
        <Navbar/>

        <div className="max-w-[1440px] mx-auto w-full">
          <div className="mt-[70px]">
            <Breadcrumbs/>
          </div>

          <div className="w-full">
            {productLoading ? <Loading/> : <ProductDetails product={product} />}
          </div>
        </div>
      </div>
  )
}
export default ProductDetail
