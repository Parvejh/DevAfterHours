const mongoose = require('mongoose')


const db = mongoose.connect('mongodb://127.0.0.1:27017/devafterhoursDB');

db.then(()=>{
    console.log("Mongoose connected!!")
})
.catch(()=>{
    console.log("Connection to Mongoose failed.")
})

module.exports = db;