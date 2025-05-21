import Products from "@/components/layout/product-card/product-card.tsx";
import {Product} from "@/types";
import {useGetAllProduct} from "@/hooks/useDummJsonHook.ts";
import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import Navbar from "@/components/layout/navbar/navbar.tsx";
import Breadcrumbs from "@/components/shared/breadcrumb/breadcrumb.tsx";
import HeroCarousel from "@/components/layout/hero-carousel/hero-carousel.tsx";

const Home = () => {
  const [limit, setLimit] = useState(10);

  const {products, productLoading}: { products: Product[], productLoading: boolean } = useGetAllProduct()

  return (
      <div className="w-full ">
        <Navbar/>

        <div className="max-w-[1440px] mx-auto mt-[70px]">
          <Breadcrumbs/>

          <HeroCarousel/>

          <div>
            <div className="w-full text-center">
              <h2 className="text-4xl font-semibold">All Products</h2>
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

            <div className="w-full flex justify-center items-center">
              <Button disabled={products.length <= limit} onClick={() => setLimit(limit + 10)}
                      className="px-10 py-2 font-semibold">Show more 10</Button>
            </div>
          </div>
        </div>
      </div>
  )
}
export default Home
