import { useState, type FormEvent } from "react";
import validator from 'validator'

type possibleError = {
    missing: boolean,
    wrong: boolean,
    notFound: boolean
}

const ForgotPass = () => {
    const [err, setErr] = useState<possibleError>({wrong: false, missing: false, notFound: false})

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        if(!email || email.replace(/[ ]/g, "") == ""){
            setErr((prev) => ({...prev, missing: true}))
            return;
        }

        //Validate email:
        const isValid = validator.isEmail(email);
        if(!isValid){
            setErr((prev) => ({...prev, wrong: true}))
            return;
        }

        try {
           const res = await fetch(import.meta.env.VITE_FP, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email
            })
           }) 

           if(!res.ok){
            if(res.status == 404){
                setErr(prev => ({...prev, notFound: true}))
            }
            throw new Error(`${res.status}`)
           }

           const data = await res.json();

           console.log(data);
        } catch (error) {
            console.log((error as Error).message)
        }
        
        console.log("testing")
    }

    return (  
        <form onSubmit={(e) => handleSubmit(e)} className="bg-white p-5 rounded-xl flex flex-col gap-3">
            <h1 className="text-3xl font-bold">Password Reset</h1>
            <div>
                <p>Provide the email address associated with your account to reset your password</p>
            </div>

            <div>
                <input type="text" name="email" id="email" className={`border ${err.missing || err.wrong || err.notFound ? "border-red-500 text-red-500 placeholder-red-400" : "border-gray-500 text-black placeholder-gray-500"} p-3 rounded w-full outline-none`}  placeholder="name@example.com" onChange={() => setErr({wrong: false, missing: false, notFound: false})} autoComplete="off"/>
                {Object.values(err).includes(true) && (
                    err.missing ? 
                        <p className="text-red-500">Enter your email to continue.</p>
                        : err.wrong ?
                        <p className="text-red-500">Invalid email address.</p>
                            : <p className="text-red-500">No account is associated with this email.</p>
                )}
            </div>
            <button className="bg-green-500 p-2 rounded-b-xl text-white font-bold border border-black -translate-y-0.25 hover:translate-none hover:cursor-pointer shadow hover:shadow-none duration-200">Submit</button>
        </form>
    );
}
 
export default ForgotPass;