import { Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Custombtns = () => {
    const {theme} = useTheme();

    return (  
        <div className={`${theme == "dark" ? "text-white" : "text-black"} flex gap-5`}>
            <Link to={"/custom/create"} className={`flex flex-col justify-center items-center border rounded-xl p-5 gap-2 ${theme == "dark" ? "hover:bg-white hover:text-[rgb(23,23,23)]" : "hover:bg-black hover:text-white"} hover:text-[rgb(23,23,23)] hover:cursor-pointer duration-500`}>
                <Plus/>
                <strong>CREATE</strong>
            </Link>
            <Link to={"/Custom/ViewAll"} className={`flex flex-col justify-center items-center border rounded-xl p-5 gap-2 ${theme == "dark" ? "hover:bg-white hover:text-[rgb(23,23,23)]" : "hover:bg-black hover:text-white"} hover:text-[rgb(23,23,23)] hover:cursor-pointer duration-500`}>
                <Eye/> 
                <strong>VIEW ALL</strong>
            </Link>
        </div>
    );
}
 
export default Custombtns;