const express = require('express');
const app = express();
const port = 80;

//domain.name:80/add
app.post('/add', function (req, res){
});

app.post('/notes/:id/course/:subject' , function (req, res){
});

app.get('/news/articles/:id' , function (req, res){
    const id = req.params.id
});

app.get('/business/me', function (req, res){
});

//domain.name:80/business
app.get('/business', function (req, res){
});

app.get('/', function (req, res){

  const htmlContent = `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Express HTML Response</title>
	</head>
	<body>
		<div>
			<h1>Success!</h1>
			<p>
				This content was generated and sent directly from the
				<code>app.get('/')</code>
				route in your Express server.
			</p>
		</div>
	</body>
	</html>
  `;

    res.status(200).send(htmlContent);
});

app.listen(port, () => {
  console.log(`Express server running successfully at http://localhost:${port}`);
});
