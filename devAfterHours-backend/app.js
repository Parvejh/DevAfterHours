const express = require('express');
const app = express();
// const routes = require('./Routes/homeRoute');
const authRoutes = require('./Routes/authRoutes')
const postRoutes = require('./Routes/postRoutes')
const cors = require('cors');

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes)

module.exports  = app;