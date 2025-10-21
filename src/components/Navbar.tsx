import { Keyboard, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { fetchData, setMode } from "../state/references/referenceSlice";

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
                        console.log(e.target.value)
                        // setMode(e.target.value)
                    )}>
                        <option className="text-gray-500 bg-[rgb(23,23,23)]" value="default" disabled>Select a mode</option>
                        <option className="text-white hover:cursor-pointer" value={`Quotes`}>Quotes</option>
                        <option className="text-white hover:cursor-pointer" value={`Ten%20Commandments`} >10 Commandments</option>
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