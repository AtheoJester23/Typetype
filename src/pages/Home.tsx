import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ClipLoader } from "react-spinners";
import type { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setDone, setPerfectScore, setScore} from "../state/Scoring/scoring";
import Result from "../components/Result";
import { fetchData, setChosen} from "../state/references/referenceSlice";
import Configuration from "../components/Configuration";

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
    const [num, setNum] = useState<number>(1);
    
    const [start, setStart] = useState<number>(0);
    const [wpm, setWpm] = useState<number>(0);
    const [time, setTime] = useState<number>(0);

    const textRef = useRef<HTMLTextAreaElement>(null);

    const [input, setInput] = useState("");
    const textDisplayRef = useRef<HTMLDivElement>(null);
    
    const enter = (document.getElementById("userInput") as HTMLTextAreaElement);

    // Checkbox states
    const punctuationCheckbox = useSelector((state: RootState) => state.config.punctuation);
    const numbersCheckbox = useSelector((state: RootState) => state.config.numbers);

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

    const handleStop = () => {
        const elapsed = (Date.now() - start) / 1000;
        const totalWPM = (((perfectScore / 5) / (elapsed / 60)).toFixed(2))
        setWpm(Math.ceil(Number(totalWPM)));
        setTime(Math.floor(elapsed));
    } 

    useEffect(()=>{
        dispatch(fetchData());
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

            //Situations:
            // Punctuation with number
            // Punctuation without number

            // Without Punctuation but with number
            // Without Punctuation and without number

            if(punctuationCheckbox && numbersCheckbox){
                setReference(modeChosen[num])
                dispatch(setPerfectScore(modeChosen[num].length));
            }else if(punctuationCheckbox && !numbersCheckbox ){
                console.log("This one")
                setReference(modeChosen[num].replace(/^[^a-z]+/gi, "").replace(/[0-9 ]/gi, " ").trim())
                dispatch(setPerfectScore(modeChosen[num].replace(/^[^a-z]+/gi, "").replace(/[0-9 ]/gi, " ").trim().length));
            }else if(!punctuationCheckbox && numbersCheckbox){
                setReference(modeChosen[num].trim().toLocaleLowerCase().replace(/[^0-9a-z ]/g, ""))
                dispatch(setPerfectScore(modeChosen[num].trim().toLocaleLowerCase().replace(/[^0-9a-z ]/g, "").length));
            }else{
                setReference(modeChosen[num].trim().toLocaleLowerCase().replace(/[^a-z ]/gi, "").trim())
                dispatch(setPerfectScore(modeChosen[num].trim().toLocaleLowerCase().replace(/[^a-z ]/gi, "").trim().length));
            }

            // if(numbersCheckbox == false){
            //     setReference(modeChosen[num].replace(/[\d]/g, ""))
            // }
        }

        setInput("");

    }, [theRef, num, reference, fetched, modeChosen, punctuationCheckbox, numbersCheckbox])
    
    useEffect(() => {
        if (!enter) return;

        
        const handleKeyDown = (e: KeyboardEvent) => {
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
            handleStop();

            setInput("");
            handleFinish();
        }

        if(input.length == 1){
            setStart(Date.now());
        }
    }, [input])

    return (  
        <div className="flex justify-center items-center h-screen flex-col gap-5">
            {!done && (
                <Configuration reference={reference!}/>
            )}
            
            <div className="refCont select-none" id="textDisplay" ref={textDisplayRef}>
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
                        <Result wpm={wpm} time={time}/>
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
                    </div>
                </>
            )}
        </div>
    );
}
 
export default Home;