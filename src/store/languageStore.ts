// import { create } from "zustand";
//
// interface LanguageState {
//   language: string;
//   setLanguage: (lang: string) => void;
// }
//
// export const useLanguageStore = create<LanguageState>((set) => ({
//   language: localStorage.getItem("lang") || "en",
//   setLanguage: (lang) => {
//     localStorage.setItem("lang", lang);
//     set({ language: lang });
//   },
// }));

import {create} from "zustand";
import {combine, persist} from "zustand/middleware";

export const useLanguageStore = create(
    persist(
        combine(
            {language: "en"},
            (set) => ({
              setLanguage: (lang: string) => {
                set({language: lang});
              },
            })
        ),
        {
          name: "lang-storage", // localStorage key
        }
    )
);