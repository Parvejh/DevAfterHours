const express = require('express');
const app = express();
// const routes = require('./Routes/homeRoute');
const authRoutes = require('./Routes/authRoutes')
const postRoutes = require('./Routes/postRoutes')
const categoryRoutes = require('./Routes/categoryRoutes')
const cors = require('cors');

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/api/auth',authRoutes)
app.use('/api/posts',postRoutes)
app.use('/api/categories',categoryRoutes)

module.exports  = app;