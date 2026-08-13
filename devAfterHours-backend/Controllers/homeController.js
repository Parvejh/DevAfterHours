module.exports.home = (req,res)=>{
    return res.status(500).json({
        status:"success",
        message:"Home Page"
    })
}