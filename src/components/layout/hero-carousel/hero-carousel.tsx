import banner_one from "@/assets/images/banner_one.jpg";
import banner_two from "@/assets/images/banner_two.jpg";
import banner_three from "@/assets/images/banner_three.jpg";
import banner_four from "@/assets/images/banner_four.jpg";
import banner_five from "@/assets/images/banner_five.jpg";
import banner_six from "@/assets/images/banner_six.jpg";
import banner_seven from "@/assets/images/banner_seven.jpg";
import banner_eight from "@/assets/images/banner_eight.jpg";
import banner_nine from "@/assets/images/banner_nine.jpg";
import banner_ten from "@/assets/images/banner_ten.jpg";

import {
  Carousel, CarouselApi,
  CarouselContent, CarouselItem,
  CarouselNext, CarouselPrevious
} from "@/components/ui/carousel.tsx";
import Autoplay from "embla-carousel-autoplay"
import {cn} from "@/lib/utils.ts";
import {useEffect, useState} from "react";

const images = [banner_three, banner_one, banner_two, banner_four, banner_five, banner_six, banner_seven, banner_eight, banner_nine, banner_ten]

const HeroCarousel = () => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [_, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  return (
      <div className="m-4">
        <Carousel setApi={setApi} plugins={[Autoplay({delay: 2500})]} className="w-full rounded-xl overflow-hidden relative">
          <CarouselContent>
            {
              images.map((img, index) => (
                  <CarouselItem className="w-full max-w-[1440px] mx-auto" key={index}>
                    <img className="w-full rounded-xl" src={img} alt="Banner image"/>
                  </CarouselItem>
              ))}
          </CarouselContent>
          <div className="absolute inset-y-0 left-0 right-0 z-2 mx-14 pointer-events-none">
            <div className="pointer-events-auto">
              <CarouselPrevious />
            </div>
            <div className="pointer-events-auto">
              <CarouselNext />
            </div>
          </div>
        </Carousel>

        <div className="w-full flex justify-center gap-1 md:mt-4 mt-2">
          {Array.from({length: images.length}).map((_, index) => (
              <button
                  key={index}
                  className={cn("h-3 w-3 rounded-full transition-colors", current === index ? "bg-primary" : "bg-muted")}
                  onClick={() => api?.scrollTo(index)}
                  aria-label={`Go to slide ${index + 1}`}
              />
          ))}
        </div>
      </div>
  )
}
export default HeroCarousel