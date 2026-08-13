const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    
})

// {
//   title,
//   slug,
//   excerpt,
//   content,
//   coverImage,

//   category,
//   tags,

//   status,
//   publishedAt,

//   views,

//   createdAt,
//   updatedAt
// }