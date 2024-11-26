import React, { useState } from 'react';
import axios from 'axios'; // Assuming axios is used for API calls
import { useNavigate } from 'react-router-dom'; // Assuming React Router is used
import Auth from '../utils/auth'; // For handling authentication
import { deleteUser } from '../api/userAPI.js'; // API call to delete the user

const Settings: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Function to handle user account update (email/password)
  const handleUpdateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation for password matching
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const userId = Auth.getToken(); // Assuming you're using the token to identify the user

      // Make a request to update email and/or password
      await axios.put(`/api/users/${userId}`, {
        email,
        password,
      });

      alert('Account updated successfully!');
    } catch (error) {
      console.error('Error updating account:', error);
      alert('Failed to update account. Please try again.');
    }
  };

  // Function to delete the user
  const handleDeleteUser = async () => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
      if (confirmed) {
        const token = Auth.getToken(); // Get the JWT token from your auth system
        await deleteUser(token); // Call the deleteUser API
        alert('User deleted successfully!');
        Auth.logout(); // Log the user out after account deletion
        navigate('/'); // Redirect to the home or login page after deletion
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Failed to delete user. Please try again.');
    }
  };

  return (
    <div>
      <h1>Settings</h1>

      <form onSubmit={handleUpdateAccount}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </div>

        <button type="submit">Update Account</button>
      </form>

      <button 
        onClick={handleDeleteUser} 
        style={{ backgroundColor: 'red', color: 'white', marginTop: '20px' }}
      >
        Delete My Account
      </button>
    </div>
  );
};

export default Settings;
