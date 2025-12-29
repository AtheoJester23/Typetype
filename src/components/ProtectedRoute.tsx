import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../state/store";
import { setToken } from "../state/Token/tokenSlice";

const ProtectedRoute = ({children}: {children: ReactNode}) => {
    const token = useSelector((state: RootState) => state.token.token);
    const dispatch = useDispatch<AppDispatch>();

    const [checking, setChecking] = useState(true)
    
    useEffect(() => {
        const checkSession = async () => {
            if(!token){
                try {
                    const res = await fetch(import.meta.env.VITE_REFRESH, {
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

    if(checking) return null;

    if(!token){
        return <Navigate to="/" replace/>
    }






    //OLD CODE:
    // if(isTokenExpired(token)){
    //     localStorage.removeItem("token");
    //     localStorage.removeItem("userId");
    //     dispatch(setToken(null));
    //     dispatch(setCollections(null));
    //     return null;
    // }

    // useEffect(()=>{
    //     const expTime = getTokenExpiration(token);
    //     if(!expTime) return;        

    //     const currentTime = Date.now();
    //     const timeUntilExpiration = expTime - currentTime;

    //     console.log(timeUntilExpiration);

    //     const timeoutId = setTimeout(async ()=>{
            
    //         try {
    //             const res = await fetch(import.meta.env.VITE_TEST_LOGOUT, {
    //                 method: "POST",
    //                 credentials: "include"
    //             })

    //             if(!res.ok){
    //                 throw new Error(`${res.status}`)
    //             }

    //             console.log("Token Expired...");
    //             localStorage.removeItem("token");
    //             localStorage.removeItem("userId");
    //             dispatch(setToken(null));
    //             dispatch(setCollections(null));
    //             navigate("/")

    //             const data = await res.json();

    //             console.log("Response: ", data)
    //         } catch (error) {
    //             console.error((error as Error).message)
    //         }
    //     }, timeUntilExpiration)

    //     return () => clearTimeout(timeoutId);

    // }, [token, navigate])

    return children;
}
 
export default ProtectedRoute;