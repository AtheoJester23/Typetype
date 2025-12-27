import { useState, type FormEvent } from "react";
import { useTheme } from "../context/ThemeContext"
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, useSearchParams } from "react-router-dom";

type possibleErrs = {
    newPass: boolean,
    confPass: boolean 
}

const ResetForm = () => {
    const { theme } = useTheme();
    const [errs, setErrs] = useState<possibleErrs>({newPass: false, confPass: false})
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const navigate = useNavigate();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const pass = formData.get("newPass") as string;
        const conf = formData.get("confPass") as string;

        const currentErrs = {newPass: false, confPass: false};

        if(!pass || pass.replace(/[ ]/g, "") == ""){
            currentErrs.newPass = true;
        }

        if(!conf || conf.replace(/[ ]/g, "") == ""){
            currentErrs.confPass = true;
        }

        if(conf !== pass){
            currentErrs.newPass = true;
            currentErrs.confPass = true;
        }

        if(Object.values(currentErrs).includes(true)){
            toast.error("Please fix the errors in the form before submitting.")
            setErrs(currentErrs)
            return;
        }

        try {
            const res = await fetch(import.meta.env.VITE_RSTPASS_LOCAL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    newPassword: pass,
                    token
                })
            })

            if(!res.ok){
                throw new Error(`${res.status}`)
            }

            const data = await res.json();

            console.log(data);

            navigate("/Login")

            toast.success("Changed password successfully.")
        } catch (error) {
            console.error((error as Error).message)
            toast.error("Something went wrong.")
        }
    }

  return (
    <form onSubmit={(e) => handleSubmit(e)} className='bg-white p-5 rounded flex flex-col gap-2'>
        <input onChange = {() => setErrs((prev) => ({...prev, newPass: false}))} type="text" name='newPass' placeholder='New Password' className={`border ${errs.newPass ? "border-red-500" : "border-gray-500"} px-3 py-2 rounded`}/>
        <input onChange = {() => setErrs((prev) => ({...prev, confPass: false}))} type="text" name='confPass' placeholder='Confirm Password' className={`border ${errs.confPass ? "border-red-500" : "border-gray-500"} px-3 py-2 rounded`}/>
        <button className={`${theme == "dark" ? "" : ""} bg-green-500 rounded font-bold p-2 -translate-y-0.5 hover:translate-none duration-500 cursor-pointer`}>Submit</button>
        <ToastContainer theme={`${theme == "dark" ? "dark" : "light"}`}/>
    </form>
  )
}

export default ResetForm
