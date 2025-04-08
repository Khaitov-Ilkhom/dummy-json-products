import {useEffect, useRef, useState} from "react";
import {ChevronDown} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import i18n from "@/i18n";
import {cn} from "@/lib/utils";
import {useLanguageStore} from "@/store/languageStore.ts";

const languageList = [
  {
    value: "ru",
    label: "Русский",
    short: "Ру",
  },
  {
    value: "uz",
    label: "O'zbek",
    short: "O'z",
  },
  {
    value: "en",
    label: "English",
    short: "En",
  },
];

const Language = () => {
  const {language, setLanguage} = useLanguageStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function handleLanguage(lng: string) {
    setLanguage(lng);
    i18n.changeLanguage(lng);
  }

  return (
      <div className="relative inline-block" ref={dropdownRef}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
              className="flex h-9 items-center gap-2 rounded-md border px-1 bg-black/90 text-white hover:bg-black/80 border-gray-500 text-sm font-medium shadow-sm transition-colors"
              onClick={() => setIsOpen((prev) => !prev)}
          >
            {languageList.map(
                (item) =>
                    item.value === language && (
                        <span key={item.value} className="truncate">
                  {item.short}
                </span>
                    ),
            )}
            <ChevronDown
                size={15}
                className={cn(
                    "transition-transform duration-300",
                    isOpen ? "rotate-180" : "rotate-0",
                )}
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="space-y-1">
            {languageList.map((item) => (
                <DropdownMenuItem
                    key={item.value}
                    onClick={() => handleLanguage(item.value)}
                    className={`cursor-pointer text-sm ${item.value === language && "bg-muted"}`}
                >
                  {item.label}
                </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
  );
};

export default Language;
