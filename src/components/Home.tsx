import { useEffect, useRef } from "react";
import { useTheme } from "../context/ThemeContext";

const Home = () => {
    const {theme} = useTheme();

    const textExample = "Abcdef test";

    const textRef = useRef<HTMLTextAreaElement>(null);

    const theInput = document.getElementById("userInput");
    const textDisplayRef = useRef<HTMLDivElement>(null);
    
    useEffect(()=>{
        const inputElement = textRef.current;
        const textDisplayElement = textDisplayRef.current;

        if(!inputElement || !textDisplayElement) return;

        const handleInput = (e: Event) => {
            const fromUser = (e.target as HTMLTextAreaElement).value;
            const theLength: number = fromUser.length;

            textDisplayElement.innerHTML = textExample
                .split("")
                .map((char, index) => {
                    const isCorrect = fromUser[index] === char;
                    const isTyped = index < fromUser.length;
                    const colorClass =
                        isCorrect
                        ? "text-green-500"
                        : isTyped
                        ? "text-red-500"
                        : "text-gray-500";
                    return `<span class="${colorClass} text-4xl font-mono">${char}</span>`;
                })
                .join("");
        }

        inputElement.addEventListener("input", handleInput);

        return () => {
            inputElement.removeEventListener("input", handleInput);
        }
    }, [theme]);


    return (  
        <div className="flex justify-center items-center h-screen flex-col gap-5">
            <div className="flex" id="textDisplay" ref={textDisplayRef}>
                {textExample.split('').map((char, index) => (
                    <span key={index} className={`${theme === "light" ? "text-gray-500" : "text-gray-500"} text-4xl font-mono`}>{`${char}`}</span>
                ))}
            </div>
        <textarea ref={textRef} className="border border-black p-5 w-[90%] bg-white rounded-lg" id="userInput"></textarea>
            <button onClick={()=>console.log(textRef.current?.value)} className="bg-green-500 text-black font-bold py-2 px-5 rounded -translate-y-1 hover:translate-none duration-200 hover:cursor-pointer">Testing</button>
        </div>
    );
}
 
export default Home;