import { AtSign, Eye, EyeClosed, Lock, LockKeyhole, User } from "lucide-react";
import { useState } from "react";
import validator from "validator"

type PossibleErrors = {
    username?: boolean | null,
    email?: boolean | null,
    password?: boolean | null
}

const SignupForm = () => {
    const [show, setShow] = useState(false)
    const [errors, setErrors] = useState<PossibleErrors>({});

    const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const email = formData.get("email") as string;
        const password = formData.get("createPassword") as string;
        const confirmPassword = formData.get("confirmPassword") as string;

        console.log("Data", JSON.stringify({username, email, password, confirmPassword}))
    
        let newErrors: PossibleErrors = {};

        try {
            //check if the Email is valid:
            const isValid = validator.isEmail(email);
            if(!isValid){
                newErrors.email = true
                // throw new Error("Email address is invalid") 
            }

            //Double Check Password:
            if(password != confirmPassword){
                newErrors.password = true;
                // throw new Error("Password did not matched...")
            }

            setErrors(newErrors);

        } catch (error) {
            console.error("Failed to Sign-up: ", (error as Error).message)
        }
    }

    return (  
        <form className="formSignup" onSubmit={(e) => handleSignIn(e)}>
            <h1 className="text-center font-bold text-4xl text-[rgb(23,23,23)]">Sign Up</h1>
            
            <div className="flex flex-col gap-2">
                <div className="input-box">
                    <User className="text-[rgb(23,23,23)]"/>
                    <input type="text" name="username" id="username" className="border border-gray-500 px-3 py-2 rounded" placeholder="Username" autoComplete="off"/>
                </div>
                <div className="input-box">
                    <AtSign className="text-[rgb(23,23,23)]"/>
                    <input type="text" name="email" id="email" className={`border ${errors.email == true ? "border-red-500" : "border-gray-500"} px-3 py-2 rounded`} placeholder="Email" autoComplete="off" onChange={() => setErrors((prev: PossibleErrors) => ({...prev, email: false }))}/>
                </div>
                <div className="input-box">
                    <Lock className="text-[rgb(23,23,23)]"/>
                    <input type={show ? "text" : "password"} name="createPassword" id="createPassword" className="border border-gray-500 px-3 py-2 rounded" placeholder="Create Password" autoComplete="off"/>
                </div>
                <div className="input-box">
                    <Lock className="text-[rgb(23,23,23)]"/>
                    <div className="passwordBox">
                        <input type={show ? "text" : "password"} name="confirmPassword" id="confirmPassword" className="border border-gray-500 px-3 py-2 rounded" placeholder="Confirm Password" autoComplete="off"/>
                        <button type="button" onClick={() => setShow(prev => !prev)}>
                            {show ? <Eye className="absolute right-2 top-2.5 text-gray-500"/> : <EyeClosed className="absolute right-2 top-2.5 text-gray-500"/>}
                        </button>
                    </div>
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