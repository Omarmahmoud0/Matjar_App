import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContext {
    theme: string | null;
    setTheme: (THEME:string) => void;
}
const DarkModeContext = createContext<ThemeContext | undefined>(undefined);

export const DarkMode = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string | null>(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );

  localStorage.setItem("theme", theme === null ? '' : theme);
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
  }

  return <DarkModeContext.Provider value={value}>{children}</DarkModeContext.Provider>;
};

export const ThemeModeContext = () => useContext(DarkModeContext)
