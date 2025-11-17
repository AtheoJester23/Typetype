import { useEffect, type ReactNode } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { isTokenExpired } from "../utils/checkTokenExp";
import { getTokenExpiration } from "../utils/getTokenExpiration";

const ProtectedRoute = ({children}: {children: ReactNode}) => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    
    if(!token){
        return <Navigate to="/" replace/>
    }

    if(isTokenExpired(token)){
        localStorage.removeItem("token");
        return null;
    }

    useEffect(()=>{
        const expTime = getTokenExpiration(token);
        if(!expTime) return;

        

        const currentTime = Date.now();
        const timeUntilExpiration = expTime - currentTime;

        console.log(timeUntilExpiration);

        const timeoutId = setTimeout(()=>{
            console.log("Token Expired...");
            localStorage.removeItem("token");
            navigate("/")
        }, timeUntilExpiration)

        return () => clearTimeout(timeoutId);

    }, [token, navigate])

    return children;
}
 
export default ProtectedRoute;