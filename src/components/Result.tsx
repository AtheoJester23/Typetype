import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { useTheme } from "../context/ThemeContext";

const Result = ({wpm, time}: {wpm: number, time: number}) => {
    const scoring = useSelector((state: RootState) => state.scoring.score)
    const perfectScore = useSelector((state: RootState) => state.scoring.perfectScore);
    const {theme} = useTheme();

    const handleAccurcacy = () => {
        const fractionPart: number = scoring / perfectScore;
        let overall: number = fractionPart * 100;

        if(overall < 100){
            overall = parseFloat(overall.toFixed(2))
        }else{
            overall = Math.floor(overall)
        }

        return overall;
    }

    return (  
        <section className={`resultContainer ${theme === "light" ? "bg-white! border-none" : "bg-[rgb(23,23,23)]! border-none"}`}>            
            <div className="stats">
                <div className={`flex flex-col justify-center items-center border rounded-lg shadow ${theme == "light" ? "border-[rgba(184,180,180)] border-2 border-dashed" : "border-[rgb(11,11,11)] border-2 border-dashed"}`}>
                    <h1 className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} text-7xl`}>{wpm}</h1>
                    <p className="text-green-500 font-bold">WPM</p>
                </div>
                
                <div className={`flex flex-col justify-center items-center border rounded-lg shadow ${theme == "light" ? "border-[rgba(184,180,180)] border-2 border-dashed" : "border-[rgb(11,11,11)] border-2 border-dashed"}`}>
                    <h1 className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} text-7xl`}>{handleAccurcacy()}%</h1>
                    <p className="text-green-500 font-bold">Accuracy</p>
                </div>

                <div className={`flex flex-col justify-center items-center border rounded-lg shadow ${theme == "light" ? "border-[rgba(184,180,180)] border-2 border-dashed" : "border-[rgb(11,11,11)] border-2 border-dashed"}`}>
                    <h1 className={`${theme == "light" ? "text-[rgb(23,23,23)]" : "text-white"} text-7xl`}>{time}s</h1>
                    <p className="text-green-500 font-bold">Time</p>
                </div>
            </div>
        </section>
    );
}
 
export default Result;