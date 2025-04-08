import { create } from "zustand";

interface ThemeState {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  isDarkMode: JSON.parse(localStorage.getItem("darkMode") || "false"),
  toggleTheme: () =>
      set((state) => {
        const newMode = !state.isDarkMode;
        localStorage.setItem("darkMode", JSON.stringify(newMode));
        return { isDarkMode: newMode };
      }),
}));
