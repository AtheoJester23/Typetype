import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ClipLoader } from "react-spinners";
import type { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../state/Loading/loadingSlice";
import { setDone, setPerfectScore, setScore, lessScore, addScore } from "../state/Scoring/scoring";
import Result from "./Result";
import { fetchData, setChosen, setMode } from "../state/references/referenceSlice";
import Configuration from "./Configuration";
import { setToken } from "../state/Token/tokenSlice";

const Home = () => {
    // Redux state and dispatch
    const loading = useSelector((state: RootState) => state.loading.isLoading);
    const scoring = useSelector((state: RootState) => state.scoring.score)
    const perfectScore = useSelector((state: RootState) => state.scoring.perfectScore)
    const done = useSelector((state: RootState) => state.scoring.done)
    const dispatch = useDispatch<AppDispatch>()
    const theRef = useSelector((state: RootState) => state.fetching.mode);

    const fetched: any = useSelector((state: RootState) => state.fetching.data);
    // dispatch(setScore(0));

    // Mode:
    const modeChosen = useSelector((state: RootState) => state.fetching.chosen);
    let currentMode = "";

    const {theme} = useTheme();
    const [reference, setReference] = useState<string | null>(null)
    const [num, setNum] = useState<number>(2);

    const textRef = useRef<HTMLTextAreaElement>(null);

    const [input, setInput] = useState("");
    const textDisplayRef = useRef<HTMLDivElement>(null);
    
    const enter = (document.getElementById("userInput") as HTMLTextAreaElement);

    // Checkbox states
    const punctuationCheckbox = useSelector((state: RootState) => state.config.punctuation);
    const numbersCheckbox = useSelector((state: RootState) => state.config.numbers)

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
        dispatch(setToken(localStorage.getItem("token")))
    }, [])

    useEffect(()=> {
        // initial setting for the reference;
        if(modeChosen.length < 1 && Object.keys(fetched).length > 0){
            dispatch(setChosen(theRef == "Quotes" ? fetched.Quotes : fetched["Ten Commandments"]))
            currentMode = theRef;
        }else{
            setReference("Something went wrong, try reloading the page...")
        }

        // if reference already exist
        if(modeChosen.length > 0){
            if(theRef != currentMode){
                currentMode = theRef
                dispatch(setChosen(currentMode == "Quotes" ? fetched.Quotes : fetched["Ten Commandments"]))
            }

            if(punctuationCheckbox == true){
                setReference(modeChosen[num])
            }else{
                setReference(modeChosen[num].toLocaleLowerCase().replace(/[^a-z0-9 ]/gi, ""))
            }

            dispatch(setPerfectScore(modeChosen[num].length));
        }

        setInput("");

    }, [theRef, num, reference, fetched, modeChosen, punctuationCheckbox])
    
    useEffect(() => {
        if (!enter) return;

        
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentInput = input.split('').at(-1);
            const currentChar = reference?.split("")[input.length]


            if(e.key.length === 1){
                if(e.key === currentChar && scoring >= 0){
                    console.log("score is counted on submission.. delete this")
                } 
            }else if (e.key === "Enter") {
                e.preventDefault();
                console.log(input);
                const theReference = reference?.slice(0, input.length)

                const theScore = theReference?.split('').map((item, index) => item === input[index]).filter(item => item === true).length;
                dispatch(setScore(theScore));

                console.log("Enter button pressed...")
                
                handleFinish();
            }else if(e.key === "Backspace" && input.length > 0){
                // To decrease score on backspace if last character was correct;
                if(input.split('').at(-1) === reference?.split("")[input.length - 1]){
                    console.log("score is counted on submission.. delete this 2")
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
            const theReference = reference?.slice(0, input.length)

            const theScore = theReference?.split('').map((item, index) => item === input[index]).filter(item => item === true).length;
            dispatch(setScore(theScore));

            setInput("");
            handleFinish();
        }
    }, [input])

    return (  
        <div className="flex justify-center items-center h-screen flex-col gap-5">
            <p className="text-white font-bold text-4xl">{scoring}</p>

            {!done && (
                <Configuration reference={reference!} setReference={setReference} />
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
                            handleNext();
                            console.log(perfectScore)
                            console.log(done)
                        }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Next</button>
                        
                        <button onClick={()=>{
                            console.log(localStorage.getItem("token"))
                        }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Check</button>
                    </div>
                </>
            )}
        </div>
    );
}
 
export default Home;