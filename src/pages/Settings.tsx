import { User } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { useTheme } from "../context/ThemeContext";

const Settings = () => {
    const {theme}= useTheme();
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");

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
                        <button className="bg-red-500 px-5 rounded-full cursor-pointer w-full">Delete Account</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default Settings;