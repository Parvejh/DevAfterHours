require('dotenv').config();
const http = require('http');
const app = require('./app');
const PORT = process.env.PORT || 3000;
const db = require('./Configs/db')

const server = http.createServer(app);

server.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})


