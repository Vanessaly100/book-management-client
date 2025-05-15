import { createContext, useEffect, useState } from "react";

import PropTypes from "prop-types";

const initialState = {
    theme: "system",
    setTheme: () => null,
};

export const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme", ...props }) {
    const [theme, setTheme] = useState(() => localStorage.getItem(storageKey) || defaultTheme);
    useEffect(() => {
  const root = window.document.documentElement;
  root.classList.remove("light", "dark");

  let applied = theme;

  if (theme === "system") {
    applied = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  root.classList.add(applied);
  console.log("📦 Theme applied:", applied);
}, [theme]);


    useEffect(() => {
        const root = window.document.documentElement;
        root.classList.remove("light", "dark");

        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            root.classList.add(systemTheme);
            return;
        }

        root.classList.add(theme);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme) => { // 💥 Fixed here!
            localStorage.setItem(storageKey, newTheme);
            setTheme(newTheme);
        },
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}
ThemeProvider.propTypes = {
    children: PropTypes.node,
    defaultTheme: PropTypes.string,
    storageKey: PropTypes.string,
};