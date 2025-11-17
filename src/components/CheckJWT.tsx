import { useEffect, type ReactNode } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../state/store";
import { getTokenExpiration } from "../utils/getTokenExpiration";
import { setToken } from "../state/Token/tokenSlice";

const CheckJWT = ({children}: {children: ReactNode}) => {
    const token = localStorage.getItem("token");
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

            const theTimeOut = setTimeout(()=>{
                console.log("Token Expired")
                localStorage.removeItem("token");
                dispatch(setToken(null));
            }, remainingTime)

            return () => clearTimeout(theTimeOut)
        }
    }, [token])
    
    return children;
}
 
export default CheckJWT;