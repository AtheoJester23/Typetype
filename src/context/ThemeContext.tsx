import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "dark" | "light"

interface ThemeContextType {
    theme: Theme,
    url: string,
    setUrl: (url: string) => void,
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({children}: {children: ReactNode}){
    const [theme, setTheme] = useState<Theme>("dark");
    const [url, setUrl] = useState<string>(`${import.meta.env.VITE_COMMANDMENTS_API}`); 

    useEffect(() => {
        if (theme === "dark") {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "light" ? "dark" : "light"));
    }

    return (
        <ThemeContext.Provider value={{theme, toggleTheme, url, setUrl}}>
            <div className="theme">{children}</div>
        </ThemeContext.Provider>
    )
}

export function useTheme(){
    const context=  useContext(ThemeContext);
    if(!context) throw new Error("useTheme must be used inside ThemeProvider");
    return context;
}