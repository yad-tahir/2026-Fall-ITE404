const express = require('express');
const path = require('path');

// Create an Express application
const app = express();
const port = 3000;


app.set('view engine', 'ejs');
//127.0.0.1/views/1.html
app.set('views', path.join(__dirname, 'views'));



app.get('/', (req, res) => {
  // This is the dynamic data we'll pass to the template
  const pageData = {
	title: 'Welcome to Templating!',
	message: 'EJS makes it easy to create dynamic HTML.',
	user: {
	  name: 'Alex',
	  isLoggedIn: true
	},
	items: ['Apple', 'Banana', 'Cherry']
  };

  res.render('index', pageData);
});


app.get('/about', (req, res) => {
    res.render('about', { title: 'About Us' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
