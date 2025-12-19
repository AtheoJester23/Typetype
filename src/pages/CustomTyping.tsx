import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ClipLoader } from "react-spinners";
import type { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import {  setPerfectScore, setScore} from "../state/Scoring/scoring";
import Result from "../components/Result";
import { fetchData} from "../state/references/referenceSlice";
import { setToken } from "../state/Token/tokenSlice";
import { useParams } from "react-router-dom";
import { type customsType } from "../components/ConfigurationCustom";
import { setNumbers, setPunctuation } from "../state/Config/configSlice";

type customData = {
    _id: string, 
    title: string,
    content: string,
    userId: string,
    collectionName: string,
    collectionId: string
}

const CustomTyping = () => {
    // Redux state and dispatch
    const [loading, _] = useState<boolean>(false)
    const [done, setDone] = useState<boolean>(false)

    const scoring = useSelector((state: RootState) => state.scoring.score)
    const perfectScore = useSelector((state: RootState) => state.scoring.perfectScore)
    const dispatch = useDispatch<AppDispatch>()
    
    const userId = localStorage.getItem("userId");
    const {id} = useParams();

    // Mode:
    const [modes, setModes] = useState<customData[]>([])

    const {theme} = useTheme();
    const [reference, setReference] = useState<string | null>(null)
    const [num, setNum] = useState<number>(0);

    const textRef = useRef<HTMLTextAreaElement>(null);

    const [input, setInput] = useState("");
    const [started, setStarted] = useState<number>(0);
    const [wpm, setWpm] = useState<number>(0)
    const [time, setTime] = useState<number>(0)

    const textDisplayRef = useRef<HTMLDivElement>(null);
    
    const enter = (document.getElementById("userInput") as HTMLTextAreaElement);

    // Checkbox states
    const punctuationCheckbox = useSelector((state: RootState) => state.config.punctuation);
    const numbersCheckbox = useSelector((state: RootState) => state.config.numbers);

    const handleNext = () => {
        setInput("");
        setNum(prev => prev < modes.length - 1 ? prev + 1 : 0);
        setDone(false);
        dispatch(setScore(0));
    }

    const handleFinish = () => {
        setInput("");
        handleStop()
        console.log("Na stop")
        setDone(true);
    }

    const handleStop = () => {
        const elapsed = (Date.now() - started) / 1000; // seconds
        const totalWPM = (((perfectScore / 5) / (elapsed / 60)).toFixed(2))
        setWpm(Math.ceil(Number(totalWPM)));
        setTime(Math.floor(elapsed));
    }

    useEffect(()=>{
        dispatch(fetchData());
        
        const getAllCustoms = async () => {
            try {
                const res = await fetch(import.meta.env.VITE_GET_COLLECTIONS + `/${userId}`);

                if(!res.ok){
                    throw new Error(`${res.status}`)
                }

                const data = await res.json();

                const filteredData: customData[] = data.data.filter((item: customsType) => item.collectionId == id);
                setModes(filteredData)
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        console.log(getAllCustoms());
    }, [])

    useEffect(()=> {
        if(modes.length > 0){
            setReference("2 This next;")

            if(punctuationCheckbox && numbersCheckbox){
                setReference(modes[num].content)
                dispatch(setPerfectScore(modes[num].content.length));
            }else if(punctuationCheckbox && !numbersCheckbox ){
                setReference(modes[num].content.replace(/^[^a-z]+/gi, "").replace(/[ ]/gi, " ").replace(/[0-9]/gi, "").trim())
                dispatch(setPerfectScore(modes[num].content.replace(/^[^a-z]+/gi, "").replace(/[0-9 ]/gi, " ").trim().length));
            }else if(!punctuationCheckbox && numbersCheckbox){
                setReference(modes[num].content.trim().toLocaleLowerCase().replace(/[^0-9a-z ]/g, ""))
                dispatch(setPerfectScore(modes[num].content.trim().toLocaleLowerCase().replace(/[^0-9a-z ]/g, "").length));
            }else{
                setReference(modes[num].content.trim().toLocaleLowerCase().replace(/[^a-z ]/gi, "").trim())
                dispatch(setPerfectScore(modes[num].content.trim().toLocaleLowerCase().replace(/[^a-z ]/gi, "").trim().length));
            }
        }

        setInput("");

        console.log(perfectScore)

    }, [num, modes , reference, punctuationCheckbox, numbersCheckbox])
    
    useEffect(() => {
        if (!enter) return;

        
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentChar = reference?.split("")[input.length]


            if(e.key.length === 1){
                if(e.key === currentChar && scoring >= 0){
                    // console.log("score is counted on submission.. delete this")
                } 
            }else if (e.key === "Enter") {
                e.preventDefault();
                // console.log(input);
                const theReference = reference?.slice(0, input.length)

                const theScore = theReference?.split('').map((item, index) => item === input[index]).filter(item => item === true).length;
                dispatch(setScore(theScore));

                // console.log("Enter button pressed...")
                
                handleFinish();
            }else if(e.key === "Backspace" && input.length > 0){
                // To decrease score on backspace if last character was correct;
                if(input.split('').at(-1) === reference?.split("")[input.length - 1]){
                    // console.log("score is counted on submission.. delete this 2")
                }

            }
        };

        enter.addEventListener("keydown", handleKeyDown);

        return () => {
            enter.removeEventListener("keydown", handleKeyDown);
        };
    }, [enter, handleNext]);

    useEffect(()=>{
        if(input.length != 0 && input.length == perfectScore){            
            handleStop();
            const theReference = reference?.slice(0, input.length)

            const theScore = theReference?.split('').map((item, index) => item === input[index]).filter(item => item === true).length;
            dispatch(setScore(theScore));

            setInput("");
            handleFinish();
        }

        if(input.length == 1){
            setStarted(Date.now());
            console.log("testing")
        }
    }, [input])

    return (  
        <div className="flex justify-center items-center h-screen flex-col gap-5">
            {!done && (
                <div className="flex justify-center items-center border bg-black rounded shadow-xl">
                    <select 
                        className="bg-[rgb(18,18,18)] text-white py-2 rounded px-5 text-center hover:cursor-pointer font-bold" 
                        defaultValue="default" 
                        onChange={(e)=>{
                            setNum(modes.findIndex(item => item._id == e.target.value));
                        }}
                    >
                            <option className="text-gray-500 bg-[rgb(23,23,23)]" value="default" disabled>Select a topic</option>
                            {modes.length > 0 && (
                                <>
                                    {modes.map(item => (
                                        <option key={item._id} className="text-white hover:cursor-pointer" value={`${item._id}`}>{item.title}</option>
                                    ))}
                                </>
                            )}
                                            
                    </select>
        
                    <div className="flex gap-2 mx-2">
                        <label htmlFor="Punctuation" className="text-white flex gap-2 items-center font-bold cursor-pointer">
                            <input type="checkbox" name="Punctuation" id="Punctuation" onChange={()=>dispatch(setPunctuation(!punctuationCheckbox))} defaultChecked={punctuationCheckbox} className="peer h-4 w-4 appearance-none rounded border border-white-300 checked:bg-green-600 checked:border-none" />
                            <span className={`select-none`}>
                                Punctuation
                            </span>
                        </label>
                        <label htmlFor="Numbers" className="text-white flex gap-2 items-center font-bold cursor-pointer">
                            <input type="checkbox" name="Numbers" id="Numbers" onChange={()=> dispatch(setNumbers(!numbersCheckbox))} defaultChecked={numbersCheckbox} className="peer h-4 w-4 appearance-none rounded border border-white-300 checked:bg-green-600 checked:border-none" />
                            <span className={`select-none`}>
                                Numbers
                            </span>
                        </label>
                    </div>
                </div>
            )}
            
            <div className="refCont" id="textDisplay" ref={textDisplayRef}>
                {reference && !loading && !done ? (
                    <>
                        {reference.split("").map((char, index) => {
                            const isCorrect = input[index] === char;
                            const isTyped = index < input.length;
                            const colorClass = isCorrect
                                ? "text-green-500"
                                : isTyped
                                    ? "text-red-500"
                                    : char === " "
                                        ? "text-gray-700"
                                        : "text-gray-500";
        
                            return (
                                <span
                                    key={index}
                                    className={`${colorClass} ${
                                        char === " " ? "text-lg mx-2 mb-2" : "text-4xl"
                                    } font-mono`}
                                    >
                                    {char === " " ? "♦" : char}
                                </span>
                            );
                            })}
                    </>
                ) : done ? (
                    <>
                        <Result wpm={wpm} time={time}/>
                    </>
                ) : (
                    <div className="block jusify-center items-center">
                        <div className="flex justify-center items-center">
                            <ClipLoader color={theme === "dark" ? "#ffffff" : "#000000"} size={50} />
                        </div>
                    </div>
                )
                }
                
            </div>

            {reference && (
                <>
                    {!done && (
                        <textarea ref={textRef} value={input} onChange={(e) => {
                            setInput(e.target.value)
                        }
                    } className="border border-black p-5 w-[90%] bg-white rounded-lg" id="userInput" autoComplete="none" autoCorrect="none"></textarea>
                    )}
                        
                    
                    <div className="flex gap-2">
                        <button onClick={()=>{
                            handleNext();
                        }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer select-none">Next</button>
                    </div>
                </>
            )}
        </div>
    );
}
 
export default CustomTyping;