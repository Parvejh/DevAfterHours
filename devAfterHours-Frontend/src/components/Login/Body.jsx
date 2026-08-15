import { LogIn,Mail,KeyRound,Eye,EyeClosed } from 'lucide-react';
import { useState } from 'react';
import { loginUser } from '../../services/authServices';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const Body = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[showPassword,setShowPassword] = useState(false)
    const[errors, setErrors] = useState({});
    const[isLoading,setIsLoading] = useState(false);
    const[error,setError] = useState('');

    const navigate = useNavigate();
    const {login} = useAuth();

    const submitHandler = async (e)=>{
        e.preventDefault();
        const isValid = validateForm();
        setError("")
        if (!isValid) {
            return;
        }

        setIsLoading(true);

        // Login user
        try{
            const data = await loginUser({
                email,
                password
            })
            // set the user into local storage
            // localStorage.setItem("token",data.data.token)

            // using context
            login(data.data.token)

            console.log("Login successfull : ",data)
            // Redirect to home page after successfull login
            // navigate('/')
            navigate('/dashboard')

        }catch(error){
            setError(
                error.response?.data?.message || 
                "Something went Wrong. Please try again!"
            )
            console.error(`Login failed : ${error}`)
        }finally{
            setIsLoading(false);
        }

        // setTimeout(()=>{
        //     setIsLoading(false)
        // },3000)
    }

    const validateForm = ()=>{
        const newErrors = {};

        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Enter a valid email address";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    return (
        <div className='h-full w-full'>
            <div className='flex gap-1 items-center mb-4'>
                <LogIn size={20}/>
                <h1 className='text-zinc-950 font-semibold'>
                    Sign In
                </h1>
            </div>
            {error && (
                <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
                    {error}
                </div>
            )}
            <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col items-stretch mb-4'>
                <div className="flex flex-col justify-center items-start mb-3">
                    <h2 className='text-zinc-900'>Email</h2>
                    <div className={`w-full rounded text-lg flex items-center mt-1 px-2 bg-white/20`}>
                        <Mail />
                        <input 
                        type="text" 
                        name="email"
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        value={email}
                        id="emailInput" 
                        className="w-full py-1 outline-none ml-2"
                        placeholder='you@example.com' 
                        />
                    </div>
                    <div className='text-red-600 py-1'>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-700">
                                {errors.email}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start mb-5">
                    <h2 className='text-zinc-900'>Password</h2>
                    <div className={`w-full rounded text-lg flex items-center mt-1 px-2 bg-white/20`}>
                        <KeyRound />
                        <input 
                        type={showPassword && true ? "text": "password"}
                        name="password" 
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        id="passwordInput" 
                        className='w-full py-1 outline-none ml-2' 
                        placeholder='password'/>
                        <p onClick={()=>setShowPassword(prev=>!prev)}>
                            {showPassword&&true ? <Eye /> :<EyeClosed />}
                        </p>
                    </div>
                    <div className='text-red-600 py-1'>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-700">
                                {errors.password}
                            </p>
                        )}
                    </div>
                </div>
                <button className='bg-zinc-800 cursor-pointer text-white rounded active:scale-98 active:text-white/80 text-xl py-3'>
                    {isLoading?"Signing in..":"Sign In"}
                </button>
            </form>
            <div className='flex items-center justify-between text-lg text-zinc-700'>
                <h3>Don't have an account yet?</h3>
                <a className='hover:text-zinc-950 cursor-pointer'>Register</a>
            </div>
            <p className='text-sm text-zinc-800 tracking-wide text-center mt-2 pt-2\=-]90[7812356`4T   border-t-1 border-zinc-500'>
                Code. Learn. Build. Repeat.
            </p>
        </div>
    )
}

export default Body
