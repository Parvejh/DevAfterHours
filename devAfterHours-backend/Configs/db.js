const mongoose = require('mongoose')


const db = mongoose.connect(process.env.MONGO_URI);

db.then(()=>{
    console.log("Mongoose connected!!")
})
.catch(()=>{
    console.log("Connection to Mongoose failed.")
})

module.exports = db;