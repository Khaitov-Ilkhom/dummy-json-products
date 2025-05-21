import Navbar from "@/components/layout/navbar/navbar.tsx";
import {useLikeStore} from "@/store/likeStore.ts";
import Products from "@/components/layout/product-card/product-card.tsx";
import Breadcrumbs from "@/components/shared/breadcrumb/breadcrumb.tsx";

const LikedProducts = () => {
  const likedItems = useLikeStore((state) => state.likedItems);

  return (
      <div className="w-full">
        <Navbar/>

        <div className="max-w-[1440px] mx-auto w-full mt-[70px]">
          <Breadcrumbs/>

          <div
              className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-4 p-4 md:px-10">
            {
              likedItems.map((product) => (
                  <Products key={product.id} product={product}/>
              ))
            }
          </div>
        </div>
      </div>
  )
}
export default LikedProducts
