import { BookOpenText, PlusCircle, TriangleAlert, X} from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import type { namesCollectionType } from "../components/FormCustom";
import ClipLoader from "react-spinners/ClipLoader";
import { Dialog } from "@headlessui/react";


const ViewAll = () => {
    const {theme} = useTheme();
    const userId = localStorage.getItem("userId");
    const [collectionNames, setCollectionNames] = useState<namesCollectionType[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    //Selected Collection to be deleted:
    const [selected, setSelected] = useState("")

    const [isOpen, setIsOpen] = useState<boolean>(false)

    const testing = [
        {_id: '123451', id: 0, title: "abc", content: "item 1"}, 
        {_id: '123452', id: 1, title: "def", content: "item 2"}, 
        {_id: '123453',id: 2, title: "ghi", content: "item 3"},
        {_id: '123454', id: 3, title: "jkl", content: "item 4"}, 
        {_id: '123455', id: 4, title: "mno", content: "item 5"}, 
        {_id: '123456',id: 5, title: "pqr", content: "item 6"}
    ];

    console.log(testing)

    const handleDelete = async () => {
        setIsOpen((prev) => !prev)
        console.log(selected);

        try {
            const res = await fetch(import.meta.env.VITE_DELETE_COLLECTION + `/${userId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    collectionId: selected
                })
            })

            if(!res.ok){
                throw new Error(`${res.status}`)
            }

            const data = await res.json();
            setCollectionNames(data.remainingCollections)

            console.log(data);
        } catch (error) {
            console.error((error as Error).message)
        }
    }

    useEffect(() => {
        const getCollectionNames = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_GET_COLLECTION_NAMES + `/${userId}`);

                if(!res.ok){
                    throw new Error(`${res.status}`)
                }

                const data: namesCollectionType[] = await res.json();

                setCollectionNames(data);
                setLoading(true);
                console.log(data);
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        getCollectionNames();
    }, [])

    return (  
        <div className="viewAll">
            {!loading ? (
                <div className="flex justify-center items-center h-full">
                    <ClipLoader size={40} color={`${theme == "dark" ? "white" : "rgb(23,23,23)"}`} />;
                </div>
            ) : (
                <>
                    <h1 className={`${theme == "dark" ? "text-white" : "text-[rgb(23,23,23)]"} text-center font-bold text-4xl duration-500`}>Collections:</h1>

                    <>
                        {collectionNames.length > 0 ? (
                            <div className="customContainer">
                                {collectionNames.map(item => (
                                    <div className="relative" key={item._id}>
                                        <Link to={`/Custom/${item._id}`} className={`w-full flex justify-center items-center flex-col border ${theme == "light" ? "border-[rgb(23,23,23)] hover:bg-[rgb(23,23,23)] hover:text-white" : "text-white border-white hover:bg-white hover:text-[rgb(23,23,23)]"} rounded-xl p-5 gap-2 duration-500 relative`}>
                                            <BookOpenText/>
                                            <span className={`rounded-xl w-full text-center font-bold`}>{item.name}</span>
                                        </Link>
                                        <X onClick={() => {
                                            setIsOpen(true)
                                            setSelected(item._id)
                                        }} className="absolute right-1 top-1 text-white cursor-pointer hover:bg-red-500 rounded-full" size={20}/>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="justify-center items-center flex flex-col h-full gap-5">
                                <Link to={"/custom/create"} className={`flex flex-col gap-5  text-center ${theme == 'dark' ? "text-white" : "text-[rgb(23,23,23)]"}`}>
                                    <div className="border py-7 px-20 rounded cursor-pointer hover:-translate-y-1 duration-500">
                                        <PlusCircle size="100%" className="max-sm:w-[20px] sm:w-[100px]"/>
                                    </div>
                                </Link>
                                <p className={`text-gray-500 font-bold`}>No collection yet...</p>
                            </div>
                        )}
                    </>
                </>
            ) }
            <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
                <div className='fixed inset-0 bg-black/30'></div>

                <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
                    <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-5 max-sm:w-[90%] sm:w-[50%]">
                        <div className='flex justify-center flex-col items-center gap-3'>
                            <TriangleAlert size={100} className='text-red-500'/>
                            <div className='text-center'>
                                <Dialog.Title className="text-2xl font-bold">Are you sure?</Dialog.Title>
                                <Dialog.Description className="text-gray-500">Warning: This action cannot be undone.</Dialog.Description>
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
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
}
 
export default ViewAll;