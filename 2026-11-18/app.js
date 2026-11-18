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

app.post('/api/users', (req, res) => {
	const receivedData = req.body;

	if (!receivedData || Object.keys(receivedData).length === 0) {
		return res.status(400).json({ error: 'No data provided in request body' });
	}

	res.json({
		message: 'Data received successfully',
		received: receivedData
	});
});
app.get('/api/users', (req, res) => {

	const users = [
		{ id: 1, name: 'Alice', role: 'Admin' },
		{ id: 2, name: 'Bob', role: 'User' },
		{ id: 3, name: 'Charlie', role: 'User' }
	];
	res.json(users);
});

app.get('/api/users/:id', (req, res) => {
	const userId = req.params.id;
	res.json({ message: `Fetching details for user ID: ${userId}` });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
	console.log('Press Ctrl+C to stop the server');
});
