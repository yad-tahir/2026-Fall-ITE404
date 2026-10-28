const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const app = express();
const port = 3000;

// --- View Engine Setup ---
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// --- Middleware ---
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


// --- Routes ---

app.get('/', function (req, res) {
	let users = [];

	const usersCookie = req.cookies.users;

	if (usersCookie) {
		try {
			users = JSON.parse(usersCookie);
		} catch (e) {
			// If parsing fails (e.g., bad cookie), default to empty array
			console.error('Error parsing users cookie:', e);
			users = [];
		}
	}

	res.render('index', { users: users });
});

app.post('/register', function (req, res) {
	const { username, password } = req.body;

	// Basic validation
	if (!username || !password) {
		return res.status(400).send('Username and password are required.');
	}

	// --- Get existing users from cookie ---
	let users = [];
	const usersCookie = req.cookies.users;
	if (usersCookie) {
		try {
			users = JSON.parse(usersCookie);
		} catch (e) {
			users = [];
		}
	}

	// Create a new user object
	const newUser = {
		username: username,
		password: password
	};

	users.push(newUser); //append to array

	// --- Save the updated array back to the cookie ---
	const usersJson = JSON.stringify(users);

	// WARNING: Cookies have a size limit (around 3.5 to 4KB).
	res.cookie('users', usersJson, {
		signed: true,
		httpOnly: true, // Helps prevent XSS attacks
		maxAge: 7 * 24 * 60 * 60 * 1000 // Cookie expires in 7 days
	});

	console.log('New user added. Array saved to cookie.');
	console.log(users);

	// Redirect the user back to the homepage (/)
	res.redirect('/');
});


// --- Start the Server ---
app.listen(port, function () {
	console.log(`Server is running on http://localhost:${port}`);
});
