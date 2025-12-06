import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setMode } from "../state/references/referenceSlice";
import { useEffect, useState } from "react";
import { setNumbers, setPunctuation } from "../state/Config/configSlice";
import { useTheme } from "../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";

export type customsType = {
    _id: string,
    title: string,
    content: string,
    userId: string,
    collectionName: string,
    collectionId: string
}

const ConfigurationCustom = ({reference}: {reference: String}) => {
    // Checkbox states
    const punctuationCheckbox = useSelector((state: RootState) => state.config.punctuation)
    const numbersCheckbox = useSelector((state: RootState) => state.config.numbers);
    const dispatch = useDispatch<AppDispatch>();
    const {theme} = useTheme();
    
    const navigate = useNavigate();

    const userId = localStorage.getItem("userId")
    const {id} = useParams();
    const [choices, setChoices] = useState<customsType[]>([])

    useEffect(()=>{
        const getCollections = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_GET_COLLECTIONS + `/${userId}`);

                if(!res.ok){
                    throw new Error(`${res.status}`)
                }

                const data = await res.json();

                const filtered = data.data.filter((item: customsType) => item.collectionId == id);
                setChoices(filtered);

                console.log("-------------------------------------------------")
                console.log(filtered)
                console.log("-------------------------------------------------")
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        getCollections();
    }, [])

    useEffect(()=>{
        if(punctuationCheckbox == false && reference){
            setPunctuation(false)
            console.log("Punctuation checkbox is false");
        }

        if(numbersCheckbox == false){
            console.log("Numbers checkbox is false");
        }
    }, [punctuationCheckbox, numbersCheckbox])

    return (  
        <div className="flex justify-center items-center">
            <select 
                className="bg-[rgb(18,18,18)] text-white py-2 rounded px-5 text-center hover:cursor-pointer font-bold" 
                defaultValue="default" 
                onChange={(e)=> {
                    if(e.target.value == "Custom"){
                        navigate("/custom")
                    }
                    dispatch(setMode(e.target.value))
                }}
            >
                    <option className="text-gray-500 bg-[rgb(23,23,23)]" value="default" disabled>Select a mode</option>
                    {choices.length > 0 && (
                        <>
                            {choices.map(item => (
                                <option key={item._id} className="text-white hover:cursor-pointer" value={`${item._id}`}>{item.title}</option>
                            ))}
                        </>
                    )}
                                    
            </select>

            <div className="flex gap-2 mx-2">
                <label htmlFor="Punctuation" className="text-white flex gap-2 items-center font-bold">
                    <input type="checkbox" name="Punctuation" id="Punctuation" onChange={()=>dispatch(setPunctuation(!punctuationCheckbox))} defaultChecked={punctuationCheckbox}/>
                    <span className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} select-none`}>
                        Punctuation
                    </span>
                </label>
                <label htmlFor="Numbers" className="text-white flex gap-2 items-center font-bold">
                    <input type="checkbox" name="Numbers" id="Numbers" onChange={()=> dispatch(setNumbers(!numbersCheckbox))} defaultChecked={numbersCheckbox}/>
                    <span className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} select-none`}>
                        Numbers
                    </span>
                </label>
            </div>
        </div>
    );
}
 
export default ConfigurationCustom;