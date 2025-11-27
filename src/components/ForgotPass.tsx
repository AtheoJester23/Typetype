const ForgotPass = () => {
    return (  
        <form className="bg-white p-5 rounded-xl flex flex-col gap-3">
            <h1 className="text-3xl font-bold">Password Reset</h1>
            <div>
                <p>Provide the email address associated with your account to reset your password</p>
            </div>

            <div>
                <input type="text" className="border border-gray-500 p-3 rounded w-full " placeholder="name@example.com"/>
            </div>
            <button className="bg-green-500 p-2 rounded-b-xl text-white font-bold border border-black -translate-y-0.25 hover:translate-none hover:cursor-pointer shadow hover:shadow-none duration-200">Submit</button>
        </form>
    );
}
 
export default ForgotPass;