import { create } from "zustand";
import {combine, persist} from "zustand/middleware";
import {Product} from "@/types";
import {toast} from "sonner";

export const useCartStore = create(
    persist(
        combine(
            {
              carts: [] as Product[],
            },
            (set, get) => ({
              addToCart: (product: Product) => {
                const {carts} = get()
                const existingCart = carts.find((p) => p.id === product.id)

                if (existingCart) {
                  // @ts-ignore
                  set({carts: get().carts.map((i) => i.id === product.id ? { ...i, quantity: i.stock !== i.quantity ? i.quantity + product.quantity : toast.error("There are not enough products in stock.") } : i),
                  });
                } else {
                  set({ carts: [...get().carts, product] });
                }
              },

              incrementQuantity: (product: Product) => {
                // @ts-ignore
                set({carts: get().carts.map((i) => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i),});
              },

              decrementQuantity: (product: Product) => {
                // @ts-ignore
                set({carts: get().carts.map((i) => i.id === product.id ? { ...i, quantity: i.quantity - 1 } : i),});
              },

              removeFromCart: (id: number) => {
                set({ carts: get().carts.filter((item) => item.id !== id) });
              },

              clearCart: () => {
                set({ carts: [] });
              },
            })
        ),
        {
          name: "cart-storage", // localStorage key
        }
    )
);
