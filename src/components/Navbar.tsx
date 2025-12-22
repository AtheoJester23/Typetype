import { Keyboard, LogOut, Moon, Pencil, Settings, Sun, UserRound } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setToken } from "../state/Token/tokenSlice";
import { useEffect, useState } from "react";
import { setLog} from "../state/AuthState/authSlice";

const Navbar = () => {
    const {theme, toggleTheme} = useTheme();
    const token = useSelector((state: RootState) => state.token.token)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false)
    const authState = useSelector((state: RootState) => state.authState.value)


    const handleLogOut = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_TEST_LOGOUT, {
                method: "POST",
                credentials: "include"                
            })

            if(!res.ok){
                throw new Error(`${res.status}`);
            }

            const data = await res.json();

            console.log(data);
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            localStorage.removeItem("email");
            localStorage.removeItem("username");
            setOpen(false)
            navigate("/")
            dispatch(setToken(null));
            dispatch(setLog("loggedOut"))
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    const handleSettings = () => {
        setOpen(false);
        navigate("/Settings")
    }

    useEffect(() => {
        if(token){
            dispatch(setLog("loggedIn"))
        }
    }, [token])

    return (  
        <div className="Navbar">
            <div className="flex gap-2">
                <div className="flex justify-center items-center gap-2 p-2">
                    <Keyboard className="inline text-white"/>
                    <a href="/" className="text-white font-bold text-3xl">Typetype</a>
                </div>
            </div>

            {
                <div className={`flex gap-2 ${authState == "pending" ? "hidden" : "visible"}`}>
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
                                <div className="relative">
                                    <button onClick={() => setOpen(prev => !prev)} className="border text-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                                        <span className="flex gap-2"><UserRound/>Profile</span>
                                    </button> 
                                    <div className={`${open ? "visible" : "hidden"} flex flex-col bg-[rgb(23,23,23)] border border-white rounded-b absolute -bottom-17 right-0 left-0`}>
                                        <button onClick={() => handleSettings()} className="flex gap-1 items-center justify-center hover:text-[rgb(23,23,23)] p-1 text-white  hover:bg-white cursor-pointer">
                                            <Settings size={20}/>
                                            <span>Settings</span>
                                        </button>
                                        <button onClick={() => handleLogOut()} className="flex gap-1 items-center justify-center hover:text-[rgb(23,23,23)] p-1 text-white  hover:bg-white cursor-pointer">
                                            <LogOut size={20}/>
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                </div>
                            ): (
                                <Link to={"/Login"} className="border text-white py-2 px-5 rounded font-bold cursor-pointer flex justify-center items-center gap-1">
                                    <span className="flex gap-2"><UserRound/>Login</span>
                                </Link> 
                            )
                    }
                </div>
            }
        </div>
    );
}
 
export default Navbar;