import { Eye, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const ViewAll = () => {
    return (  
        <div className="viewAll">
            <div className="flex gap-3">
                <Link to={"/custom/create"} className="flex flex-col justify-center items-center border rounded-xl p-5 gap-2 hover:bg-white hover:text-[rgb(23,23,23)] hover:cursor-pointer duration-500">
                    <Plus/>
                    <strong>CREATE</strong>
                </Link>
                <button className="flex flex-col justify-center items-center border rounded-xl p-5 gap-2 hover:bg-white hover:text-[rgb(23,23,23)] hover:cursor-pointer duration-500">
                    <Eye/> 
                    <strong>VIEW ALL</strong>
                </button>
            </div>
        </div>
    );
}
 
export default ViewAll;