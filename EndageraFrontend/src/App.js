import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Species from './pages/Species';
import Actions from './pages/Actions';
import Profile from './pages/Profile';
import Learn from './pages/Learn';
import About from './pages/About';
import SpeciesList from './components/SpeciesList';
import AuthProvider from './context/AuthContext';  // Import the AuthProvider

function App() {
  return (
    <AuthProvider>  {/* Wrap the entire Router with AuthProvider */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/species" element={<Species />} />
          <Route path="/actions" element={<Actions />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/specieslist" element={<SpeciesList />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
