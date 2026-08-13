const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxLength:200
    },
    slug:{
        type:String,
        trim:true,
        unique: true,
        lowercase: true,
        index: true,
    },
    excerpt:{
        type:String,
        required:true,
        maxLength:200,
        trim:true
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    coverImage:{
        type:String,
        default:null,
        trim:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    tags:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Tag' 
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    status:{
        type:String,
        enum :['draft','published','archived'],
        default:'draft'
    },
    publishedAt:{
        type:Date,
        default:null
    },
    views:{
        type:Number,
        default:0,
        min:0
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Post',postSchema);
