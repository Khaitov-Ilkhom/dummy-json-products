import {useEffect, useState} from "react";
import {Product} from "@/types";
import {toast} from "sonner";
import {Minus, Package, Plus, Ruler} from "lucide-react";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {cn} from "@/lib/utils.ts";
import RenderRating from "@/components/shared/render-rating/renderRating.tsx";
import {useCartStore} from "@/store/cartStore.ts";
import {Button} from "@/components/ui/button.tsx";

const ProductDetails = ({product}: { product: Product }) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [_, setCount] = useState(0)
  const [quantity, setQuantity] = useState<number>(1);

  const {addToCart} = useCartStore();
  const items = useCartStore((state) => state.carts);

  useEffect(() => { 

    if (!api) return
    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      toast.error("Quantity cannot be less than 1");
    }
  };

  const handleAddToCart = (data: Product, quantityToAdd: number) => {
    const existingItem = items.find(item => item.id === data.id);
    const totalQuantity = (existingItem?.quantity || 0) + quantityToAdd;

    if (totalQuantity < data.minimumOrderQuantity) {
      toast.error(`Kamida ${data.minimumOrderQuantity} dona buyurtma berishingiz kerak`);
    } else if (totalQuantity > data.stock) {
      toast.error(`${data.stock} dan ortiq buyurtma bera olmaysiz`)
    } else {
      addToCart({...data, quantity: quantityToAdd});
      toast.success(`${data.title} savatchaga qo‘shildi`);
      setQuantity(1);
    }
  };

  return (
      <div>
        {
          <div className="max-w-[1440px] w-full mx-auto p-8">
            <div className="relative flex flex-col lg:flex-row items-start justify-center lg:space-x-10 bg-white p-8">
              <div className="flex-1 lg:order-1 text-center lg:text-left pt-6">
                <div className="mb-4">
                  <h1 className="text-4xl font-bold mb-2">{product.title}</h1>
                  <p className="text-gray-400 text-lg capitalize">{product.brand}, {product.category && product.category}</p>
                  <p>{product.tags.map((tag) => <span className="text-md">#{tag} </span>)}</p>
                </div>

                <div className="flex items-center justify-center lg:justify-start mb-2">
                  <div className="-mt-1"><RenderRating rate={product?.rating}/></div>
                  <p className="ml-2 text-sm text-gray-500">({product.id} reviews)</p>
                </div>

                <div>
                  <p>Status: {product.availabilityStatus}</p>
                </div>

                <div className="py-4 mb-2">
                  <p className="text-gray-500">{product.description}</p>
                </div>
              </div>

              <div className="relative w-full lg:w-1/3 mb-6 lg:mb-0 lg:order-2">
                <div className="w-full flex flex-col items-center">
                  <Carousel plugins={[Autoplay({delay: 2500})]} setApi={setApi} className="w-full">
                    <CarouselContent>
                      {product?.images.map((image: string, index: number) => (
                          <CarouselItem key={index} className="bg-gray-200">
                            {
                              image ? <img
                                      className="w-full h-[200px] md:h-[350px] px-4 object-contain group-hover:scale-105 transition duration-600"
                                      src={image} alt={product.title}/> :
                                  <Skeleton className="w-full h-[200px] md:h-[250px]"/>
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
              </div>

              <div className="flex-1 lg:order-3 text-center lg:text-left pt-6">
                <div className="">
                  <div className="flex mb-4 gap-2 justify-between items-center">
                    <p className="text-3xl font-semibold text-green-400">{(product.price - (product.price * product.discountPercentage) / 100).toFixed(2)} USD</p>
                    <p className="text-red-400 text-xl"><span className="line-through">{product.price}</span> USD</p>
                    <p className="rounded-2xl px-3 py-1 bg-amber-300">-{product.discountPercentage.toFixed(2)}%</p>
                  </div>

                  <div className="space-y-1.5">
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="flex gap-2"><Ruler className="rotate-[-45deg]"/>
                          <span>{product.dimensions.width} sm</span></p>
                        <p className="flex gap-1"><Ruler
                            className="rotate-[45deg] mb-2"/><span>{product.dimensions.height} sm</span></p>
                        <p className="flex gap-2"><Package/> <span>{product.dimensions.depth} </span></p>
                      </div>
                    </div>
                    <p><span className="font-semibold">Stock:</span> {product.stock}</p>
                    <p><span className="font-semibold">Minimum order quantity:</span> {product.minimumOrderQuantity}</p>
                    <p><span className="font-semibold">Return policy:</span> {product.returnPolicy}</p>
                    <p><span className="font-semibold">Shipping information:</span> {product.shippingInformation}</p>
                    <p><span className="font-semibold">Warranty information:</span> {product.warrantyInformation}</p>
                  </div>

                  <div className="w-full flex items-center justify-start my-6 select-none">
                    <div className="flex flex-col justify-start items-start w-full">
                      <div className="flex items-center gap-3 py-[5px]">
                        <Button onClick={() => handleDecrement()}
                                className="w-6 h-6 rounded-md transition-transform active:scale-90 border p-2 border-gray-400">
                          <Minus size={24}/>
                        </Button>
                        <span className="w-5 text-center">{quantity}</span>
                        <Button onClick={() => handleIncrement()}
                                disabled={!!items.find(p => p.id === product.id && (p.quantity !== undefined ? p.quantity + quantity : 0) >= product.stock || quantity >= product.stock)}
                                className="w-6 h-6 rounded-md transition-transform active:scale-90 border p-2 border-gray-400">
                          <Plus size={24}/>
                        </Button>
                      </div>
                    </div>

                    <Button
                        onClick={() => {
                          handleAddToCart(product, quantity)
                        }}
                        className="rounded-lg text-md py-1 border">+
                      Add to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
  )
}
export default ProductDetails