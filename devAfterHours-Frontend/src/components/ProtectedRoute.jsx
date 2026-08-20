import { Navigate} from "react-router-dom"
import {useAuth} from "../context/AuthContext"
import Navbar from "../components/Home/Navbar"
const ProtectedRoute = ({children}) => {
    const {isAuthenticated,isLoading,error} = useAuth();
    // User is not authenticated
    if(isLoading){
        return <>
                <Navbar />
                <div className="h-[90%] w-full flex items-center justify-center text-4xl text-zinc-8 00">     
                        Loading..
                </div>
                </> 
    }
    if(error){
        return <>
                <Navbar />
                <div className="bg-red-50 h-[90%] w-full flex items-center justify-center text-4xl text-red-400">     
                        {error}
                </div>
                </> 
    }

    if(!isAuthenticated){
        return <Navigate to='/login' />
    }
    return children
}

export default ProtectedRoute
