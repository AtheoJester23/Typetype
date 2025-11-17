import { Link, type HTMLFormMethod } from "react-router-dom";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

const LoginForm = () => {
    const [show, setShow] = useState(false)

    const handleLogin = async(e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string
        const password = formData.get("password") as string;

        console.log("Email: ", email);
        console.log("Password: ", password);
    }

    return (  
        <form className="formLogin">
            <h1 className="text-center font-bold text-3xl text-[rgb(23,23,23)]">Login</h1>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-500">Email: </label>
                    <input type="text" name="email" id="email" className="border border-gray-500 rounded p-[10px]" placeholder="Enter email address"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-gray-500">Password: </label>
                    <div className="relative">
                        <input type={show ? "text" : "password"} name="password" id="password" className="border border-gray-500 rounded p-[10px] w-full" placeholder="Password" autoComplete="off"/>
                        <button type="button" className="absolute right-3 top-3" onClick={() => setShow(prev => !prev)}>{show ? <Eye className="text-gray-500"/> : <EyeClosed className="text-gray-500"/>}</button>
                    </div>
                </div>

            </div>
            <button className="bg-green-500 text-white font-bold rounded p-[7px]">Submit</button>
        
            <p className="text-center">
                Don't have an account? <Link to={'/'} className="text-green-500">Sign Up</Link>
            </p>
        </form>
    );
}
 
export default LoginForm;