const http = require('http');
const url = require('url');
const querystring = require('querystring'); // we might need it

const PORT = 8080;

function generateHtmlForm() {
	return `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Simple Node.js Form (POST)</title>
</head>
<body>
	<div>
		<h1>Submit Your Details (POST Method)</h1>
		<form method="POST" action="/submit">
			<label for="name">Full Name:</label>
			<input type="text" id="name" name="fullName" required placeholder="Ali Tahir"><br><br>

			<label for="email">Email Address:</label>
			<input type="email" id="email" name="emailAddress" required placeholder="ali.tahir@example.com"><br><br>

			<button type="submit">Send Data</button>
		</form>
	</div>
</body>
</html>
	`;
}

const requestHandler = function (req, res){
	const requestUrl = url.parse(req.url, true);
	const method = req.method.toUpperCase();

	// 1. Handle GET request to show the form (main page)
	if (method === 'GET' && requestUrl.pathname === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(generateHtmlForm());
		return;
	}

	// 2. Handle POST request to parse the form data (submitted form)
	if (method === 'POST' && requestUrl.pathname === '/submit') {
		let body = '';
		// Collect data chunks from the request body stream
		req.on('data', function (chunk){
			body += chunk.toString();
		});

		// Once all data is collected
		req.on('end', function () {
			let parsedData;
			let responseContent;

			try {
				// Parse the form data (application/x-www-form-urlencoded)
				parsedData = querystring.parse(body);

				// Create a response page to show the parsed data without any styling
				responseContent = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Form Data Received (POST)</title>
</head>
<body>
	<div>
		<h1>Success! Form Data Parsed (POST)</h1>
		<h2>Submitted Data (Parsed Query Object):</h2>
		<pre>${JSON.stringify(parsedData, null, 2)}</pre>
		<h2>Raw Query String:</h2>
		<pre>${requestUrl.search || ''}</pre>
		<p><a href="/">Go back to form</a></p>
	</div>
</body>
</html>
				`;

				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(responseContent);
				return;
			} catch (error) {
				console.error('Error parsing form data:', error);
				res.writeHead(500, { 'Content-Type': 'text/plain' });
				res.end('Server Error: Failed to parse form data.');
			}
		});

		// Handle potential request errors
		req.on('error', function (err) {
			console.error('Request error:', err);
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			res.end('Server Error: Request stream failed.');
		});
		return;
	}
	// Handle 404 Not Found for other routes
	res.writeHead(404, { 'Content-Type': 'text/plain' });
	res.end('404 Not Found');
};

// Create the server instance
const server = http.createServer(requestHandler);

// Start the server
server.listen(PORT, function (err){
	if (err) {
		return console.log('Something bad happened', err);
	}
	console.log(`Server is listening on http://localhost:${PORT}`);
});
