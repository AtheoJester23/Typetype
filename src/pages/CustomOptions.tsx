import { useEffect, useState } from "react";
import Custombtns from "../components/Custombtns";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";
import { setCollections } from "../state/Collections/collectionSlice";

const CustomOptions = () => {
    const dispatch = useDispatch<AppDispatch>()
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
                dispatch(setCollections(data.data));

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