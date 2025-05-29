import {useParams} from "react-router-dom";
import {useGetProducts} from "@/hooks/useDummJsonHook.ts";
import Navbar from "@/components/layout/navbar/navbar.tsx";
import ProductDetails from "@/components/layout/detail/productDetails.tsx";
import Loading from "@/components/shared/loading/loading.tsx";
import Breadcrumbs from "@/components/shared/breadcrumb/breadcrumb.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useThemeStore} from "@/store/themeStore.ts";

const ProductDetail = () => {
  const {id} = useParams();
  const {isDarkMode} = useThemeStore();
  const {product, productLoading} = useGetProducts(id)

  return (
      <div  className={`w-full ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"}`}>
        <Navbar/>

        <div className="max-w-[1440px] mx-auto w-full pt-[70px]">
          <Breadcrumbs/>

          <div className="w-full">
            {productLoading ? <Loading/> : <ProductDetails product={product}/>}
          </div>
        </div>

        <Footer/>
      </div>
  )
}
export default ProductDetail
