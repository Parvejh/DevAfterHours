const User = require("../Models/User")
const bcrypt = require('bcrypt');
const generateToken = require('../Utils/generateToken')

// Create New User
module.exports.createUser = async (req,res)=>{
    try{
        const {name,email,password,bio} = req.body;

        // Check if user already exist
        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exist.",
            })
        }

        // Hash Password
        const hashedPassword = await bcrypt.hash(password,12);

        // Create User
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
    }catch(error){
        console.error(`Error while creating User : ${error}`)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

// Login User
module.exports.login = async (req,res)=>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if(!user){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            })
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(401).json({
                success:false,
                message:"Invalid credentials",
            })
        }

        // Generate token
        const token = generateToken(user._id);

        return res.status(200).json({
            success:true,
            message:`Login Successfull`,
            data:{
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    avatar:user.avatar,
                    bio:user.bio,
                    // -- Exposes role information for future admin-aware UI; the backend still enforces permissions.
                    isAdmin:user.isAdmin
                },
                token
            }
        })

    }catch(error){
        console.error(`Error while Sign In : ${error}`)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
        })
    }
}

// Get current User
module.exports.getCurrentUser = async (req,res)=>{
    try{
        return res.status(200).json({
            success:true,
            message:"User retrieved successfully",
            user:req.user
        })
    }catch(error){
        console.error(`Server Error in getting current User : ${error}`);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error.",
        })
    }
}
