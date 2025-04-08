// import { create } from "zustand";
//
// interface ThemeState {
//   isDarkMode: boolean;
//   toggleTheme: () => void;
// }
//
// export const useThemeStore = create<ThemeState>((set) => ({
//   isDarkMode: JSON.parse(localStorage.getItem("darkMode") || "false"),
//   toggleTheme: () =>
//       set((state) => {
//         const newMode = !state.isDarkMode;
//         localStorage.setItem("darkMode", JSON.stringify(newMode));
//         return { isDarkMode: newMode };
//       }),
// }));

import { create } from "zustand";
import { persist, combine } from "zustand/middleware";

export const useThemeStore = create(
    persist(
        combine(
            {
              isDarkMode: false,
            },
            (set) => ({
              toggleTheme: () =>
                  set((state) => ({
                    isDarkMode: !state.isDarkMode,
                  })),
            })
        ),
        {
          name: "theme-storage", // localStorage key
        }
    )
);
