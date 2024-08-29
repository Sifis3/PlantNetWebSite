const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000; // Replace with your desired port

// MySQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'your_mysql_username',
    password: 'your_mysql_password',
    database: 'your_database_name'
});

connection.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL database:', err.stack);
        return;
    }
    console.log('Connected to MySQL database as id', connection.threadId);
});

// Middleware for parsing JSON body
app.use(express.json());

// Endpoint for signing up
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    // Insert user into database
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    connection.query(sql, [username, password], (err, results, fields) => {
        if (err) {
            console.error('Error inserting user:', err.stack);
            return res.status(500).send('Error inserting user');
        }

        console.log('User registered successfully:', username);
        res.status(200).send('User registered successfully');
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
