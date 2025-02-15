const API_URL = 'http://localhost:5000/WildLife_API/species';

export const getAllSpecies = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};
