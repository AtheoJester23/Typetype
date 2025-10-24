import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ClipLoader } from "react-spinners";
import type { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../state/Loading/loadingSlice";
import { setDone, setPerfectScore, setScore, lessScore, addScore } from "../state/Scoring/scoring";
import Result from "./Result";
import { fetchData, setChosen, setMode } from "../state/references/referenceSlice";

const Home = () => {
    // Redux state and dispatch
    const loading = useSelector((state: RootState) => state.loading.isLoading);
    const scoring = useSelector((state: RootState) => state.scoring.score)
    const perfectScore = useSelector((state: RootState) => state.scoring.perfectScore)
    const done = useSelector((state: RootState) => state.scoring.done)
    const dispatch = useDispatch<AppDispatch>()
    const theRef = useSelector((state: RootState) => state.fetching.mode);

    const fetched = useSelector((state: RootState) => state.fetching.data);
    // dispatch(setScore(0));

    //Delete this:
    const modeChosen = useSelector((state: RootState) => state.fetching.chosen);


    const {theme, url} = useTheme();
    const [reference, setReference] = useState<string | null>(null)
    const [num, setNum] = useState<number>(2);

    const textRef = useRef<HTMLTextAreaElement>(null);

    const [input, setInput] = useState("");
    const textDisplayRef = useRef<HTMLDivElement>(null);
    
    const enter = (document.getElementById("userInput") as HTMLTextAreaElement);

    const handleNext = () => {
        setInput("");
        setNum(prev => prev < 10 ? prev + 1 : 1);
        dispatch(setDone(false));
        dispatch(setScore(0));
    }

    const handleFinish = () => {
        setInput("");
        dispatch(setDone(true));
    }

    useEffect(()=>{
        dispatch(fetchData());
    }, [])

    useEffect(() => {
        console.log("Changed mode...")
        // dispatch(setChosen(theRef));
    }, [theRef])

    useEffect(()=> {
        // if(Object.keys(fetched).length > 0){
        //     console.log("Existing")
        // }else{
        //     console.log("not")
        // }
        
        // fetchReferenceText();
        if(modeChosen.length < 1 && Object.keys(fetched).length > 0){
            dispatch(setChosen(fetched["Ten Commandments"]))
            console.log(fetched.Quotes)
        }else{
            setReference("Something went wrong, try reloading the page...")
        }

        setInput("");

    }, [num, reference, url, fetched])
    
    useEffect(() => {
        if (!enter) return;

        
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentInput = input.split('').at(-1);
            const currentChar = reference?.split("")[input.length]


            if(e.key.length === 1){
                console.log(e.key)
                console.log(currentChar);

                if(e.key === currentChar && scoring >= 0){
                    dispatch(addScore());
                } 
            }else if (e.key === "Enter") {
                e.preventDefault();
                // dispatch(setLoading(true))
                // handleNext();
                handleFinish();
            }else if(e.key === "Backspace" && input.length > 0){
                // To decrease score on backspace if last character was correct;
                if(input.split('').at(-1) === reference?.split("")[input.length - 1]){
                    dispatch(lessScore());
                    console.log("right...")
                    console.log(reference?.split('')[input.length - 1])
                }

                console.log(input.length)
            }

            if(input.length == perfectScore - 1){
                setInput("");
                handleFinish();
            }
        };

        enter.addEventListener("keydown", handleKeyDown);

        return () => {
            enter.removeEventListener("keydown", handleKeyDown);
        };
    }, [enter, handleNext]);

    return (  
        <div className="flex justify-center items-center h-screen flex-col gap-5">
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
            </div>

            <p>{}</p>
            
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
                ): done ? (
                    <>
                        <Result/>
                    </>
                ) : (
                    <div className="block jusify-center items-center">
                        <div className="flex justify-center items-center">
                            <ClipLoader color={theme === "dark" ? "#ffffff" : "#000000"} size={50} />
                        </div>
                    </div>
                )}
                
            </div>

            {reference && (
                <>
                    {!done && (
                        <textarea ref={textRef} value={input} onChange={(e) => setInput(e.target.value)} className="border border-black p-5 w-[90%] bg-white rounded-lg" id="userInput" autoComplete="none" autoCorrect="none"></textarea>
                    )}
                        
                    
                    <div className="flex gap-2">
                        <button onClick={()=>{
                            dispatch(setChosen(fetched.Quotes))
                        }} className="bg-yellow-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Test</button>
                        
                        <button onClick={()=>{
                            console.log(modeChosen)
                        }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Chosen</button>
                        
                        <button onClick={()=>{
                            handleNext();
                            console.log(perfectScore)
                            console.log(done)
                        }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Next</button>

                        <button onClick={()=>{
                            console.log(fetched)
                        }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Log</button>
                    
                        <button onClick={()=>{
                            console.log(theRef)
                        }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Mode</button>
                        
                    </div>
                </>
            )}
        </div>
    );
}
 
export default Home;