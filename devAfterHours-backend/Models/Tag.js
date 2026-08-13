const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema({
    name:{
        type:String,
    },
    slug:{
        type:String,
        trim:true,
        lowercase:true
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Tag',tagSchema);