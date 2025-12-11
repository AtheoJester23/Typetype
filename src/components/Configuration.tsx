import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setMode } from "../state/references/referenceSlice";
import { useEffect } from "react";
import { setNumbers, setPunctuation } from "../state/Config/configSlice";
import { useTheme } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

const Configuration = ({reference}: {reference: String}) => {
    // Checkbox states
    const punctuationCheckbox = useSelector((state: RootState) => state.config.punctuation)
    const numbersCheckbox = useSelector((state: RootState) => state.config.numbers);
    const dispatch = useDispatch<AppDispatch>();
    const {theme} = useTheme();
    const navigate = useNavigate();

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
        <div className="flex justify-center items-center border bg-black rounded shadow-xl">
            <select 
                className={`${theme == "light" ? "bg-white text-[rgb(23,23,23)] border border-[rgb(23,23,23)]" : "bg-[rgb(18,18,18)] text-white"}  py-2 rounded px-5 text-center hover:cursor-pointer font-bold`}
                defaultValue="default" 
                onChange={(e)=> {
                    if(e.target.value == "Custom"){
                        navigate("/custom")
                    }
                    dispatch(setMode(e.target.value))
                }}
            >
                    <option className={`${theme == "light" ? "text-gray-500 bg-[rgba(206,206,206,1)]" : "text-gray-500 bg-[rgb(23,23,23)]"}`} value="default" disabled>Select a mode</option>
                    <option className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white hover:cursor-pointer"}`} value={`Quotes`}>Quotes</option>
                    <option className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white hover:cursor-pointer"}`} value={`Commandments`} >10 Commandments</option>
            </select>

            <div className="flex gap-2 mx-2">
                <label htmlFor="Punctuation" className="text-white flex gap-2 items-center font-bold">
                    <input type="checkbox" name="Punctuation" id="Punctuation" onChange={()=>dispatch(setPunctuation(!punctuationCheckbox))} defaultChecked={punctuationCheckbox} className="peer h-4 w-4 appearance-none rounded border border-white-300 checked:bg-green-600 checked:border-none"/>
                    <span className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} select-none`}>
                        Punctuation
                    </span>
                </label>
                <label htmlFor="Numbers" className="text-white flex gap-2 items-center font-bold">
                    <input type="checkbox" name="Numbers" id="Numbers" onChange={()=> dispatch(setNumbers(!numbersCheckbox))} defaultChecked={numbersCheckbox} className="peer h-4 w-4 appearance-none rounded border border-white-300 checked:bg-green-600 checked:border-none"/>
                    <span className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} select-none`}>
                        Numbers
                    </span>
                </label>
            </div>
        </div>
    );
}
 
export default Configuration;