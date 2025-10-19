import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

const Result = () => {
    const scoring = useSelector((state: RootState) => state.scoring.score)

    return (  
        <section className="resultContainer">
            <h1 className="text-4xl font-mono text-white">Result</h1>
            
            <div>
                <h1 className="text-green-500">{scoring}</h1>
            </div>
        </section>
    );
}
 
export default Result;