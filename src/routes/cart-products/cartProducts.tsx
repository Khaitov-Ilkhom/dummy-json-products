import Navbar from "@/components/layout/navbar/navbar.tsx";
import {useCartStore} from "@/store/cartStore.ts";
import {Carousel, CarouselApi, CarouselContent, CarouselItem} from "@/components/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay";
import {Skeleton} from "@/components/ui/skeleton.tsx";
import {cn} from "@/lib/utils.ts";
import {useEffect, useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {Minus, Plus} from "lucide-react";
import {Product} from "@/types";

const CartProducts = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [_, setCount] = useState(0)

  const {incrementQuantity, decrementQuantity, removeFromCart, clearCart} = useCartStore();
  const items = useCartStore((state) => state.carts);

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const handleIncrement = (p: Product) => {
    incrementQuantity(p)
  };

  const handleDecrement = (p: Product) => {
   decrementQuantity(p)
  };

  return (
      <div className="max-w-[1440px] mx-auto w-full">
        <Navbar/>
        <div className="mt-[60px] px-6">
          <div className="w-full flex justify-between items-center">
            <h3 className="text-4xl font-semibold pt-2">Your cart, {items.length} items</h3>
            <div>
              <Button onClick={clearCart}>Clear cart</Button>
            </div>
          </div>

          <div>
            <div>
              <input type="checkbox" placeholder="Check all"/>
              <p>Yetkazib berish
                sanasi {new Date().getDate() + 1} {new Date().toLocaleString('default', {month: 'long'})}</p>
            </div>
            <div>
              {
                items.map(item => (
                    <div>
                      <div>
                        <input type="checkbox"/>
                      </div>
                      <div className="w-full max-w-[160px] flex flex-col items-center">
                        <Carousel plugins={[Autoplay({delay: 2500})]} setApi={setApi} className="w-full">
                          <CarouselContent>
                            {item?.images.map((image: string, index: number) => (
                                <CarouselItem key={index} className="bg-gray-200 flex justify-center">
                                  {
                                    image ? <img
                                            className="w-full max-w-[150px] object-contain group-hover:scale-105 transition duration-600"
                                            src={image} alt={item.title}/> :
                                        <Skeleton className="w-full h-[200px] md:h-[250px]"/>
                                  }
                                </CarouselItem>
                            ))}
                          </CarouselContent>
                        </Carousel>

                        <div className="flex gap-1 mt-2">
                          {Array.from({length: item.images.length}).map((_, index) => (
                              <button
                                  key={index}
                                  className={cn("h-2 w-2 rounded-full transition-colors", current === index ? "bg-primary" : "bg-muted")}
                                  onClick={() => api?.scrollTo(index)}
                                  aria-label={`Go to slide ${index + 1}`}
                              />
                          ))}
                        </div>
                      </div>
                      <div>{item.quantity}</div>
                      <div className="flex items-center gap-3 py-[5px]">
                        <Button onClick={() => handleDecrement(item)}
                                className="w-6 h-6 rounded-md transition-transform active:scale-90 border p-2 border-gray-400">
                          <Minus size={24}/>
                        </Button>
                        <span className="w-5 text-center">{item.quantity}</span>
                        <Button onClick={() => handleIncrement(item)}
                                disabled={!!items.find(p => p.id === item.id && p.quantity === item.stock)}
                                className="w-6 h-6 rounded-md transition-transform active:scale-90 border p-2 border-gray-400">
                          <Plus size={24}/>
                        </Button>
                      </div>
                      <div>
                        <div>
                          <Button onClick={() => removeFromCart(item.id)}>Remove</Button>
                        </div>
                        <div>
                          <p>{(item.price - (item.price * item.discountPercentage) / 100).toFixed(2)} USD</p>
                          <p>{item.price} USD</p>
                        </div>
                      </div>
                    </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
  )
}
export default CartProducts
