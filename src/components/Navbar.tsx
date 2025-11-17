import { Keyboard, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setToken } from "../state/Token/tokenSlice";

const Navbar = () => {
    const {theme, toggleTheme, setUrl} = useTheme();
    const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const handleAuth = () => {
        if(!token){
            navigate("/Login")
        }else{
            localStorage.removeItem("token");
            dispatch(setToken(null))
        }
    }

    return (  
        <div className="Navbar">
            <div className="flex gap-2">
                <div className="flex justify-center items-center gap-2 p-2">
                    <Keyboard className="inline text-white"/>
                    <a href="/" className="text-white font-bold text-3xl">Typetype</a>
                </div>
            </div>

            <div className="flex gap-2">
                <button onClick={toggleTheme} className="bg-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                    {theme === "light" 
                        ? (<span><Moon className="inline" /> Dark </span>) 
                        : (<span><Sun className="inline" /> Light </span>)} 
                            Mode
                </button>

                <button onClick={() => handleAuth()}className="border text-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                    {token ? "Logout" : "Login"}
                </button>
            </div>
        </div>
    );
}
 
export default Navbar;