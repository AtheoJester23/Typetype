import { BookOpenText} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import type { namesCollectionType } from "../components/FormCustom";

const ViewAll = () => {
    const {theme} = useTheme();
    const userId = localStorage.getItem("userId");
    const [collectionNames, setCollectionNames] = useState<namesCollectionType[]>([])


    const testing = [
        {_id: '123451', id: 0, title: "abc", content: "item 1"}, 
        {_id: '123452', id: 1, title: "def", content: "item 2"}, 
        {_id: '123453',id: 2, title: "ghi", content: "item 3"},
        {_id: '123454', id: 3, title: "jkl", content: "item 4"}, 
        {_id: '123455', id: 4, title: "mno", content: "item 5"}, 
        {_id: '123456',id: 5, title: "pqr", content: "item 6"}
    ];

    console.log(testing)

    useEffect(() => {
        const getCollectionNames = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_GET_COLLECTION_NAMES + `/${userId}`);

                if(!res.ok){
                    throw new Error(`${res.status}`)
                }

                const data: namesCollectionType[] = await res.json();

                setCollectionNames(data)
                console.log(data);
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        getCollectionNames();
    }, [])

    return (  
        <div className="viewAll">
            <h1 className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} text-center font-bold text-4xl duration-500`}>Collections:</h1>

            <div className="customContainer">
                {collectionNames.length > 0 && (
                    <>
                        {collectionNames.map(item => (
                            <Link to={`/Custom/${item._id}`} key={item._id} className={`w-full flex justify-center items-center flex-col border ${theme == "light" ? "border-[rgb(23,23,23)] hover:bg-[rgb(23,23,23)] hover:text-white" : "text-white border-white hover:bg-white hover:text-[rgb(23,23,23)]"} rounded-xl p-5 gap-2 duration-500`}>
                                <BookOpenText/>
                                <span className={`rounded-xl w-full text-center font-bold`}>{item.name}</span>
                            </Link>
                        ))}
                    </>
                )}
                
            </div>
        </div>
    );
}
 
export default ViewAll;