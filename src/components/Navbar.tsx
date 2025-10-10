import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const {theme, toggleTheme} = useTheme();

    return (  
        <div className="Navbar">
            <h1>Test</h1>

            <button onClick={toggleTheme} className="bg-white py-2 px-5 rounded font-bold cursor-pointer">
                {theme === "light" 
                    ? (<span><Moon className="inline" /> Dark </span>) 
                    : (<span><Sun className="inline" /> Light </span>)} 
                        Mode
            </button>
        </div>
    );
}
 
export default Navbar;