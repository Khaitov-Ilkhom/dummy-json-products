import {useGetByCategory} from "@/hooks/useDummJsonHook.ts";
import {useParams} from "react-router-dom";
import Loading from "@/components/shared/loading/loading.tsx";
import Navbar from "@/components/layout/navbar/navbar.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useThemeStore} from "@/store/themeStore.ts";
import Breadcrumbs from "@/components/shared/breadcrumb/breadcrumb.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import Products from "@/components/layout/product-card/product-card.tsx";
import {useTranslation} from "react-i18next";

const Categories = () => {
  const {id} = useParams();
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const category = id || ""

  const {products, categoriesLoading} = useGetByCategory(category)

  if (categoriesLoading) return  <Loading/>

  return (
      <div className={`w-full ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"}`}>
        <Navbar/>

        <div className="max-w-[1400px] mx-auto w-full pt-[70px]">
          <Breadcrumbs/>

          <div className="w-full text-center">
            <h2 className="text-4xl font-semibold">{t("All Products")}</h2>
          </div>

          <div
              className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 p-4 md:px-10 mb-4">
            {
              categoriesLoading ? Array.from({length: 10}).map((_, i) => (
                  <div key={i} className="flex flex-col space-y-3">
                    <Skeleton className="h-[250px] w-full rounded-xl"/>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[240px]"/>
                      <Skeleton className="h-4 w-[200px]"/>
                      <Skeleton className="h-4 w-[200px]"/>
                      <Skeleton className="h-4 w-[200px]"/>
                    </div>
                  </div>
              )) : products.map((product: any) => (
                  <Products key={product.id} product={product}/>))
            }
          </div>
        </div>

        <Footer/>
      </div>
  )
}
export default Categories
