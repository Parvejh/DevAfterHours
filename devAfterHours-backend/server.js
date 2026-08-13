const http = require('http');
const PORT = 8000;



const server = http.createServer();


server.listen(PORT,()=>{
    console.log(`Server is running on PORT : ${PORT}`);
})