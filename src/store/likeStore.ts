import { create } from "zustand";
import { combine, persist } from "zustand/middleware";
import {Product} from "@/types";

export const useLikeStore = create(
    persist(
        combine(
            {
              likedItems: [] as Product[],
            },
            (set, get) => ({
              toggleLike: (product: Product) => {
                const { likedItems } = get();
                const exists = likedItems.some((item) => item.id === product.id);

                if (exists) {
                  set({
                    likedItems: likedItems.filter((item) => item.id !== product.id),
                  });
                } else {
                  set({ likedItems: [...likedItems, product] });
                }
              },

              isLiked: (id: number) => {
                return get().likedItems.some((item) => item.id === id);
              },

              clearLikes: () => {
                set({ likedItems: [] });
              },
            })
        ),
        {
          name: "liked-products", // localStorage key
        }
    )
);
