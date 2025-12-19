import { useEffect, type ReactNode } from "react";
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

    useEffect(() => {
        if(token){
            const exp = getTokenExpiration(token);
            if(!exp) return;

            const theCurrentTime = Date.now();
            const remainingTime = exp - theCurrentTime;

            const theTimeOut = setTimeout(async ()=>{
                
                try {
                    const res = await fetch(import.meta.env.VITE_TEST_LOGOUT, {
                        method: "POST",
                        credentials: "include"
                    })
                    
                    if(!res.ok){
                        throw new Error(`${res.status}`)
                    }
                    
                    const data = await res.json();
                    
                    console.log("Token Expired, ibang <ProtectedRoute> to")
                    localStorage.removeItem("token");
                    dispatch(setToken(null));

                } catch (error) {
                    console.error((error as Error).message)
                }
            }, remainingTime)

            return () => clearTimeout(theTimeOut)
        }
    }, [token])
    
    return children;
}
 
export default CheckJWT;