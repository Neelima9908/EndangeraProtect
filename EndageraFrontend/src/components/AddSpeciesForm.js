import React, { useState } from 'react';

const AddSpeciesForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [scientific_name, setScientificName] = useState('');
  const [status, setStatus] = useState('');
  const [causes, setCauses] = useState('');
  const [habitat, setHabitat] = useState('');
  const [image_path, setImage] = useState(null); // For file upload
  const [message, setMessage] = useState(''); // To display success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate if the species already exists
    try {
      const checkResponse = await fetch(`http://localhost:5000/WildLife_API/species/check?name=${encodeURIComponent(name)}`);
      console.log(checkResponse);
      if (checkResponse.ok) {
        const exists = await checkResponse.json();
        console.log(exists);
        if (exists.exists) {
          setMessage('Species already exists. Please add a different species.');
          return;  // Exit if species already exists
        } else {
          // Species does not exist, proceed to add it
     
          try {
            const payload = { name, scientific_name, status, habitat, causes, image_path };
const response = await fetch('http://localhost:5000/WildLife_API/species', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(payload),
});

           
            console.log(response);
            if (response.ok) {
              const data = await response.json();
              setMessage('Species added successfully!');
              onAdd(data); // Optionally, update parent state
            } else {
              const errorText = await response.text(); // Capture server error message if available
              setMessage(`Failed to add species. Server returned: ${errorText}`);
            }
          } catch (error) {
            console.error('Error adding species:', error);
            setMessage('An error occurred while adding the species.');
          }
  
          // Reset form fields after successful submission
          setName('');
          setScientificName('');
          setStatus('');
          setHabitat('');
          setCauses('');
          setImage('');
        }
      } else {
        const errorText = await checkResponse.text(); // Capture server error message if available
        setMessage(`Failed to validate species. Server returned: ${errorText}`);
        return;
      }
    } catch (error) {
      console.error('Error validating species:', error);
      setMessage('An error occurred during validation.');
      return;
    }
  };
  

  return (
    <div className="add-species-form-container">
      <h2>Add a New Species</h2>
      <form onSubmit={handleSubmit} className="add-species-form" encType="multipart/form-data">
        <input
          type="text"
          placeholder="Species Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Scientific Name"
          value={scientific_name}
          onChange={(e) => setScientificName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Conservation Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        />
        <textarea
          placeholder="Causes of Threat"
          value={causes}
          onChange={(e) => setCauses(e.target.value)}
          required
        ></textarea>
        <input
            type="text"
            placeholder="location & habitat"
            value={habitat}
            onChange={(e) => setHabitat(e.target.value)}
            required
        />

        
        <input
          type="text"
          value={image_path}
          onChange={(e) => setImage(e.target.value)}  // Capture the URL instead of file
          placeholder="Enter image URL"
          required
        />

        <button type="submit">Add Species</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddSpeciesForm;
