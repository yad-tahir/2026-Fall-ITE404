function handleReq(req,res){
    res.end('Hello from the Web\n');
}


const http = require('http');

const server = http.createServer(handleReq);

server.listen(80);

console.log('Server running at http://127.0.0.1:8124/');
