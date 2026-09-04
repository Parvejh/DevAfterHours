import { useState } from "react"
import Body from "../components/Login/Body"
import Header from "../components/Login/Header"

const Login = () => {
    const [loginPage,setLoginPage] = useState(true);

    const toggleLoginPage = ()=>{
        setLoginPage(prev=>!prev)
    }

    return (
        <div 
        className="bg-blue-100 min-h-full w-full bg-cover flex items-center justify-center py-10">
            <div className="bg-white/20 backdrop-blur-md min-h-9/12 w-lg rounded-lg bg-blend-saturation px-10 py-10 border border-white/20 shadow-xl flex flex-col gap-10">
                <Header />
                <Body 
                page={loginPage?"login":"register"}
                toggleLoginPage={toggleLoginPage} />
            </div>

        </div>
    )
}

export default Login
