import { TriangleAlert, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { useTheme } from "../context/ThemeContext";
import { Description, Dialog, DialogDescription, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState } from "react";
import { setToken } from "../state/Token/tokenSlice";
import { useNavigate } from "react-router-dom";

const Settings = () => {
    //Delete user
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const userId = localStorage.getItem("userId");  
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    const {theme}= useTheme();
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

    const handleDelete = async () => {
        try {
            const res = await fetch(import.meta.env.VITE_USER + `/${userId}`, {
                method: "DELETE",
            })

            if(!res.ok){
                throw new Error(`${res}`)
            }

            const data = await res.json();

            //Remove all localStorage data from the user:
            localStorage.clear();
            dispatch(setToken(null));
            navigate("/")
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    return (  
        <div className="settingsPage">
            <div className="border border-green-500 border-3 border-dashed rounded-t-xl  w-full h-full flex items-center justify-center text-white">
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-green-500 font-bold text-5xl">129wpm</h1>
                    <p className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"}`}>Personal Best</p>
                </div>
            </div>
            <div className={`border ${theme == "light" ? "border-[rgb(172,172,172)]" : "border-[rgb(18,18,18)]"} border-3 flex justify-center items-center border-dashed rounded-b-xl  w-full h-full ${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"}`}>
                <User className="w-[25%] h-[75%]"/>
                <div className="flex flex-col justify-center items-center">
                    <div>
                        <div>
                            <p><strong>Username: </strong>{username}</p>
                            <p><strong>Email: </strong>{email}</p>
                            <label>Password: *****</label>
                        </div>
                        <button onClick={() => setIsOpen(true)} className="bg-red-500 px-5 rounded-full cursor-pointer w-full">Delete Account</button>
                    </div>
                </div>
            </div>
            <Dialog open={isOpen} onClose={() => {setIsOpen(false)}}>
                <div className='fixed inset-0 bg-black/30'></div>
            
                <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
                    <DialogPanel className="mx-auto max-w-sm rounded bg-white p-5 max-sm:w-[90%] sm:w-[50%]">
                        <div className='flex justify-center flex-col items-center gap-3'>
                            <TriangleAlert size={100} className='text-red-500'/>
                            <div className='text-center'>
                                <DialogTitle className="text-2xl font-bold">Are you sure?</DialogTitle>
                                <Description className="text-gray-500">Warning: This action cannot be undone.</Description>
                            </div>
                            <div className='flex gap-3'>
                                <button 
                                    className='px-5 py-2 bg-red-500 text-white rounded-full cursor-pointer hover:bg-red-600 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' 
                                    onClick={() => handleDelete()}>
                                        Yes
                                </button>
                                <button className='px-5 py-2 bg-gray-500 text-white rounded-full cursor-pointer hover:bg-gray-600 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
 
export default Settings;