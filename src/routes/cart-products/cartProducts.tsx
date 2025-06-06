import Navbar from "@/components/layout/navbar/navbar.tsx";
import {useCartStore} from "@/store/cartStore.ts";
import {Button} from "@/components/ui/button.tsx";
import {Minus, Plus, Trash2} from "lucide-react";
import {useState} from "react";
import {Product} from "@/types";
import Breadcrumbs from "@/components/shared/breadcrumb/breadcrumb.tsx";
import Footer from "@/components/layout/footer/footer.tsx";
import {useTranslation} from "react-i18next";
import {useThemeStore} from "@/store/themeStore.ts";

const CartProducts = () => {
  const {t} = useTranslation();
  const {isDarkMode} = useThemeStore();
  const {incrementQuantity, decrementQuantity, removeFromCart, clearCart} = useCartStore();
  const items = useCartStore((state) => state.carts);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const totalPrice = items.reduce((acc, item) => {
    const discounted = item.price - (item.price * item.discountPercentage) / 100;
    // @ts-ignore
    return acc + discounted * item.quantity;
  }, 0).toFixed(2);

  const isSelected = (id: number) => selectedIds.includes(id);
  const toggleSelect = (id: number) => setSelectedIds(prev => isSelected(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const removeSelected = () => {
    selectedIds.forEach(id => removeFromCart(id));
    setSelectedIds([]);
  };

  return (
      <div
          className={`w-full ${isDarkMode ? "bg-[#0E1014]/70 text-white" : "bg-background/95 supports-[backdrop-filter]:bg-background/60"}`}>
        <Navbar/>

        <div className="max-w-[1440px] mx-auto w-full pt-[70px]">
          <Breadcrumbs/>

          <div className="px-4 md:px-10 mt-2 mb-8">
            <div className="flex justify-between md:items-center mb-4 flex-col md:flex-row gap-2">
              <h2 className="text-2xl md:text-4xl font-semibold">{t("In cart")} ({items.length})</h2>
              {items.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline"
                            className={`active:scale-95 cursor-pointer ${isDarkMode ? "text-white bg-black border-black hover:bg-black/70 hover:text-white duration-500" : "bg-gray-300"}`}
                            onClick={removeSelected} disabled={selectedIds.length === 0}>
                      {t("Delete selected")}
                    </Button>
                    <Button variant="destructive" className="hover:bg-red-500/90 active:scale-95 cursor-pointer"
                            onClick={clearCart}>{t("Clear cart")}</Button>
                  </div>
              )}
            </div>

            {items.length === 0 ? (<div className="text-center text-gray-500 mt-20">{t("Cart is empty")}</div>) : (
                <div className="space-y-6">
                  {items.map((item: Product) => {
                    const discountedPrice = (item.price - (item.price * item.discountPercentage) / 100).toFixed(2);
                    const outOfStock = item.stock === 0;

                    return (
                        <div key={item.id}
                             className={`border rounded-xl p-4 flex flex-col md:flex-row gap-4 shadow-sm hover:shadow-md transition ${isDarkMode ? "bg-[#0E1014]/60 border-[#0E1014]/60" : "bg-white"}`}>
                          {/*<input type="checkbox" checked={isSelected(item.id)} onChange={() => toggleSelect(item.id)} className="self-start md:self-center hidden md:block cursor-pointer"/>*/}
                          <input type="checkbox" checked={isSelected(item.id)} onChange={() => toggleSelect(item.id)}
                                 className="relative self-start md:self-center hidden md:block w-6 h-6 aspect-square !appearance-none !bg-none checked:!bg-gradient-to-tr checked:!from-slate-400 checked:!to-white bg-white border border-gray-300 shadow-sm rounded !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-slate-400 hover:!border-slate-400 cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-slate-400/30 focus-visible:border-slate-400 after:w-[35%] after:h-[53%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)] after:border-r-[0.25em] after:border-r-white after:border-b-[0.25em] after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45"/>

                          <div className="flex justify-between ">
                            <img src={item.images[0]} alt={item.title}
                                 className="w-[120px] h-[120px] object-contain rounded-md bg-gray-100"/>

                            <div className="px-4 md:hidden">
                              <h3 className="text-lg font-semibold">{item.title}</h3>
                              <div className="mt-2 text-sm text-gray-500">{item.brand}</div>
                              {outOfStock && (
                                  <div className="text-red-600 text-sm font-semibold mt-1">{t("Out of Stock")}</div>)}
                            </div>
                            <input type="checkbox" checked={isSelected(item.id)} onChange={() => toggleSelect(item.id)}
                                   className="relative self-start md:self-center md:hidden w-6 h-6 aspect-square !appearance-none !bg-none checked:!bg-gradient-to-tr checked:!from-slate-400 checked:!to-white bg-white border border-gray-300 shadow-sm rounded !outline-none !ring-0 !text-transparent !ring-offset-0 checked:!border-slate-400 hover:!border-slate-400 cursor-pointer transition-all duration-300 ease-in-out focus-visible:!outline-offset-2 focus-visible:!outline-2 focus-visible:!outline-slate-400/30 focus-visible:border-slate-400 after:w-[35%] after:h-[53%] after:absolute after:opacity-0 after:top-[40%] after:left-[50%] after:-translate-x-2/4 after:-translate-y-2/4 after:rotate-[25deg] after:drop-shadow-[1px_0.5px_1px_rgba(56,149,248,0.5)] after:border-r-[0.25em] after:border-r-white after:border-b-[0.25em] after:border-b-white after:transition-all after:duration-200 after:ease-linear checked:after:opacity-100 checked:after:rotate-45"/>
                            {/*<input type="checkbox" checked={isSelected(item.id)} onChange={() => toggleSelect(item.id)} className="self-start md:self-center md:hidden"/>*/}
                          </div>
                          <div className="flex flex-col flex-1 justify-between">
                            <div className="hidden md:block">
                              <h3 className="text-lg font-semibold">{item.title}</h3>
                              <div className="mt-2 text-sm text-gray-500">{item.brand}</div>

                              {outOfStock && (
                                  <div className="text-red-600 text-sm font-semibold mt-1">{t("Out of Stock")}</div>)}
                            </div>

                            <div className="flex justify-between items-end md:mt-4">
                              <div>
                                <p className="text-lg font-bold text-green-600">{discountedPrice} USD</p>
                                <p className="text-sm line-through text-gray-400">{item.price} USD</p>
                              </div>

                              <div className="flex items-center gap-3">
                                <Button onClick={() => decrementQuantity(item)}
                                        className="w-8 h-8 p-0 border active:scale-95 cursor-pointer"
                                        disabled={item.quantity === undefined || item.quantity <= 1}>
                                  <Minus size={16}/>
                                </Button>
                                <span>{item.quantity}</span>
                                <Button onClick={() => incrementQuantity(item)}
                                        className="w-8 h-8 p-0 border active:scale-95 cursor-pointer"
                                        disabled={item.quantity === undefined || item.quantity >= item.stock}>
                                  <Plus size={16}/>
                                </Button>
                                <Button onClick={() => removeFromCart(item.id)}
                                        className="bg-red-500 hover:bg-red-500/80 w-8 h-8 active:scale-95 cursor-pointer"
                                        variant="ghost" size="icon">
                                  <Trash2 className="text-white" size={18}/>
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                    );
                  })}
                </div>
            )}

            {items.length > 0 && (
                <div
                    className={`mt-10 md:p-4 py-4 flex flex-col md:flex-row justify-between md:items-center gap-2 ${isDarkMode ? "bg-[#0E1014]/60" : "bg-gray-50 border-t"}`}>
                  <h4 className="text-xl font-semibold">{t("Total price")}: {totalPrice} USD</h4>
                  <Button size="lg"
                          className="bg-green-600 hover:bg-green-700 text-white active:scale-95 cursor-pointer">
                    {t("Order processing")}
                  </Button>
                </div>
            )}
          </div>
        </div>

        <Footer/>
      </div>
  )
}
export default CartProducts;