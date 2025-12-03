import { useEffect, useState } from "react";
import Custombtns from "../components/Custombtns";

const CustomOptions = () => {
    const [collections, setCollections] = useState();
    const userId = localStorage.getItem("userId")

    console.log("-------------------> ", userId)

    useEffect(() => {
        async function getCollections(){
            try {
                if(!userId){
                    return
                }
                const res = await fetch(import.meta.env.VITE_GET_COLLECTIONS + `/${userId}`);

                if(!res.ok){
                    throw new Error(`${res.status}`)
                }

                const data = await res.json();

                console.log(data);
            } catch (error) {
                console.error((error as Error).message)
            }
        }

        getCollections();
    }, []);

    return (  
        <div className="customPage">
            <Custombtns/>
        </div>
    );
}
 
export default CustomOptions;