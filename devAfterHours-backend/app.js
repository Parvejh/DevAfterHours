const express = require('express');
const app = express();
const routes = require('./Routes/homeRoute');
const cors = require('cors');

app.set(cors());


app.use('/',routes)

module.exports  = app;