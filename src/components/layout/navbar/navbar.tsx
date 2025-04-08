import logoDark from "../../../assets/images/logoDark.png"
import logoLight from "../../../assets/images/logoLight.png"
import {Link, useNavigate} from "react-router-dom";
import {Heart, ShoppingCart} from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import ThemeToggle from "@/components/shared/themeToggle/themeToggle.tsx";
import {useThemeStore} from "@/store/themeStore.ts";
import Language from "@/components/shared/language/language.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const {isDarkMode} = useThemeStore();
  const [count] = useState(0);

  return (
      <nav
          className={`fixed top-0 max-w-[1440px] w-full mx-auto ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"} backdrop-blur shadow-xl z-10`}>
        <div className="w-full h-[60px] flex justify-between items-center gap-4 px-4">
          <div className="max-w-[200px]">
            <Link to="/"><img className="w-full" src={isDarkMode ? logoDark : logoLight} alt="Logo"/></Link>
          </div>
          <div>
            <input type="text" placeholder="Search"/>
          </div>
          <div className="flex justify-between items-center gap-2">
            <div>
              <Button variant="default" size="icon" onClick={() => navigate("/liked-products")}
                      className={`relative overflow-hidden border border-gray-500 ${isDarkMode ? "bg-black" : "border-gray-500"}`}>
                <Heart className={`w-5 h-5 ${count > 0 ? "text-red-500 fill-red-500" : ""}`}/>
                <Badge
                    className={`absolute w-5.5 h-5.5 -top-2 -right-2 z-20 bg-transparent font-extrabold text-white rounded-full ${count > 0 ? "bg-red-500" : "opacity-0"}`}>{count}</Badge>
              </Button>
            </div>
            <div>
              <Button variant="default" size="icon" onClick={() => navigate("cart-products")}
                      className={`relative overflow-hidden border border-gray-500 ${isDarkMode ? "bg-black" : "border-gray-500"}`}>
                <ShoppingCart className="w-5 h-5"/>
                <Badge
                    className={`absolute w-5.5 h-5.5 -top-2 -right-2 z-20 bg-transparent font-extrabold text-white rounded-full ${count > 0 ? "bg-red-500" : "opacity-0"}`}>{count}</Badge>
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
      </nav>
  )
}
export default Navbar
