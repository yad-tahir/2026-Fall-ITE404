const http = require('http');

const server = http.createServer();


var base = 2;
function adjustByAdding(input) {
    return parseInt(input) + base;
}


server.on('request', (req,res) => {
    console.log('HandleReq has been called');
    for(let i=0; i < 10; i++){

	// res.write('Hello from the Web\n');

		res.write(''+adjustByAdding(i)+'\n');
    }
    res.end();

});


server.on('error', function (err){

    if (err.code === 'EADDRINUSE') {
	console.error(`Port 8080 is already in use. Retrying in 2 seconds...`);

	setTimeout(function (){
	    server.close(function (){
		server.listen(8124, function (){
		    console.log(`Server listening after retry on port ${PORT}`);
		});
	    });
	}, 2000);
    } else {
	console.error('Server error:', err);
    }
});

//H.W.
var connectionCount = 0;
server.on('connection', function(socket) {
	connectionCount++;
	const clientId = connectionCount;

	console.log(`\n--- Connection #${clientId} Established ---`);
	console.log(`Local Address: ${socket.localAddress}:${socket.localPort}`);
	console.log(`Remote Address: ${socket.remoteAddress}:${socket.remotePort}`);

	socket.on('end', function (){
		console.log(`--- Connection #${clientId} Ended ---`);
	});

	socket.on('error', function (err){
		console.error(`Socket Error on connection #${clientId}:`, err.message);
	});
});



server.listen(8080, function (){
    console.log('the server has started and now we are listening to port 8080');
});

console.log('Server running at http://127.0.0.1:8080/');
