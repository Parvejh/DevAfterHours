module.exports.login = (req,res)=>{
    return res.status(500).json({
        status:"success",
        message:"Login Page working."
    })
}