import logoDark from "../../../assets/images/logoDark.png"
import logoLight from "../../../assets/images/logoLight.png"
import {Link, NavLink, useNavigate} from "react-router-dom";
import {Heart, Menu, ShoppingCart} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import ThemeToggle from "@/components/shared/themeToggle/themeToggle.tsx";
import {useThemeStore} from "@/store/themeStore.ts";
import Language from "@/components/shared/language/language.tsx";
import {Input} from "@/components/ui/input.tsx";
import {Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle} from "@/components/ui/sheet.tsx";
import {useLikeStore} from "@/store/likeStore.ts";
import {useCartStore} from "@/store/cartStore.ts";
import {useTranslation} from "react-i18next";

const Navbar = () => {
  const {t} = useTranslation();
  const navigate = useNavigate();
  const {isDarkMode} = useThemeStore();
  const [open, setOpen] = useState(false);
  const likedItems = useLikeStore((state) => state.likedItems);
  const items = useCartStore((state) => state.carts);

  const handleClose = () => {
    setOpen(false);
  }

  return (
      <nav
          className={`fixed top-0 w-full mx-auto ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"} backdrop-blur shadow-xl z-10`}>
        <div className="max-w-[1440px] mx-auto w-full h-[60px] flex justify-between items-center gap-2 md:gap-4 px-4">
          <div className="md:flex gap-6 md:gap-10">
            <div className="max-w-[200px] hidden md:flex">
              <Link to="/"><img className="w-full" src={isDarkMode ? logoDark : logoLight} alt="Logo"/></Link>
            </div>
            <Button className="md:hidden border border-gray-500" onClick={() => setOpen(true)}> <Menu/></Button>
          </div>

          <div className="max-w-[450px] w-full">
            <Input type="text" placeholder={t("Search")}/>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div className="hidden md:flex">
              <Button variant="default" size="icon" onClick={() => navigate("/liked-products")}
                      className={`relative border border-gray-500 ${isDarkMode ? "bg-black" : "border-gray-500"}`}>
                <Heart className="w-5 h-5"/>
                <Badge className={`absolute w-5.5 h-5.5 -top-2 -right-2 z-20 bg-transparent font-extrabold text-white rounded-full ${likedItems.length > 0 ? "bg-red-500" : "opacity-0"}`}>{likedItems.length}</Badge>
              </Button>
            </div>
            <div className="hidden md:flex">
              <Button variant="default" size="icon" onClick={() => navigate("/cart-products")}
                      className={`relative border border-gray-500 ${isDarkMode ? "bg-black" : "border-gray-500"}`}>
                <ShoppingCart className="w-5 h-5"/>
                <Badge className={`absolute w-5.5 h-5.5 -top-2 -right-2 z-20 bg-transparent font-extrabold text-white rounded-full ${items.length > 0 ? "bg-red-500" : "opacity-0"}`}>{items.length}</Badge>
              </Button>
            </div>
            <div className="-mb-1">
              <ThemeToggle/>
            </div>
            <div>
              <Language/>
            </div>
          </div>
        </div>

        <Sheet open={open} onOpenChange={handleClose}>
          <SheetContent className={isDarkMode ? "bg-[#0E1014]" : ""}>
            <SheetHeader>
              <SheetTitle>
                <div className="max-w-[200px]">
                  <Link to="/"><img className="w-full" src={isDarkMode ? logoDark : logoLight} alt="Logo"/></Link>
                </div>
              </SheetTitle>
              <SheetDescription>
                <div className="w-full mx-auto flex flex-col items-center font-semibold text-lg space-y-2 mt-4">
                  {[
                    {to: "/liked-products", label: "Liked-Products"},
                    {to: "/cart-products", label: "Cart-Products"},
                    {to: "/product-detail", label: "Product-Detail"},
                  ].map(({to, label}) => (
                      <NavLink
                          key={to}
                          to={to}
                          className={({isActive}) =>
                              `text-xl relative group transition-all duration-200 ${
                                  isDarkMode
                                      ? isActive
                                          ? "text-white border-b border-white"
                                          : "text-white hover:text-gray-300"
                                      : isActive
                                          ? "text-[#505F98] border-b border-[#505F98]"
                                          : "text-slate-900 hover:text-[#505F98]"
                              }`
                          }
                      >
                        {label}
                        <span
                            className={`absolute bottom-0.1 left-1/2 transform -translate-x-1/2 block h-[1px] w-0 group-hover:w-full transition-all duration-200 ${
                                isDarkMode ? "bg-white" : "bg-[#505F98]"
                            }`}
                        ></span>
                      </NavLink>
                  ))}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
  )
}
export default Navbar
