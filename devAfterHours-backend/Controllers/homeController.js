module.exports.home = (req,res)=>{
    return res.status(200).json({
        status:"success",
        message:"Home Page"
    })
}