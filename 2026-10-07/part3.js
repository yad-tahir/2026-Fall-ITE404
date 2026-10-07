const http = require('http');
const port = 8080;

// Create the server
const server = http.createServer(function (req, res){
	const url = req.url.toLowerCase();
	// Set the response header: Status code 200 (OK) and Content-Type to text/html
	res.writeHead(200, { 'Content-Type': 'text/html' });
	date = new Date().toISOString();
	let pageContent;
	if(url === '/' || url === '/bright'){
		//The backtick primits a multi-line string value
		pageContent = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Dynamic Web Content</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			line-height: 1.6;
			margin: 2em;
			background-color: #f4f4f4;
			color: #333;
		}
		header, section, footer {
			background: #fff;
			padding: 1.5em;
			margin-bottom: 1em;
			border-radius: 8px;
			box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		}
		table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 1em;
		}
		th, td {
			border: 1px solid #ddd;
			padding: 8px;
			text-align: left;
		}
		th {
			background-color: #f2f2f2;
		}
	</style>
</head><body><header><h1>Dynamic Web Content - Bright Theme</h1></header><main><section>
			<h2>Current Date <br /> and Time</h2>
			<p>${date}</p>
		</section>
	</main>
</body>
</html>`;
	}else if(url === '/dark'){

		pageContent = `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Dynamic Web Content</title>
	<style>
		body {
			font-family: Arial, sans-serif;
			line-height: 1.6;
			margin: 2em;
			background-color: #222;
			color: #fff;
		}
		header, section, footer {
			background: #000;
			padding: 1.5em;
			margin-bottom: 1em;
			border-radius: 8px;
			box-shadow: 0 2px 5px rgba(0,0,0,0.1);
		}
		table {
			width: 100%;
			border-collapse: collapse;
			margin-top: 1em;
		}
		th, td {
			border: 1px solid #ddd;
			padding: 8px;
			text-align: left;
		}
		th {
			background-color: #f2f2f2;
		}
	</style>
</head>
<body>
	<header>
		<h1>Dynamic Web Content - Dark Theme</h1>
	</header>

	<main>
		<section>
			<h2>Current Date and Time</h2>
			<p>${date}</p>
		</section>
	</main>
</body>
</html>`;
	}

//	res.write(`hello
// test`);
	// Send the HTML content as the response body
	res.end(pageContent);

});

// Start the server and listen on the specified port
server.listen(port, function (){
	console.log(`Server running at http://localhost:${port}/`);
});
