import Products from "@/components/layout/product-card/product-card.tsx";
import {Product} from "@/types";
import {useGetAllProduct} from "@/hooks/useDummJsonHook.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import Navbar from "@/components/layout/navbar/navbar.tsx";
import Breadcrumbs from "@/components/shared/breadcrumb/breadcrumb.tsx";
import HeroCarousel from "@/components/layout/hero-carousel/hero-carousel.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useTranslation} from "react-i18next";
import {useThemeStore} from "@/store/themeStore.ts";
import Categories from "@/components/layout/categories/categories.tsx";

const Home = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const [limit, setLimit] = useState(15);

  const {products, productLoading}: { products: Product[], productLoading: boolean } = useGetAllProduct()

  return (
      <div className={`w-full ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"}`}>
        <Navbar/>

        <div className="max-w-[1440px] mx-auto pt-[70px]">
          <Breadcrumbs/>

          <HeroCarousel/>

          <Categories/>

          <div>
            <div className="w-full text-center">
              <h2 className="text-2xl md:text-4xl font-semibold">{t("All Products")}</h2>
            </div>

            <div
                className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 p-4 md:px-10">
              {
                productLoading ? Array.from({length: 10}).map((_, i) => (
                    <div key={i} className="flex flex-col space-y-3">
                      <Skeleton className="h-[250px] w-full rounded-xl"/>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[240px]"/>
                        <Skeleton className="h-4 w-[200px]"/>
                        <Skeleton className="h-4 w-[200px]"/>
                        <Skeleton className="h-4 w-[200px]"/>
                      </div>
                    </div>
                )) : products.slice(0, limit).map(product => (
                    <Products key={product.id} product={product}/>))
              }
            </div>

            <div className="w-full flex justify-center items-center mb-5">
              <Button disabled={products.length <= limit} onClick={() => setLimit(limit + 10)}
                      className="px-10 py-2 font-semibold cursor-pointer active:scale-95">{t("Show more 10")}</Button>
            </div>
          </div>
        </div>

        <Footer/>
      </div>
  )
}
export default Home