import { AtSign, Lock, LockKeyhole, User } from "lucide-react";

const SignupForm = () => {
    return (  
        <form className="formSignup">
            <h1 className="text-center font-bold text-4xl text-[rgb(23,23,23)]">Sign Up</h1>

            <div className="flex flex-col gap-2">
                <div className="input-box">
                    <input type="text" name="username" id="username" className="border border-gray-500 px-3 py-2 rounded" placeholder="Username" autoComplete="off"/>
                    <User className="absolute right-2 top-2 text-gray-500"/>
                </div>
                <div className="input-box">
                    <input type="text" name="email" id="email" className="border border-gray-500 px-3 py-2 rounded" placeholder="Email" autoComplete="off"/>
                    <AtSign className="absolute right-2 top-2 text-gray-500"/>
                </div>
                <div className="input-box">
                    <input type="password" name="createPassword" id="createPassword" className="border border-gray-500 px-3 py-2 rounded" placeholder="Create Password" autoComplete="off"/>
                    <Lock className="absolute right-2 top-2 text-gray-500"/>
                </div>
                <div className="input-box">
                    <input type="password" name="confirmPassword" id="confirmPassword" className="border border-gray-500 px-3 py-2 rounded" placeholder="Confirm Password" autoComplete="off"/>
                    <LockKeyhole className="absolute right-2 top-2 text-gray-500"/>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <input type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe" className="font-bold text-[rgb(23,23,23)]">Remember Me</label>
            </div>

            <button className="border border-[rgb(23,23,23)] font-bold text-[rgb(23,23,23)] py-2 rounded-full -translate-y-0.25 hover:translate-none cursor-pointer duration-200 hover:bg-green-500 hover:text-white">Sign up</button>
        </form>
    );
}
 
export default SignupForm;