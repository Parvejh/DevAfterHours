const User = require("../Models/User")

module.exports.createUser = async (req,res)=>{
    try{
        const {name,email,password,bio} = req.body;
        // Serach if the user already exist
        const user = await User.findOne({email})
        if(user){
            return res.status(201).json({
                status:"error",
                message:"User already exist.",
                email:email
            })
        }
        await User.create({
            name,
            email,
            password,
            bio
        })
        return res.status(500).json({
            status:"success",
            message:"User created successfully!",
        })
    }catch(e){
        console.log(`Error while creating User : ${e}`)
        return res.status(201).json({
            status:"error",
            message:"Error in creating User",
            error:e
        })
    }
}

module.exports.loginPage = (req,res)=>{
    return res.status(500).json({
        status:"success",
        message:"Welcome to Login Page"
    })
}

module.exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(201).json({
                status:"error",
                message:"User does not exist",
            })
        }
        if(password !== user.password){
            return res.status(201).json({
                status:"error",
                message:"Invalid Password",
            })
        }

        return res.status(201).json({
            status:"success",
            message:`Hello, ${user.name}`,
        })

    }catch(e){
        console.log(`Error while Sign In : ${e}`)
        return res.status(201).json({
            status:"error",
            message:"Error in Sign In.",
            error:e
        })
    }
}