import Navbar from "@/components/layout/navbar/navbar.tsx";
import {useLikeStore} from "@/store/likeStore.ts";
import Products from "@/components/layout/product-card/product-card.tsx";
import Breadcrumbs from "@/components/shared/breadcrumb/breadcrumb.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useTranslation} from "react-i18next";
import {useThemeStore} from "@/store/themeStore.ts";

const LikedProducts = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const likedItems = useLikeStore((state) => state.likedItems);

  return (
      <div className={`w-full ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"}`}>
        <Navbar/>

        <div className="max-w-[1440px] mx-auto w-full pt-[70px]">
          <Breadcrumbs/>

          {
            likedItems.length > 0 ?  <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 p-4 md:px-10 mb-6">
              {
                likedItems.map((product) => (
                    <Products key={product.id} product={product}/>
                ))
              }
            </div> :
                <div className="w-full min-h-[350px] flex justify-center items-center">
                  <h2 className="text-4xl font-semibold">{t("Liked products is empty")}</h2>
                </div>
          }
        </div>

        <Footer/>
      </div>
  )
}
export default LikedProducts
