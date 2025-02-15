import React, { useState } from 'react';
import '../styles/Actions.css';

const Actions = () => {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [species_id, setSpeciesId] = useState('');
  const [message, setMessage] = useState(''); // To display success/error messages
  const [actions, setActions] = useState([]); // Store actions locally

  const handleAddAction = async (e) => {
    e.preventDefault();
    try {
      const payload = { type, description, date, species_id };
      console.log(payload);
      const response = await fetch('http://localhost:5000/Actions_API/actions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newAction = await response.json();
        setMessage('Action added successfully!');
        setActions((prevActions) => [...prevActions, newAction]); // Add new action to the list

        // Reset form fields
        setType('');
        setDescription('');
        setDate('');
        setSpeciesId('');
      } else {
        const errorText = await response.text();
        setMessage(`Failed to add action. Server returned: ${errorText}`);
      }
    } catch (error) {
      console.error('Error adding action:', error);
      setMessage('An error occurred while adding the action.');
    }
  };

  return (
    <div className="actions-container">
      <div className="actions-content">
        <h2>Actions</h2>
        {message && <p className="message">{message}</p>}

        <form onSubmit={handleAddAction} className="add-action-form">
          <input
            type="text"
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="form-input"
          />
          <input
            type="number"
            placeholder="Species ID"
            value={species_id}
            onChange={(e) => setSpeciesId(e.target.value)}
            required
            className="form-input"
          />
          <button type="submit" className="form-button">Add Action</button>
        </form>

        <h3>Action List:</h3>
        <ul>
          {actions.map((action, index) => (
            <li key={index}>
              {action.type} - {action.description}
            </li>
          ))}
        </ul>
      </div>

      <div className="image-container">
        <img src="/assets/ark.avif" alt="Wildlife" className="sidebar-image" />
      </div>
    </div>
  );
};

export default Actions;
