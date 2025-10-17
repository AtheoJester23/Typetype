import { Keyboard, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const {theme, toggleTheme} = useTheme();

    return (  
        <div className="Navbar">
            <div className="flex justify-center items-center gap-2 p-2">
                <Keyboard className="inline text-white"/>
                <h1 className="text-white font-bold text-3xl">Typetype</h1>
            </div>


            <button onClick={toggleTheme} className="bg-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                {theme === "light" 
                    ? (<span><Moon className="inline" /> Dark </span>) 
                    : (<span><Sun className="inline" /> Light </span>)} 
                        Mode
            </button>
        </div>
    );
}
 
export default Navbar;