// DeleteUser.js

import React, { useState } from 'react';
import axios from 'axios';
import AppNavBar from '../components/navbarAdmin';

const backend_url = "http://localhost:3000/api/v1/admins";

const DeleteUser = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const deleteUser = async () => {
    try {
      await axios.delete(`${backend_url}/delete-user`, {
        data: { email },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Clear the form after successful deletion
      setEmail('');
      setErrorMessage(''); // Clear any previous error message
      setSuccessMessage('User deleted successfully!');
      console.log('User deleted successfully!');
    } catch (error) {
      setSuccessMessage(''); // Clear any previous success message
      setErrorMessage(error.response?.data?.error || 'Internal server error');
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <AppNavBar />
      <h2>Delete User</h2>
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <label>Email:</label>
        <input
          type="text"
          placeholder="User Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={deleteUser}>Delete User</button>
        {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
      </div>
    </div>
  );
};

export default DeleteUser;
