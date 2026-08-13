const mongoose = require('mongoose');
const { kMaxLength } = require('node:buffer');

const blogPostSchema = new mongoose.Schema({
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
        trim: true,
        index: true,
    },
    excert:{
        type:String,
        required:true,
        MaxLength:200
    },
    content:{
        type:String,
        required:true,
        trim:true
    },
    coverImage:{
        type:String,
        require:true,
        default:null
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
    },
},{
    timestamps:true
})

module.exports = mongoose.model('Post',postSchema);
