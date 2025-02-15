const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User registration
// Register a new user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Check if the user already exists
    const sqlQuery = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred during registration.' });
      }

      if (result.rowCount > 0) {
        return res.status(400).json({ error: 'Email already in use.' });
      }

      // Register the new user
      const insertQuery = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING id, name, email
      `;
      const insertValues = [name, email, password]; // Ensure to hash the password before storing

      db.query(insertQuery, insertValues, (err, result) => {
        if (err) {
          console.error('Database Error:', err);
          return res.status(500).json({ error: 'An error occurred during registration.' });
        }

        const newUser = result.rows[0];
        res.status(201).json({ message: 'User registered successfully.', user: newUser });
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred during registration.' });
  }
};
// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Check if the user exists
    const sqlQuery = 'SELECT * FROM users WHERE email = $1';
    const values = [email];

    db.query(sqlQuery, values, async (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred during login.' });
      }

      const user = result.rows[0];
      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid email or password.' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(200).json({ message: 'Login successful.', token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
};
