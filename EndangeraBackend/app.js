const express = require('express');
const speciesRoutes = require('./routes/speciesRoutes');
const userRoutes = require('./routes/userRoutes');
const actionsRoutes = require('./routes/actionsRoutes');
const errorHandler = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json()); // Middleware for parsing JSON

// Routes
app.use('/api/species', speciesRoutes);
app.use('/api/users', userRoutes);
app.use('/api/actions', actionsRoutes);

// Error handling middleware
app.use(errorHandler);

module.exports = app;
