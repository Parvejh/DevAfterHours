const User = require("../Models/User")
const bcrypt = require('bcrypt');

// Create New User
module.exports.createUser = async (req,res)=>{
    try{
        const {name,email,password,bio} = req.body;

        const hashedPassword = bcrypt.hash(password,20);
        // Serach if the user already exist
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist.",
                email:email
            })
        }
        await User.create({
            name,
            email,
            password:hashedPassword,
            bio
        })
        return res.status(201).json({
            success:true,
            message:"User created successfully!",
        })
    }catch(e){
        console.log(`Error while creating User : ${e}`)
        return res.status(500).json({
            success:false,
            message:"Error in creating User",
            error:e
        })
    }
}

// Display Login Page
module.exports.loginPage = (req,res)=>{
    return res.status(200).json({
        success:true,
        message:"Welcome to Login Page"
    })
}

// Login the User
module.exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        const isPasswordValid = bcrypt.compare(password,user.password);

        if(!user){
            return res.status(400).json({
                success:false,
                message:"User does not exist",
            })
        }
        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            })
        }

        return res.status(201).json({
            success:true,
            message:`Hello, ${user.name}`,
        })

    }catch(e){
        console.log(`Error while Sign In : ${e}`)
        return res.status(500).json({
            success:false,
            message:"Error in Sign In.",
            error:e
        })
    }
}