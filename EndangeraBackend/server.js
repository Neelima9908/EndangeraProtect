require('dotenv').config();
const express = require('express');
const db = require('./config/db');
const speciesRoutes = require('./routes/speciesRoutes');
const userRoutes = require('./routes/userRoutes');
const actionsRoutes = require('./routes/actionsRoutes');
//const authMiddleware = require('./middleware/authMiddleware');
const errorMiddleware = require('./middleware/errorMiddleware');
const { Sequelize } = require('sequelize');
const cors = require('cors');


// Initialize the express app
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
  }));
// Connect to PostgreSQL


// Middleware for parsing JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use('/WildLife_API/species', speciesRoutes);
app.use('/Users_API/users', userRoutes);
app.use('/Actions_API/actions', actionsRoutes);

// Replace these with your actual PostgreSQL connection details
const sequelize = new Sequelize('wildlife_db', 'postgres', 'gnani999', {
  host: 'localhost',     // Or the IP address of your PostgreSQL server
  dialect: 'postgres',   // Set the dialect to PostgreSQL
  port: 5432,        // Default PostgreSQL port
});

// Test the connection
sequelize.authenticate()
  .then(() => {
    console.log('Database connected!');
      // Sync the models with the database
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });



// Error middleware
//app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
