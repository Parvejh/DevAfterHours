const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        trim:true,
        required:true,
        maxLength:50
    },
    slug:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Category',categorySchema);