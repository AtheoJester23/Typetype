import { AtSign, Eye, EyeClosed, Lock, User } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import validator from "validator"
import type { AppDispatch } from "../state/store";
import { setToken } from "../state/Token/tokenSlice";
import {ToastContainer, toast} from 'react-toastify'
import { useTheme } from "../context/ThemeContext";
import { setLog } from "../state/AuthState/authSlice";

type PossibleErrors = {
    username?: boolean | null,
    email?: boolean | null,
    confirmPassword?: boolean | null
    password?: boolean | null
}

const SignupForm = () => {
    const {theme} = useTheme();

    const [show, setShow] = useState(false)
    const [errors, setErrors] = useState<PossibleErrors>({});
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("createPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        console.log("Data", JSON.stringify({username, email, password, confirmPassword}))
    
        let newErrors: PossibleErrors = {};

        try {
            //check username:
            if(!username || username.replace(/[ ]/g, "") == ""){
                newErrors.username = true;
            }

            //check if the Email is valid:
            const isValid = validator.isEmail(email);
            if(!isValid){
                newErrors.email = true
                // throw new Error("Email address is invalid") 
            }

            //Double Check Password:
            if(!password || password.replace(/[ ]/g, "") == ""){
                newErrors.password = true;
            }
            
            if(!confirmPassword || confirmPassword.replace(/[ ]/g, "") == ""){
                newErrors.confirmPassword = true;
            }
            
            if(password != confirmPassword){
                newErrors.password = true;
                // throw new Error("Password did not matched...")
            }

            setErrors(newErrors);

            if(Object.values(newErrors).length > 0) {
                toast.error("Please fix the errors in the form before submitting.")
                return;
            }

            const res = await fetch(import.meta.env.VITE_USER, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            })

            if(!res.ok){
                throw new Error(`${res.status}`)
            }

            const data = await res.json();

            console.log("Successfully created a new user...")
            
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.data._id);
            localStorage.setItem("username", data.data.username);
            localStorage.setItem("email", data.data.email);

            console.log("this is userId: ", data.data._id)
            dispatch(setToken(data.token));
            navigate("/");
            dispatch(setLog("pending"))
        } catch (error) {
            console.error("Failed to Sign-up: ", (error as Error).message)
            toast.error(`Failed to Sign-up: ${(error as Error).message}`)
        }
    }

    return ( 
            <form className="formSignup" onSubmit={(e) => handleSignIn(e)}>
                <h1 className="text-center font-bold text-4xl text-[rgb(23,23,23)]">Sign Up</h1>
                
                <div className="flex flex-col gap-2">
                    <div className="input-box">
                        <User className="text-[rgb(23,23,23)]"/>
                        <input type="text" name="username" id="username" className={`border ${errors.username == true ? "border-red-500" : "border-gray-500"} px-3 py-2 rounded`} placeholder="Username" autoComplete="off" onChange={() => setErrors((prev: PossibleErrors) => ({...prev, username: false }))}/>
                    </div>
                    <div className="input-box">
                        <AtSign className="text-[rgb(23,23,23)]"/>
                        <input type="text" name="email" id="email" className={`border ${errors.email == true ? "border-red-500" : "border-gray-500"} px-3 py-2 rounded`} placeholder="Email" autoComplete="off" onChange={() => setErrors((prev: PossibleErrors) => ({...prev, email: false }))}/>
                    </div>
                    <div className="input-box">
                        <Lock className="text-[rgb(23,23,23)]"/>
                        <input type={show ? "text" : "password"} name="createPassword" id="createPassword" className={`border ${errors.password == true ? "border-red-500" : "border-gray-500"} px-3 py-2 rounded`} placeholder="Create Password" autoComplete="off" onChange={() => setErrors((prev)=> ({...prev, password: null}))}/>
                    </div>
                    <div className="input-box">
                        <Lock className="text-[rgb(23,23,23)]"/>
                        <div className="passwordBox">
                            <input type={show ? "text" : "password"} name="confirmPassword" id="confirmPassword" className={`border ${errors.password == true ? "border-red-500" : "border-gray-500"} px-3 py-2 rounded`} placeholder="Confirm Password" autoComplete="off" onChange={() => setErrors((prev)=> ({...prev, confirmPassword: null}))}/>
                            <button type="button" onClick={() => setShow(prev => !prev)}>
                                {show ? <Eye className="absolute right-2 top-2.5 text-gray-500"/> : <EyeClosed className="absolute right-2 top-2.5 text-gray-500"/>}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input type="checkbox" name="rememberMe" id="rememberMe" />
                    <label htmlFor="rememberMe" className="font-bold text-[rgb(23,23,23)] select-none">Remember Me</label>
                </div>

                <button className="border border-[rgb(23,23,23)] font-bold text-[rgb(23,23,23)] py-2 rounded-full -translate-y-0.25 hover:translate-none cursor-pointer duration-200 hover:bg-green-500 hover:text-white">Sign up</button>
                <ToastContainer theme={theme == "dark" ? "dark" : "light"}/>
            </form>
    );
}
 
export default SignupForm;