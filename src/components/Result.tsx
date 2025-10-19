import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

const Result = () => {
    const scoring = useSelector((state: RootState) => state.scoring.score)
    const perfectScore = useSelector((state: RootState) => state.scoring.perfectScore);

    const handleAccurcacy = () => {
        const fractionPart = scoring / perfectScore;
        let overall = fractionPart * 100;

        if(overall < 100){
            overall = overall.toFixed(2)
        }else{
            overall = Math.floor(overall)
        }

        return overall;
    }

    return (  
        <section className="resultContainer">
            <h1 className="text-4xl font-mono text-white">Result</h1>
            
            <div>
                <h1 className="text-green-500">Your Score: {scoring}</h1>
                <h1 className="text-green-500">Perfect Score: {perfectScore}</h1>
                <p>Accuracy: {handleAccurcacy()}%</p>
            </div>
        </section>
    );
}
 
export default Result;