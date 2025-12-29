import { Eye, EyeClosed, Keyboard, Pencil, Trash, TriangleAlert, User, X } from "lucide-react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";
import { useTheme } from "../context/ThemeContext";
import { Description, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { useState, type FormEvent } from "react";
import { setToken } from "../state/Token/tokenSlice";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

type updateTypes = {
    username: string | null,
    email: string | null
}

const Settings = () => {
    //Delete user
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const userId = localStorage.getItem("userId");  
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    //Edit user details:
    const [edit, setEdit] = useState(false);
    const [submitEdit, setSubmitEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [del, setDel] = useState(false);
    const [inputs, setInputs] = useState<updateTypes>({username: null, email: null})

    const {theme}= useTheme();

    //User data:
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const pb = localStorage.getItem("pb");

    const handleEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        console.log("testing")

        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string
        const email = formData.get("email") as string;

        if((!username || username.replace(/[ ]/g, "") == "") && (!email || email.replace(/[ ]/g, "") == "")){
            setEdit(false)
            toast.error("No changes detected.")
            return
        }

        setInputs((prev) => ({...prev, username: username, email: email}))

        console.log(`${username}, ${email}`)

        setSubmitEdit(true)
    }

    const confirmEdit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password")

        console.log(`password: ${password}`)

        try {
             const res = await fetch(import.meta.env.VITE_USER + `/${userId}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: inputs.username,
                    email: inputs.email,
                    oldPassword: password
                })
             })

             if(!res.ok){
                throw new Error(`${res.status}`)
             }

             const data = await res.json();
             
             console.log(data);

            toast.success("User details updated successfully.")
            setEdit(false);
            setSubmitEdit(false);
            if(inputs.username){
                localStorage.setItem("username", inputs.username);
            }
            if(inputs.email){
                localStorage.setItem("email", inputs.email);
            }
            // navigate("/")
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);

                if (error.message.includes("401")) {
                    toast.error("Incorrect password. Please try again.");
                } else {
                    toast.error("Something went wrong while updating your details.");
                }
            } else {
                toast.error("An unexpected error occurred.");
            }
        }
    }

    const handleConfirmDelete = () => {
        setDel(true);
        setIsOpen(false);
    }


    const handleDelete = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const password = formData.get("password")   

        if(!password || password.toString().replace(/[ ]/g, "") == ""){
            toast.error("Please enter your password to continue.");
            return;
        }

        try {
            const res = await fetch(import.meta.env.VITE_TEST_USER + `/${userId}`, {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    password
                })
            })

            if(!res.ok){
                throw new Error(`${res.status}`)
            }

            //Remove all localStorage data from the user:
            localStorage.clear();
            dispatch(setToken(null));
            navigate("/")
        } catch (error) {
            console.error((error as Error).message)
            if((error as Error).message.includes("401")){
                toast.error("Incorrect password. Please try again.")
            }else{
                toast.error("Something went wrong while deleting your account.")
            }
        }
    }

    return (  
        <div className="settingsPage">
            {!edit ? (
                <>
                    <div className="border border-green-500 border-3 border-dashed rounded-t-xl  w-full h-full flex items-center justify-center text-white">
                        <div className="flex flex-col justify-center items-center gap-3">
                            <h1 className="text-green-500 font-bold text-5xl">{pb ?? 0} wpm</h1>
                            <p className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"}`}>Personal Best</p>
                        </div>
                    </div>
                    <div className={`border ${theme == "light" ? "border-[rgb(172,172,172)]" : "border-[rgb(18,18,18)]"} border-3 flex justify-center items-center border-dashed rounded-b-xl  w-full h-full ${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} relative`}>
                        <User className="w-[25%] h-[75%]"/>
                        <div className="flex flex-col justify-center items-center">
                            <div className="flex flex-col gap-5">
                                <div className="flex flex-col gap-5">
                                    <p><strong>Username: </strong>{username}</p>
                                    <p><strong>Email: </strong>{email}</p>
                                </div>
                                <div className="absolute top-5 right-5 flex gap-3">
                                    <button onClick={() => setEdit(true)}>
                                        <Pencil className={`${theme == "dark" ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-[rgb(23,23,23)]"} cursor-pointer duration-500`}/>
                                    </button>
                                    <button onClick={() => setIsOpen(true)} >
                                        <Trash className={`${theme == "dark" ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-[rgb(23,23,23)]"} cursor-pointer duration-500`}/>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <div className="border border-green-500 border-3 border-dashed rounded-t-xl  w-full h-full flex items-center justify-center text-white">
                        <div className="flex flex-col justify-center items-center gap-3">
                            <h1 className="text-green-500 font-bold text-5xl">{pb ?? 0} wpm</h1>
                            <p className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"}`}>Personal Best</p>
                        </div>
                    </div>
                    <div className={`border ${theme == "light" ? "border-[rgb(172,172,172)]" : "border-[rgb(18,18,18)]"} border-3 flex justify-center items-center border-dashed rounded-b-xl  w-full h-full ${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} relative`}>
                        <User className="w-[25%] h-[75%]"/>
                        <div className="flex flex-col justify-center items-center">
                            <div>
                                <form onSubmit={(e) => handleEdit(e)} className="flex flex-col gap-2">
                                    <div className="relative">
                                        <small className="absolute top-1 left-3 select-none">Username:</small>
                                        <input name="username" type="text" placeholder={`${username}`} className="border px-3 pt-5.5 py-2 rounded "/>
                                    </div>
                                    <div className="relative">
                                        <small className="absolute top-1 left-3 select-none">Email:</small>
                                        <input name="email" type="text" placeholder={`${email}`} className="border px-3 pt-5.5 py-2 rounded "/>
                                    </div>
                                    <button className="bg-green-500 px-5 py-2 border border-white rounded cursor-pointer w-full text-white font-bold -translate-y-0.5 hover:translate-none duration-300">Submit</button>
                                </form>
                                <button onClick={() => setEdit(false)} className="absolute top-3 right-3">
                                    <X className={`${theme == "dark" ? "text-gray-500 hover:text-white" : "text-gray-500 hover:text-black"} cursor-pointer duration-500`}/>
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <ToastContainer theme={theme == "dark" ? "dark" : "light"  }/>
            {/* Delete confirmation dialog */}
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
                                    onClick={() => handleConfirmDelete()}>
                                        Yes
                                </button>
                                <button className='px-5 py-2 bg-gray-500 text-white rounded-full cursor-pointer hover:bg-gray-600 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' onClick={() => setIsOpen(false)}>Cancel</button>
                            </div>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Delete verification dialog */}
            <Dialog open={del} onClose={() => {setDel(false)}}>
                <div className='fixed inset-0 bg-black/30'></div>
            
                <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
                    <DialogPanel className="mx-auto max-w-sm rounded bg-white p-5 max-sm:w-[90%] sm:w-[50%]">
                        <form onSubmit={(e) => handleDelete(e)} className='flex justify-center flex-col items-center gap-3'>
                            <Keyboard size={100} className='text-gray-500'/>
                            <div className='text-center'>
                                <DialogTitle className="font-bold">To continue, first verify it’s you</DialogTitle>
                                <div className="relative">
                                    <input type={show ? "text" : "password"} name="password" className="w-full border border-gray-500 p-3 rounded select-none" placeholder="*******" autoComplete="off"/>
                                    {show ? (
                                        <Eye onClick={() => setShow((prev) => !prev)} className="absolute right-2 top-3 cursor-pointer"/>
                                    ):(
                                       <EyeClosed onClick={() => setShow((prev) => !prev)} className="absolute right-2 top-3 cursor-pointer"/>
                                    )}
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <button type="submit" className='px-5 py-2 bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-400 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' >
                                        <span className="select-none">
                                            Continue
                                        </span>
                                </button>
                                <button type="button" className='px-5 py-2 bg-gray-500 text-white rounded-full cursor-pointer hover:bg-gray-600 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' onClick={() => setDel(false)}>Cancel</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Edit confirmation dialog */}
            <Dialog open={submitEdit} onClose={() => {setSubmitEdit(false)}}>
                <div className='fixed inset-0 bg-black/30'></div>
            
                <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
                    <DialogPanel className="mx-auto max-w-sm rounded bg-white p-5 max-sm:w-[90%] sm:w-[50%]">
                        <form onSubmit={(e) => confirmEdit(e)} className='flex justify-center flex-col items-center gap-3'>
                            <Keyboard size={100} className='text-gray-500'/>
                            <div className='text-center'>
                                <DialogTitle className="font-bold">To continue, first verify it’s you</DialogTitle>
                                <div className="relative">
                                    <input type={show ? "text" : "password"} name="password" className="w-full border border-gray-500 p-3 rounded select-none" placeholder="*******" autoComplete="off"/>
                                    {show ? (
                                        <Eye onClick={() => setShow((prev) => !prev)} className="absolute right-2 top-3 cursor-pointer"/>
                                    ):(
                                       <EyeClosed onClick={() => setShow((prev) => !prev)} className="absolute right-2 top-3 cursor-pointer"/>
                                    )}
                                </div>
                            </div>
                            <div className='flex gap-3'>
                                <button type="submit" className='px-5 py-2 bg-green-500 text-white rounded-full cursor-pointer hover:bg-green-400 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' >
                                        <span className="select-none">
                                            Continue
                                        </span>
                                </button>
                                <button type="button" className='px-5 py-2 bg-gray-500 text-white rounded-full cursor-pointer hover:bg-gray-600 duration-200 -translate-y-0.25 hover:translate-none shadow hover:shadow-none' onClick={() => setSubmitEdit(false)}>Cancel</button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </div>
    );
}
 
export default Settings;