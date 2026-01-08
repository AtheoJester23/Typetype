import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../state/store";
import { useTheme } from "../context/ThemeContext";

const LoginPage = () => {;
    const navigate = useNavigate()
    const { theme } = useTheme();
    const token = useSelector((state: RootState) => state.token.token);

    useEffect(()=>{
        if(token){
            navigate("/")
        }

        console.log("This is token123: ", token)
    }, [token])

    return (  
        <div className="loginPage">
            <LoginForm/>
        </div>
    );
}
 
export default LoginPage;