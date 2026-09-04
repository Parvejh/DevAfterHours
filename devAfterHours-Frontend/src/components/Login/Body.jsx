import { LogIn,Mail,KeyRound,Eye,EyeClosed,User, UserPen } from 'lucide-react';
import { useState } from 'react';
import { loginUser , registerUser } from '../../services/authServices';
import {useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';

const Body = ({page,toggleLoginPage}) => {
    const[name,setName] = useState('')
    const[bio,setBio] = useState('')
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[showPassword,setShowPassword] = useState(false)
    const[errors, setErrors] = useState({});
    const[isLoading,setIsLoading] = useState(false);
    const[error,setError] = useState('');

    const navigate = useNavigate();
    const {login} = useAuth();

    const submitLoginHandler = async (e)=>{
        e.preventDefault();
        const isValid = validateForm();
        setError("")
        if (!isValid) {
            return;
        }

        setIsLoading(true);

        // Login user
        try{
            const response = await loginUser({
                email,
                password
            })
            // set the user into local storage
            // localStorage.setItem("token",data.data.token)

            // using context
            login(response.data.token,response.data.user)

            console.log("Login successfull : ",response)
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

    const submitRegisterHandler = async (e)=>{
        e.preventDefault();
        const isValid = validateRegisterForm();
        setError("")
        if (!isValid) {
            return;
        }

        setIsLoading(true);

        // Register user
        try{
            await registerUser({
                name,
                email,
                password,
                bio
            })
            // Redirect to home page after successfull login
            // navigate('/')
            toggleLoginPage()
            navigate('/login')

        }catch(error){
            setError(
                error.response?.data?.message || 
                "Something went Wrong. Please try again!"
            )
            console.error(`Register failed : ${error}`)
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
    const validateRegisterForm = ()=>{
        const newErrors = {};

        if (!name.trim()) {
            newErrors.name = "Name is required";
        }
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
        if (!bio.trim()) {
            newErrors.bio = "Bio is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    }

    if(page==='login'){
        // Return login Body
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
                <form onSubmit={(e)=>submitLoginHandler(e)} className='flex flex-col items-stretch mb-4'>
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
                    <a 
                    className='hover:text-zinc-950 cursor-pointer'
                    onClick={toggleLoginPage}
                    >
                        Register
                    </a>
                </div>
                <p className='text-sm text-zinc-800 tracking-wide text-center mt-2 pt-2\=-]90[7812356`4T   border-t-1 border-zinc-500'>
                    Code. Learn. Build. Repeat.
                </p>
            </div>
        )
    }else{
        // Return register body
        return (
            <div className='h-full w-full'>
                <div className='flex gap-1 items-center mb-4'>
                    <LogIn size={20}/>
                    <h1 className='text-zinc-950 font-semibold'>
                        Register
                    </h1>
                </div>
                {error && (
                    <div className="mb-5 rounded-xl border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-600">
                        {error}
                    </div>
                )}
                <form onSubmit={(e)=>submitRegisterHandler(e)} className='flex flex-col items-stretch mb-4'>
                    <div className="flex flex-col justify-center items-start mb-3">
                        <h2 className='text-zinc-900'>Name</h2>
                        <div className={`w-full rounded text-lg flex items-center mt-1 px-2 bg-white/20`}>
                            <User />
                            <input 
                            type="text" 
                            name="name"
                            onChange={(e)=>{setName(e.target.value)}} 
                            value={name}
                            id="nameInput" 
                            className="w-full py-1 outline-none ml-2"
                            placeholder='John Doe' 
                            />
                        </div>
                        <div className='text-red-600 py-1'>
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </div>
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
                    <div className="flex flex-col justify-center items-start mb-3">
                        <h2 className='text-zinc-900'>Bio</h2>
                        <div className={`w-full rounded text-lg flex items-start mt-1 px-2 py-2 bg-white/20`}>
                            <UserPen />
                            <textarea 
                            type="text" 
                            name="bio"
                            onChange={(e)=>{setBio(e.target.value)}} 
                            value={bio}
                            id="bioInput" 
                            rows={4}
                            className="w-full py-1 outline-none ml-2"
                            placeholder='I am a deverloper...' 
                            />
                        </div>
                        <div className='text-red-600 py-1'>
                            {errors.bio && (
                                <p className="mt-1 text-sm text-red-700">
                                    {errors.bio}
                                </p>
                            )}
                        </div>
                    </div>
                    <button className='bg-zinc-800 cursor-pointer text-white rounded active:scale-98 active:text-white/80 text-xl py-3'>
                        {isLoading?"Creating User..":"Register"}
                    </button>
                </form>
                <div className='flex items-center justify-between text-lg text-zinc-700'>
                    <h3>Already registered ?</h3>
                    <a 
                    className='hover:text-zinc-950 cursor-pointer'
                    onClick={toggleLoginPage}
                    >
                        Sign In
                    </a>
                </div>
                <p className='text-sm text-zinc-800 tracking-wide text-center mt-2 pt-2\=-]90[7812356`4T   border-t-1 border-zinc-500'>
                    Code. Learn. Build. Repeat.
                </p>
            </div>
        )
    }


}

export default Body
