const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;


app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('view', {});
});

app.get('/api/users', (req, res) => {

	const users = [
		{ id: 1, name: 'Alice', role: 'Admin' },
		{ id: 2, name: 'Bob', role: 'User' },
		{ id: 3, name: 'Charlie', role: 'User' }
	];
	res.json(users);
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
	console.log('Press Ctrl+C to stop the server');
});
