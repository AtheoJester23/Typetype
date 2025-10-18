import { Keyboard, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const {theme, toggleTheme, setUrl} = useTheme();

    return (  
        <div className="Navbar">
            <div className="flex gap-2">
                <div className="flex justify-center items-center gap-2 p-2">
                    <Keyboard className="inline text-white"/>
                    <a href="/" className="text-white font-bold text-3xl">Typetype</a>
                </div>
            </div>

            <div className="flex justify-center items-center">
                <select 
                    className="bg-[rgb(18,18,18)] text-white py-2 rounded px-5 text-center hover:cursor-pointer font-bold" 
                    defaultValue="default" 
                    onChange={(e)=>(
                        setUrl(e.target.value)
                    )}>
                        <option className="text-gray-500 bg-gray-200" value="default" disabled>Select a mode</option>
                        <option className="text-black" value={`${import.meta.env.VITE_QUOTES_API}`}>Quotes</option>
                        <option className="text-black" value={`${import.meta.env.VITE_COMMANDMENTS_API}`} >10 Commandments</option>
                </select>
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