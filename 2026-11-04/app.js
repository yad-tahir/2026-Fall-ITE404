const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 3000;

const dbConfig = {
  host: "127.0.0.1",
  user: "hr",
  password: "pass123",
  database: "hr_app"
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.render('reg_form', { title: 'User Registration Form' });
});

app.post('/submit', (req, res) => {
  const { firstName, lastName, age, email } = req.body;

  if (!firstName || !lastName || !age || !email) {
	return res.status(400).send('All fields are required.');
  }

  const connection = mysql.createConnection(dbConfig);

  connection.connect((err) => {
	if (err) {
	  console.error('Error connecting to database:', err);
	  return res.status(500).send('Error connecting to the database. Please try again.');
	}

	const sql = 'INSERT INTO Person (first_name, last_name, age, email) VALUES (?, ?, ?, ?)';
	const values = [firstName, lastName, age, email];

	connection.query(sql, values, (queryErr, result) => {
	  connection.end((endErr) => {
		if (endErr) {
		  console.error('Error closing connection:', endErr);
		}
	  });

	  if (queryErr) {
		console.error('Database query error:', queryErr);
		return res.status(500).send('Error saving data to the database. Please try again.');
	  }

	  console.log(`New person added with ID: ${result.insertId}`);

	  res.render('success', {
		title: 'Submission Successful',
		message: 'Thank you! Your data has been saved.',
		userId: result.insertId
	  });
	});
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
