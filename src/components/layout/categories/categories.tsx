import beauty from "@/assets/images/beauty.jpeg"
import fragrances from "@/assets/images/fragrances.jpg"
import furniture from "@/assets/images/furniture.jpg"
import groceries from "@/assets/images/groceries.jpg"
import home from "@/assets/images/home-decoration.webp"
import kitchen from "@/assets/images/kitchen-accessories.jpg"
import laptops from "@/assets/images/laptops.png"
import shirts from "@/assets/images/mens-shirts.jpg"
import mensShoes from "@/assets/images/mens-shoes.jpeg"
import mensWatches from "@/assets/images/mens-watches.jpg"
import mobile from "@/assets/images/mobile-accessories.jpeg"
import motorcycle from "@/assets/images/motorcycle.jpg"
import skin from "@/assets/images/skin-care.jpg"
import smartphone from "@/assets/images/smartphones.jpg"
import sports from "@/assets/images/sports-accessories.jpg"
import sunglasses from "@/assets/images/sunglasses.webp"
import tablets from "@/assets/images/tablets.jpeg"
import tops from "@/assets/images/tops.jpg"
import vehicle from "@/assets/images/vehicle.jpeg"
import womenBugs from "@/assets/images/womens-bags.jpg"
import womenDresses from "@/assets/images/womens-dresses.jpg"
import jewellery from "@/assets/images/jewelry-styling.jpg"
import womenShoes from "@/assets/images/shoes.jpg"
import womenWatches from "@/assets/images/watches.jpg"

const images = [
  {
    name: "beauty",
    image: beauty
  },
  {
    name: "fragrances",
    image: fragrances
  },
  {
    name: "furniture",
    image: furniture
  },
  {
    name: "groceries",
    image: groceries
  },
  {
    name: "home-decoration",
    image: home
  },
  {
    name: "kitchen-accessories",
    image: kitchen
  },
  {
    name: "laptops",
    image: laptops
  },
  {
    name: "mens-shirts",
    image: shirts
  },
  {
    name: "mens-shoes",
    image: mensShoes
  },
  {
    name: "mens-watches",
    image: mensWatches
  },
  {
    name: "mobile-accessories",
    image: mobile
  },
  {
    name: "motorcycle",
    image: motorcycle
  },
  {
    name: "skin-care",
    image: skin
  },
  {
    name: "smartphones",
    image: smartphone
  },
  {
    name: "sports-accessories",
    image: sports
  },
  {
    name: "sunglasses",
    image: sunglasses
  },
  {
    name: "tablets",
    image: tablets
  },
  {
    name: "tops",
    image: tops
  },
  {
    name: "vehicle",
    image: vehicle
  },
  {
    name: "womens-bags",
    image: womenBugs
  },
  {
    name: "womens-dresses",
    image: womenDresses
  },
  {
    name: "womens-jewellery",
    image: jewellery
  },
  {
    name: "womens-shoes",
    image: womenShoes
  },
  {
    name: "womens-watches",
    image: womenWatches
  }
]

import {useGetAllCategories} from "@/hooks/useDummJsonHook.ts";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {ArrowDown, ArrowUp} from "lucide-react";
import ContentLoader from "@/components/shared/loading/content-loader.tsx";
import {useNavigate} from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate()
  const [limit, setLimit] = useState(false);
  const {categories, categoriesLoading} = useGetAllCategories()

  const combinedCategories: { name: string; slug: string; image: string; url: string }[] = categories.map((category: {
    name: string; slug: string; url: string;
  }) => {
    const image = images.find((image) => image.name === category.slug)
    return {
      ...category, image: image?.image
    }
  })

  return (
      <>
        {
          categoriesLoading ? <ContentLoader/> : <div className="max-w-[1400px] mx-auto w-full">
            <h4 className="p-4  text-2xl md:text-4xl font-semibold">Categories</h4>

            <div className="w-full mx-auto flex flex-wrap items-center gap-4 px-3 md:px-0">
              {
                combinedCategories.slice(0, limit ? 30 : 10).map((category) => (
                    <div key={category.name} onClick={() => navigate(`/categories/${category.slug}`)}>
                      <div
                          className="w-27 h-27 md:w-31 md:h-31 group rounded-full border-2 border-gray-400 flex justify-center items-center overflow-hidden cursor-pointer">
                        <img
                            className="w-full h-full p-1 object-cover rounded-full group-hover:scale-110 duration-500"
                            src={category.image} alt={category.name}/>
                      </div>

                      <div className="w-full flex justify-center items-center pt-2">
                        <p className="font-semibold text-sm">{category.name.length >= 12 ? `${category.name.slice(0, 12)}...` : category.name}</p>
                      </div>
                    </div>
                ))
              }
            </div>

            <div className="flex justify-end items-center py-4">
              <Button className="px-3 h-8" onClick={() => setLimit((s) => !s)}>{limit ?
                  <span className="flex justify-center items-center gap-2">Less <ArrowUp/></span> :
                  <span className="flex justify-center items-center gap-2">See more <ArrowDown/></span>}</Button>
            </div>
          </div>
        }
      </>
  )
}

export default Categories
