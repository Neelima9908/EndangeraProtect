import React, { useState, useEffect } from 'react';
import SpeciesCard from '../components/SpeciesCard'; // Ensure correct path to SpeciesCard component
import '../styles/Learn.css'; // Include your styles

const Learn = () => {
  const [speciesList, setSpeciesList] = useState([]);

  // Fetch species data on component mount
  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        const response = await fetch('http://localhost:5000/WildLife_API/species');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Fetched species:', data);
        console.log('Is data.species an array?', Array.isArray(data.species));
        setSpeciesList(data.species); // Update state with the species array
      } catch (error) {
        console.error('Failed to fetch species:', error);
      }
    };
  
    fetchSpecies();
  }, []);
  

  return (
    <div className="learn-container">
      <h1>Learn About Species</h1>
      {console.log('speciesList:', speciesList)}
    {console.log('Is speciesList an array?', Array.isArray(speciesList))}
      <div className="species-grid">
        {speciesList.length > 0 ? (
          speciesList.map((species) => (
            <SpeciesCard key={species.id} species={species} />
          ))
        ) : (
          <p>Loading species data or no species found...</p>
        )}
      </div>
    </div>
  );
};

export default Learn;
