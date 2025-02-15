const db = require('../config/db');

// Get all actions
exports.getAllActions = async (req, res) => {
  try {
    // SQL query to get all actions
    const sqlQuery = `
      SELECT * 
      FROM actions;
    `;

    // Execute the query
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while fetching actions.' });
      }

      // Return the fetched actions as a response
      res.status(200).json(result.rows);
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An error occurred while fetching actions.' });
  }
};


// Add a new action
// Add a new action
exports.addAction = async (req, res) => {
  const { type, description, date, species_id } = req.body;

  // Validate that all fields are provided
  if (!type || !description || !date || !species_id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // SQL query to insert a new action
    const sqlQuery = `
      INSERT INTO actions (type, description, date, species_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;

    const values = [type, description, date, species_id];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while adding the action.' });
      }

      // Return the inserted action as a response
      res.status(201).json(result.rows[0]);
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred while adding the action.' });
  }
};


// Update an action
// Update an action
exports.updateAction = async (req, res) => {
  const { id } = req.params;
  const { type, description, date, species_id } = req.body;

  // Validate that all fields are provided
  if (!type || !description || !date || !species_id) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // SQL query to update an action
    const sqlQuery = `
      UPDATE actions
      SET type = $1, description = $2, date = $3, species_id = $4
      WHERE id = $5
      RETURNING *;
    `;

    const values = [type, description, date, species_id, id];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while updating the action.' });
      }

      // Check if the action was found and updated
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Action not found.' });
      }

      // Return the updated action as a response
      res.status(200).json(result.rows[0]);
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred while updating the action.' });
  }
};

// Delete an action
// Delete an action
exports.deleteAction = async (req, res) => {
  const { id } = req.params;

  try {
    // SQL query to delete an action by id
    const sqlQuery = `
      DELETE FROM actions
      WHERE id = $1
      RETURNING *;
    `;

    const values = [id];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while deleting the action.' });
      }

      // If no action was deleted, return a 404 response
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Action not found.' });
      }

      // Return a success message
      res.status(200).json({ message: 'Action deleted successfully.' });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred while deleting the action.' });
  }
};

