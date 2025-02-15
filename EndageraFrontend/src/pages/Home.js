import React from 'react';
import '../styles/Home.css';// Link to your CSS file
import { Link } from 'react-router-dom';

const Home = () => {
  
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>EndangeraProtect</h1>
      </header>
      <div className="mission-section">
        <div className="mission-content">
          
          <h3>
            Together for the Endangered  animals
          </h3>
          
          <Link to="/about">About Us</Link>
        </div>
        <div className="mission-image">
          <img src="/assets/backgorundimg.jpg" alt="Cheetah in the wild" />
        </div>
      </div>
     
    </div>
  );
};

export default Home;
