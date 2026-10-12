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
	<title>Simple Node.js Form (GET)</title>
</head>
<body>
	<div>
		<h1>Submit Your Details (GET Method)</h1>
		<!-- Form now uses GET method. Data will be visible in the URL. -->
		<form method="GET" action="/submit">
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
	// url.parse(req.url, true) automatically parses the query string for GET requests
	const requestUrl = url.parse(req.url, true);
	const method = req.method.toUpperCase();

	// 1. Handle GET request to show the form (main page)
	if (method === 'GET' && requestUrl.pathname === '/') {
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(generateHtmlForm());
		return;
	}

	// 2. Handle GET request to parse the form data (submitted form)
	if (method === 'GET' && requestUrl.pathname === '/submit') {

		// For GET requests, the form data is already parsed into an object
		// in requestUrl.query thanks to the 'true' argument in url.parse()
		const parsedData = requestUrl.query;
		let responseContent;

		// Create a response page to show the parsed data without any styling
		responseContent = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Form Data Received (GET)</title>
</head>
<body>
	<div>
		<h1>Success! Form Data Parsed (GET)</h1>
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
