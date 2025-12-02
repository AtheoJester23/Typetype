import { BookOpenText} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const ViewAll = () => {
    const {theme} = useTheme();
    const testing = [
        {_id: '123451', id: 0, title: "abc", content: "item 1"}, 
        {_id: '123452', id: 1, title: "def", content: "item 2"}, 
        {_id: '123453',id: 2, title: "ghi", content: "item 3"},
        {_id: '123454', id: 3, title: "jkl", content: "item 4"}, 
        {_id: '123455', id: 4, title: "mno", content: "item 5"}, 
        {_id: '123456',id: 5, title: "pqr", content: "item 6"}
    ];

    console.log(testing)

    return (  
        <div className="viewAll">
            <div className="customContainer">
                {testing.length > 0 && (
                    <>
                        {testing.map(item => (
                            <Link to={`/Custom/${item._id}`} key={item._id} className="w-full flex justify-center items-center flex-col border border-white rounded-xl p-5 gap-2">
                                <BookOpenText className="text-white"/>
                                <span className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} rounded-xl w-full text-center font-bold`}>{item.title}</span>
                            </Link>
                        ))}
                    </>
                )}
                
            </div>
        </div>
    );
}
 
export default ViewAll;