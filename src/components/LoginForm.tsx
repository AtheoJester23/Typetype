import { Link } from "react-router-dom";

const LoginForm = () => {
    return (  
        <form className="formLogin">
            <h1 className="text-center font-bold text-3xl text-[rgb(23,23,23)]">Login</h1>

            <div className="flex flex-col gap-2">
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-gray-500">Email: </label>
                    <input type="text" name="email" id="email" className="border border-gray-500 rounded p-[10px]" placeholder="Enter email address"/>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-gray-500">Password: </label>
                    <input type="text" name="password" id="password" className="border border-gray-500 rounded p-[10px]" placeholder="Password"/>
                </div>

            </div>
            <button className="bg-green-500 text-white font-bold rounded p-[7px]">Submit</button>
        
            <p className="text-center">
                Don't have an account? <Link to={'/'} className="text-green-500">Sign Up</Link>
            </p>
        </form>
    );
}
 
export default LoginForm;