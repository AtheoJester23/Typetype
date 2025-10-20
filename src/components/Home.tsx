import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ClipLoader } from "react-spinners";
import type { AppDispatch, RootState } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../state/Loading/loadingSlice";
import { setDone, setPerfectScore, setScore, lessScore, addScore } from "../state/Scoring/scoring";
import Result from "./Result";
import { fetchData } from "../state/references/referenceSlice";

const Home = () => {
    // Redux state and dispatch
    const loading = useSelector((state: RootState) => state.loading.isLoading);
    const scoring = useSelector((state: RootState) => state.scoring.score)
    const perfectScore = useSelector((state: RootState) => state.scoring.perfectScore)
    const done = useSelector((state: RootState) => state.scoring.done)
    const dispatch = useDispatch<AppDispatch>()
    
    const fetched = useSelector((state: RootState) => state.fetching.data);
    // dispatch(setScore(0));


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
    }, [dispatch])

    useEffect(()=> {
        const fetchReferenceText = async () => {
            try {
                const res = await fetch(`${url}/${num}.json`)
                
                // dispatch(setLoading(true))

                if(!res.ok){
                    throw new Error(`.`)
                }

                const data = await res.json();
                setReference(data);
                dispatch(setPerfectScore(data.length));

                setTimeout(() => {
                    textRef.current?.focus();
                }, 0);
            } catch (error) {
                console.log(error as Error)
            }finally{
                dispatch(setLoading(false))
            }
        }

        fetchReferenceText();

        setInput("");

    }, [num, reference, url])
    
    useEffect(() => {
        if (!enter) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Enter") {
                e.preventDefault();
                // dispatch(setLoading(true))
                // handleNext();
                handleFinish();
            }else if(e.key === "Backspace"){
                // To decrease score on backspace if last character was correct;
                if(input.split('').at(-1) === reference?.split("")[input.length - 1]){
                    dispatch(lessScore());
                    console.log("right...")
                    console.log(reference?.split('')[input.length - 1])
                }

                console.log(input.length)
            }
        };

        enter.addEventListener("keydown", handleKeyDown);

        return () => {
            enter.removeEventListener("keydown", handleKeyDown);
        };
    }, [enter, handleNext]);

    useEffect(()=>{
        if(!reference) return;
        if(reference?.split("")[input.length - 1] == input.split('').at(-1)){
            //To increase score if inputted character is correct
            dispatch(addScore());
        }

        if(reference?.length == input.length){
            handleFinish();
        }
    }, [input])

    return (  
        <div className="flex justify-center items-center h-screen flex-col gap-5">
            <p className="text-gree-500 text-3xl">{scoring}</p>
            
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
                    <textarea ref={textRef} value={input} onChange={(e) => setInput(e.target.value)} className="border border-black p-5 w-[90%] bg-white rounded-lg" id="userInput" autoComplete="none" autoCorrect="none"></textarea>
                    <button onClick={()=>{
                        handleNext();
                        console.log(perfectScore)
                        console.log(done)
                    }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Next</button>
                    <button onClick={()=>{
                        console.log(fetched)
                    }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Log</button>
                
                    
                </>
            )}
        </div>
    );
}
 
export default Home;