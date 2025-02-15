
const db = require('../config/db');
// Get all species
exports.getAllSpecies = async (req, res) => {
  try {
    // Call the model method to fetch all species
    const sqlQuery = 'SELECT * FROM species ORDER BY id ASC'; // Adjust query as needed
    db.query(sqlQuery, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while fetching species.' });
      }

      // Respond with fetched species data
      res.status(200).json({
        message: 'Species fetched successfully.',
        species: result.rows, // Return the rows from the query result
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred while fetching species.' });
  }
};

// Add a new species
exports.addSpecies = async (req, res) => {
  try {
    const { name, scientific_name, status, habitat, causes, image_path } = req.body;

    console.log(req.body); // Debugging: Check incoming data

  
    // Corrected SQL query for PostgreSQL
    const sqlQuery = `
      INSERT INTO species (name, scientific_name, status, habitat, causes, image_path) 
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id
    `;

    const values = [name, scientific_name, status, habitat, causes, image_path];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while adding the species.' });
      }

      // Success response
      res.status(201).json({
        message: 'Species added successfully.',
        species: {
          id: result.rows[0].id, // Use the RETURNING clause to get the ID
          name,
          scientific_name,
          status,
          habitat,
          causes,
          image_path,
        },
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
};
// Update a species
exports.updateSpecies = async (req, res) => {
  const { id } = req.params; // Extract species ID from the URL
  const { name, scientific_name, status, population, causes, image_path } = req.body; // Extract fields from the request body

  // Validate that all fields are provided
  if (!name || !scientific_name || !status || !habitat || !causes || !image_path) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // SQL query to update the species record
    const sqlQuery = `
      UPDATE species
      SET name = $1, scientific_name = $2, status = $3, population = $4, causes = $5, image_path = $6
      WHERE id = $7
      RETURNING *;
    `;

    const values = [name, scientific_name, status, habitat, causes, image_path, id];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while updating the species.' });
      }

      // Check if any row was updated
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Species not found.' });
      }

      // Send the updated species data
      res.status(200).json({
        message: 'Species updated successfully.',
        updatedSpecies: result.rows[0], // Return the updated record
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred while updating the species.' });
  }
};


// Delete a species
exports.deleteSpecies = async (req, res) => {
  const { id } = req.params; // Extract species ID from the URL

  try {
    // SQL query to delete the species record
    const sqlQuery = `
      DELETE FROM species
      WHERE id = $1
      RETURNING *;
    `;

    const values = [id];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ error: 'An error occurred while deleting the species.' });
      }

      // Check if any row was deleted
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Species not found.' });
      }

      // Send the success response
      res.status(200).json({
        message: 'Species deleted successfully.',
        deletedSpecies: result.rows[0], // Return the deleted record for reference
      });
    });
  } catch (err) {
    console.error('Unexpected Error:', err);
    res.status(500).json({ error: 'An unexpected error occurred while deleting the species.' });
  }
};

// Check if a species exists
exports.checkSpecies = async (req, res) => {
  const speciesName = req.query.name; // Get species name from query parameters

  // Validate that species name is provided
  if (!speciesName) {
    return res.status(400).json({ message: 'Species name is required.' });
  }

  try {
    // SQL query to check if a species exists
    const sqlQuery = `
      SELECT EXISTS (
        SELECT 1
        FROM species
        WHERE LOWER(name) = LOWER($1)
      ) AS exists;
    `;

    const values = [speciesName];

    // Execute the query
    db.query(sqlQuery, values, (err, result) => {
      if (err) {
        console.error('Database Error:', err);
        return res.status(500).json({ message: 'An error occurred while checking species.' });
      }

      // Retrieve the result of the existence check
      const exists = result.rows[0].exists;

      // Respond with the existence status
      res.status(200).json({ exists });
    });
  } catch (error) {
    console.error('Unexpected Error:', error);
    res.status(500).json({ message: 'An unexpected error occurred while checking species.' });
  }
};
