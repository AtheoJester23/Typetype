import { Keyboard, Moon, Pencil, Sun, UserRound } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setToken } from "../state/Token/tokenSlice";

const Navbar = () => {
    const {theme, toggleTheme} = useTheme();
    const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    return (  
        <div className="Navbar">
            <div className="flex gap-2">
                <div className="flex justify-center items-center gap-2 p-2">
                    <Keyboard className="inline text-white"/>
                    <Link to="/" className="text-white font-bold text-3xl">Typetype</Link>
                </div>
            </div>

            <div className="flex gap-2">
                <button onClick={toggleTheme} className="bg-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                    {theme === "light" 
                        ? (<span><Moon className="inline" /> Dark </span>) 
                        : (<span><Sun className="inline" /> Light </span>)} 
                            Mode
                </button>

                {token && (
                    <Link to={"/custom"} className="border text-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                        <Pencil size={20}/>
                        Custom
                    </Link>
                )}

                
                {token ? (
                            <Link to={"/Profile"} className="border text-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                                <span className="flex gap-2"><UserRound/>Profile</span>
                            </Link> 
                        ): (
                            <Link to={"/Login"} className="border text-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                                <span className="flex gap-2"><UserRound/>Login</span>
                            </Link> 
                        )
                }
            </div>
        </div>
    );
}
 
export default Navbar;