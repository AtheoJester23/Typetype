import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setMode } from "../state/references/referenceSlice";
import { useEffect, useState } from "react";
import { setNumbers, setPunctuation } from "../state/Config/configSlice";

const Configuration = ({reference, setReference}: {reference: String, setReference: React.Dispatch<React.SetStateAction<string | null>>}) => {
    // Checkbox states
    const punctuationCheckbox = useSelector((state: RootState) => state.config.punctuation)
    const numbersCheckbox = useSelector((state: RootState) => state.config.numbers);
    const dispatch = useDispatch<AppDispatch>();

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
                    dispatch(setMode(e.target.value))
                }}
            >
                    <option className="text-gray-500 bg-[rgb(23,23,23)]" value="default" disabled>Select a mode</option>
                    <option className="text-white hover:cursor-pointer" value={`Quotes`}>Quotes</option>
                    <option className="text-white hover:cursor-pointer rounded-b" value={`Commandments`} >10 Commandments</option>
            </select>

            <div className="flex gap-2 mx-2">
                <label htmlFor="Punctuation" className="text-white flex gap-2 items-center font-bold">
                    <input type="checkbox" name="Punctuation" id="Punctuation" onChange={()=>dispatch(setPunctuation(!punctuationCheckbox))} defaultChecked={punctuationCheckbox}/>
                    <span>
                        Punctuation
                    </span>
                </label>
                <label htmlFor="Numbers" className="text-white flex gap-2 items-center font-bold">
                    <input type="checkbox" name="Numbers" id="Numbers" onChange={()=> dispatch(setNumbers(!numbersCheckbox))} defaultChecked={numbersCheckbox}/>
                    <span>
                        Numbers
                    </span>
                </label>
            </div>
        </div>
    );
}
 
export default Configuration;