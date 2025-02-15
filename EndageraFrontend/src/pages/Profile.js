import React, { useState } from 'react';
import '../styles/Profile.css'; // Add your custom styles here

const Profile = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState(''); // For success/error messages

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLoginMode) {
        // Login logic
        const payload = { email, password };
        
        const response = await fetch('http://localhost:5000/Users_API/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          setMessage('Login successful!');
          // Store the JWT token in localStorage
          localStorage.setItem('authToken', data.token);
        } else {
          const errorText = await response.text();
          setMessage(`Login failed: ${errorText}`);
        }
      } else {
        // Sign-up logic
        const payload = { name, email, password };
        const response = await fetch('http://localhost:5000/Users_API/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setMessage('Sign-up successful! You can now log in.');
          setIsLoginMode(true); // Switch to login mode after successful sign-up
        } else {
          const errorText = await response.text();
          setMessage(`Sign-up failed: ${errorText}`);
        }
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setMessage('An error occurred during the request.');
    }
  };

  return (
    <div className="profile-container">
      <h1>{isLoginMode ? 'Login' : 'Sign Up'}</h1>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit} className="form">
        {!isLoginMode && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required={!isLoginMode}
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="form-button">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </button>
      </form>
      <button
        onClick={() => setIsLoginMode((prevMode) => !prevMode)}
        className="toggle-button"
      >
        Switch to {isLoginMode ? 'Sign Up' : 'Login'}
      </button>
    </div>
  );
};

export default Profile;
