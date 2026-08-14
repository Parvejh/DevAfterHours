import Body from "../components/Login/Body"
import Header from "../components/Login/Header"

const Login = () => {
    return (
        <div 
        className="bg-[url(https://images.unsplash.com/photo-1464618663641-bbdd760ae84a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-full w-full bg-cover flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-md min-h-9/12 w-lg rounded-lg bg-blend-saturation px-10 py-10 border border-white/20 shadow-xl flex flex-col gap-10">
                <Header />
                <Body />
            </div>

        </div>
    )
}

export default Login
