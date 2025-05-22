import {Product} from "@/types";
import Autoplay from "embla-carousel-autoplay"
import {Card, CardContent, CardTitle} from "@/components/ui/card.tsx";
import {
  Carousel, CarouselApi,
  CarouselContent, CarouselItem,
} from "@/components/ui/carousel.tsx";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";
import RenderRating from "@/components/shared/render-rating/renderRating.tsx";
import {Heart} from "lucide-react";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {toast} from "sonner";
import {useLikeStore} from "@/store/likeStore.ts";
import {useNavigate} from "react-router-dom";

const Products = ({product}: { product: Product }) => {
  const navigate = useNavigate();
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [_, setCount] = useState(0)
  const {toggleLike, isLiked} = useLikeStore();
  const liked = isLiked(product.id);

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const likedProduct = (p: Product) => {
    toggleLike(p)
    if (liked) {
      toast.warning(`${product.title} remove to like`)
    } else {
      toast.success(`${product.title} add to like`)
    }
  }

  return (
      <Card
          className="border border-gray-300 hover:shadow-lg duration-500 py-0 overflow-hidden gap-2 relative group hover:bg-gray-100/50">
        <div className="absolute top-2 right-4 w-[30px] z-5">
          <button className="cursor-pointer p-2 bg-white/40 rounded-full" onClick={() => likedProduct(product)}>{
            liked ? <Heart className="text-red-500 fill-red-500"/> : <Heart className="text-gray-500"/>}</button>
        </div>
        <div className="w-full flex flex-col items-center">
          <Carousel plugins={[Autoplay({delay: 2500})]} setApi={setApi} className="w-full">
            <CarouselContent>
              {product.images.map((image, index) => (
                  <CarouselItem onClick={() => navigate(`/product-detail/${product.id}`)} key={index}
                                className="bg-gray-200 cursor-pointer">
                    {
                      image ? <img
                          className="w-full h-[200px] md:h-[250px] object-contain group-hover:scale-105 transition duration-600 px-4"
                          src={image} alt={product.title}/> : <Skeleton className="w-full h-[200px] md:h-[250px]"/>
                    }
                  </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex gap-1 mt-2">
            {Array.from({length: product.images.length}).map((_, index) => (
                <button
                    key={index}
                    className={cn("h-2 w-2 rounded-full transition-colors", current === index ? "bg-primary" : "bg-muted")}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                />
            ))}
          </div>
        </div>

        <CardContent className="md:pb-4 pb-2 md:px-4 px-2">
          <CardTitle className="line-clamp-1 font-semibold text-lg text-slate-700">{product.title}</CardTitle>
          <p className="capitalize md:text-md text-sm">#{product.category}</p>
          <div className="text-md flex flex-col md:flex-row justify-between">
            <p className="flex gap-2 items-end">
              <span
                  className="text-md font-semibold text-green-500">${(product.price - (product.price * product.discountPercentage) / 100).toFixed(1)}</span>
              <span className="line-through text-sm text-red-500"> ${product.price}</span>
            </p>

            <RenderRating rate={product.rating}/>
          </div>
          <p className="w-full flex flex-col md:flex-row justify-between"><span
              className="hidden md:flex">Status: {product.availabilityStatus}</span> <span>Stock: {product.stock}</span>
          </p>
        </CardContent>
      </Card>
  )
}
export default Products
