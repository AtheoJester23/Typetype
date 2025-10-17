import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { ClipLoader } from "react-spinners";

const Home = () => {
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
    }

    console.log(url)

    useEffect(()=> {
        const fetchReferenceText = async () => {
            try {
                const res = await fetch(`${url}/${num}.json`)
                
                if(!res.ok){
                    throw new Error(`.`)
                }

                const data = await res.json();
                setReference(data);

                setTimeout(() => {
                    textRef.current?.focus();
                }, 0);
            } catch (error) {
                console.log(error as Error)
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
                handleNext();
            }
        };

        enter.addEventListener("keydown", handleKeyDown);

        return () => {
            enter.removeEventListener("keydown", handleKeyDown);
        };
    }, [enter, handleNext]);


    return (  
        <div className="flex justify-center items-center h-screen flex-col gap-5">
            <div className="refCont" id="textDisplay" ref={textDisplayRef}>
                {reference ? (
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
                ):(
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
                    }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Next</button>
                </>
            )}
        </div>
    );
}
 
export default Home;