import { Navigate, useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";

const LoginPage = () => {;
    const navigate = useNavigate()
    const token = useSelector((state: RootState) => state.token.token);

    useEffect(()=>{
        if(token){
            navigate("/Custom")
        }

        console.log("This is token: ", token)
    }, [token])

    return (  
        <div className="loginPage">
            <LoginForm/>
        </div>
    );
}
 
export default LoginPage;