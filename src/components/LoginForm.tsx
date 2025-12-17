import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch} from "../state/store";
import { setToken } from "../state/Token/tokenSlice";
import { setLog } from "../state/AuthState/authSlice";
import { toast, ToastContainer } from "react-toastify";
import { useTheme } from "../context/ThemeContext";

type cred = {
    email: string,
    password: string
    rememberMe: boolean
}

const LoginForm = () => {
    const { theme } = useTheme();

    const [show, setShow] = useState(false)    
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const getData = async(userCredentials: cred) => {
        try {
            const res = await fetch(import.meta.env.VITE_LOGIN, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userCredentials)
            });
            
            if(!res.ok){
                throw new Error(`Failed to get the data: ${res.status}`)
            }

            const data = await res.json();

            console.log(data)

            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.data._id);
            localStorage.setItem("username", data.data.username);
            localStorage.setItem("email", data.data.email);

            console.log("this is userId: ", data.data._id)
            dispatch(setToken(data.token));
            navigate("/");
            dispatch(setLog("pending"))
        } catch (error) {
            console.error("Failed to get the data: ", (error as Error).message)
            toast.error(`Invalid Email Address or Password`)
        }
    }

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string
        const password = formData.get("password") as string;
        const rememberMe = formData.get("rememberMe") as boolean | null;

        console.log("Email: ", email);
        console.log("Password: ", password);
        console.log("Remember Me:", rememberMe ? true : false)
        
        // return;

        const body: cred = {
            email,
            password,
            rememberMe: rememberMe ? true : false 
        }
        
        getData(body);
    }

    return (  
        <form className="formLogin" onSubmit={(e)=>handleLogin(e)}>
            <h1 className="text-center font-bold text-3xl text-[rgb(23,23,23)]">Login</h1>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-500">Email: </label>
                    <input type="text" name="email" id="email" className="border border-gray-500 rounded p-[10px]" placeholder="Enter email address" defaultValue={"gumanaba2@gmail.com"}/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-gray-500">Password: </label>
                    <div className="relative">
                        <input type={show ? "text" : "password"} name="password" id="password" className="border border-gray-500 rounded p-[10px] w-full" placeholder="Password" autoComplete="off" defaultValue={"password123"}/>
                        <button type="button" className="absolute right-3 top-3" onClick={() => setShow(prev => !prev)}>{show ? <Eye className="text-gray-500"/> : <EyeClosed className="text-gray-500"/>}</button>
                    </div>
                </div>

            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <input type="checkbox" name="rememberMe" id="rememberMe" />
                    <label htmlFor="rememberMe" className="font-bold text-[rgb(23,23,23)] select-none">Remember Me</label>
                </div>
                <Link to={"/forgotPassword"} className="text-green-500">Forgot Password</Link>
            </div>

            <button className="border border-[rgb(23,23,23)] bg-green-500 text-white font-bold rounded p-[7px] cursor-pointer -translate-y-0.25 hover:translate-none duration-200">Submit</button>
        
            <p className="text-center">
                Don't have an account? <Link to={'/Signup'} className="text-green-500">Sign Up</Link>
            </p>
            <ToastContainer theme={theme == 'dark' ? "dark" : 'light'}/>
        </form>
    );
}
 
export default LoginForm;