import { create } from "zustand";

interface LanguageState {
  language: string;
  setLanguage: (lang: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: localStorage.getItem("lang") || "en",
  setLanguage: (lang) => {
    localStorage.setItem("lang", lang);
    set({ language: lang });
  },
}));
