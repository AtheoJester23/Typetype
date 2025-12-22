import { useEffect, useState, type ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { getTokenExpiration } from "../utils/getTokenExpiration";
import { setToken } from "../state/Token/tokenSlice";

const CheckJWT = ({children}: {children: ReactNode}) => {
    const token = useSelector((state: RootState) => state.token.token);
    const dispatch = useDispatch<AppDispatch>()

    if(!token) {
        dispatch(setToken(null));
    };

    const [checking, setChecking] = useState(true)
        
    useEffect(() => {
        const checkSession = async () => {
            if(!token){
                try {
                    const res = await fetch(import.meta.env.VITE_TEST_REFRESH, {
                        method: "POST",
                        credentials: "include"
                    })

                    if(!res.ok){
                        throw new Error(`${res.status}`)
                    }

                    const data = await res.json();

                    console.log(data);
                    dispatch(setToken(data.accessToken))

                } catch (error) {
                    console.error((error as Error).message)
                }
            }
            setChecking(false)
        }

        checkSession();

    }, [])
    
    return children;
}
 
export default CheckJWT;