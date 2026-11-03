const express = require('express');
const path = require('path');

const session = require('express-session'); // Import express-session


const app = express();
const port = 3000;

// --- View Engine Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(session({

	secret: 'a-very-strong-secret',
	resave: false, // Don't save session if unmodified

	saveUninitialized: true, // Create session even if new
	cookie: {
		secure: false, // Set to true if using HTTPS
		maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days, same as before
	}
});


app.post('/register', (req, res) => {
	const { username, password } = req.body;

	// Basic validation
	if (!username || !password) {
		return res.status(400).send('Username and password are required.');
	}

	// --- Get existing users from session ---
	// If req.session.users doesn't exist, start with an empty array
	const users = req.session.users || [];

	const newUser = {
		username: username,
		password: password
	};

	users.push(newUser); //append

	req.session.users = users;


	res.redirect('/');
});
