import React from 'react';
import '../styles/SpeciesCard.css';

const SpeciesCard = ({ species }) => {
  return (
    <div className="species-card">
      <img src={species.image_path} alt={species.name} className="species-image" />
      <h3>{species.name}</h3>
      <p><strong>Scientific Name:</strong> {species.scientific_name}</p>
      <p><strong>Status:</strong> {species.status}</p>
      <p><strong>Habitat:</strong> {species.habitat}</p>
      <p><strong>Causes:</strong> {species.causes}</p>
    </div>
  );
};

export default SpeciesCard;
