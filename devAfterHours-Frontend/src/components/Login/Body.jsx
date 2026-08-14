import { LogIn,Mail,KeyRound,Eye,EyeClosed } from 'lucide-react';
import { useState } from 'react';

const Body = () => {
    const[email,setEmail] = useState('')
    const[password,setPassword] = useState('')
    const[showPassword,setShowPassword] = useState(false)

    const submitHandler = (e)=>{
        e.preventDefault();
    }

    const togglePassword = ()=>{
        console.log("clicked")
        setShowPassword(prev=>!prev)
    }

    return (
        <div className='h-full w-full'>
            <div className='flex gap-1 items-center mb-4'>
                <LogIn size={35}/>
                <h1 className='text-zinc-950 font-semibold'>
                    Sign In
                </h1>
            </div>
            <form onSubmit={(e)=>submitHandler(e)} className='flex flex-col items-stretch mb-4'>
                <div className="flex flex-col justify-center items-start mb-3">
                    <h2 className='text-zinc-900'>Email</h2>
                    <div className="w-full rounded text-lg flex items-center mt-1 px-2 bg-white/20">
                        <Mail />
                        <input 
                        type="text" 
                        name="email"
                        onChange={(e)=>{setEmail(e.target.value)}} 
                        value={email}
                        id="emailInput" 
                        className='w-full py-1 outline-none ml-2' 
                        placeholder='you@example.com' 
                        />
                    </div>
                </div>
                <div className="flex flex-col justify-center items-start mb-5">
                    <h2 className='text-zinc-900'>Password</h2>
                    <div className="w-full rounded text-lg flex items-center mt-1 px-2 bg-white/20">
                        <KeyRound />
                        <input 
                        type={showPassword && true ? "text": "password"}
                        name="password" 
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}
                        id="passwordInput" 
                        className='w-full py-1 outline-none ml-2' 
                        placeholder='password'/>
                        <button onClick={togglePassword}>
                            {showPassword&&true ? <Eye /> :<EyeClosed />}
                        </button>
                    </div>
                </div>
                <button className='bg-zinc-800 cursor-pointer text-white rounded active:scale-98 active:text-white/80 text-xl py-3'>Sign In</button>
            </form>
            <div className='flex items-center justify-between text-lg text-zinc-700'>
                <h3>Don't have an account yet?</h3>
                <a className='hover:text-zinc-950 cursor-pointer'>Register</a>
            </div>
        </div>
  )
}

export default Body
