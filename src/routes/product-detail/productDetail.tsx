import {useParams} from "react-router-dom";
import {useGetProducts} from "@/hooks/useDummJsonHook.ts";
import Navbar from "@/components/layout/navbar/navbar.tsx";
import ProductDetails from "@/components/layout/detail/productDetails.tsx";
import Loading from "@/components/layout/loading/loading.tsx";

const ProductDetail = () => {
  const {id} = useParams();
  const {product, productLoading} = useGetProducts(id)

  return (
      <div className="w-full max-w-[1440px] mx-auto">
        <Navbar/>

        <div className="w-full mt-[60px]">
          {productLoading ? <Loading/> : <ProductDetails product={product} />}
        </div>
      </div>
  )
}
export default ProductDetail
