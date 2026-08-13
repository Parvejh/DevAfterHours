const jwt = require("jsonwebtoken");
const User = require('../Models/User');


const authMiddleware = async (req,res,next)=>{
    try{
        // get Authorization header
        const authHeader = req.headers.authorization;

        // check if the token exists
        if(!authHeader || !authHeader.startsWith("Bearer ")){
            return res.status(401).json({
                success:false,
                message:"Authentication Required."
            })
        }

        // Extract token
        const token = authHeader.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        // Find User
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({
                success:false,
                message:"User not found"
            })
        }

        // Attach user to request
        req.user = user;

        next();

    }catch(error){
        console.error(`Authorization Error.`)
        return res.status(401).json({
            success:false,
            message:"Invalid or expired token"
        })
    }
}

module.exports = authMiddleware;