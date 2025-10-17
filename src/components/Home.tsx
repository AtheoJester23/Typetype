import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
    const {theme} = useTheme();
    const [reference, setReference] = useState<string>("This is an example text. And my short_goal with this is to text abcdefg 123")
    const [num, setNum] = useState<number>(2);

    const textRef = useRef<HTMLTextAreaElement>(null);

    const [input, setInput] = useState("");
    const textDisplayRef = useRef<HTMLDivElement>(null);
    
    const enter = document.getElementById("userInput");
    // useEffect(()=>{
    //     const inputElement = textRef.current;
    //     const textDisplayElement = textDisplayRef.current;

    //     if(!inputElement || !textDisplayElement) return;

    //     const handleInput = (e: Event) => {
    //         const fromUser = (e.target as HTMLTextAreaElement).value;
    //         const theLength: number = fromUser.length;

    //         textDisplayElement.innerHTML = reference
    //             .split("")
    //             .map((char, index) => {
    //                 const isCorrect = fromUser[index] === char;
    //                 const isTyped = index < fromUser.length;
    //                 const colorClass =
    //                     isCorrect
    //                     ? "text-green-500"
    //                     : isTyped
    //                     ? "text-red-500"
    //                     : char == " " ? "text-gray-700" : "text-gray-500";
    //                 return `<span class="${colorClass} ${char == " " ? "text-lg mx-2 mb-2" : "text-4xl"} font-mono">${char.replace(/[ ]/g, "&diams;")}</span>`;
    //             })
    //             .join("");
    //     }

    //     inputElement.value = "";

    //     inputElement.addEventListener("input", handleInput);

    //     return () => {
    //         inputElement.removeEventListener("input", handleInput);
    //     }
    // }, [reference]);

    const handleNext = () => {
        setInput("");
        setNum(prev => prev < 10 ? prev + 1 : 1);
    }

    useEffect(()=> {
        const fetchReferenceText = async () => {
            try {
                const res = await fetch(`https://typetypeapi-976af-default-rtdb.firebaseio.com/Ten%20Commandments/${num}.json`)
                
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

    }, [num, reference])

    useEffect(()=> {
        const enter = document.getElementById("userInput");
        enter?.addEventListener("keydown", (e) => {
            if(e.key === "Enter"){
                e.preventDefault();
                handleNext();
            }
        })
    }, [enter])


    return (  
        <div className="flex justify-center items-center h-screen flex-col gap-5">
            <div className="refCont" id="textDisplay" ref={textDisplayRef}>
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
            </div>
            <textarea ref={textRef} value={input} onChange={(e) => setInput(e.target.value)} className="border border-black p-5 w-[90%] bg-white rounded-lg" id="userInput" autoComplete="none" autoCorrect="none"></textarea>
            <button onClick={()=>{
                handleNext();
            }} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Next</button>
        </div>
    );
}
 
export default Home;