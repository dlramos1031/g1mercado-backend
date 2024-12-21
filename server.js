const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const protectedRoutes = require('./routes/protectedRoutes');
require('dotenv').config();

const app = express();
app.use(cors());
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.use('/api/protected', protectedRoutes); // Add the protected routes under /api/protected

// Signup Route
app.post('/register', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
      // Check if user already exists
      const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length > 0) {
          return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert user into database
      await db.promise().query('INSERT INTO users (role, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)', [
          "admin",
          firstname, 
          lastname, 
          email,
          hashedPassword,
      ]);

      res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error: Registration' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      // Find user in the database
      const [rows] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]);
      if (rows.length === 0) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      const user = rows[0];

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: 'Invalid email or password' });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
          expiresIn: '1h',
      });

      res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
  }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
