import React, { useState } from 'react';
import AddSpeciesForm from '../components/AddSpeciesForm';

const SpeciesList = () => {
  const [speciesList, setSpeciesList] = useState([]);

  const handleAddSpecies = (newSpecies) => {
    setSpeciesList((prevList) => [...prevList, newSpecies]);
  };

  return (
    <div>
      <h1>Species Page</h1>
      <AddSpeciesForm onAdd={handleAddSpecies} />
      <div>
        {speciesList.map((species, index) => (
          <div key={index}>
            <h3>{species.name}</h3>
            <img src={`http://localhost:5000/WildLife_API/${species.image_path}`} alt={species.name} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpeciesList;
