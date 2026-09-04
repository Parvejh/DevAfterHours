const mongoose = require("mongoose");
const { kMaxLength } = require("node:buffer");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        kMaxLength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowecase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    avatar:{
        type:String,
        default:null
    },
    bio:{
        type:String,
        trim:true,
        maxLength:500,
        default:null
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

module.exports = mongoose.model('User',userSchema)