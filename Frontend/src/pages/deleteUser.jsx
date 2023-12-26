import React, { useState } from 'react';
import axios from 'axios';
import AppNavBar from '../components/navbar'; // Import your Navbar component

// Assuming you have the backend_url defined
const backend_url = "http://localhost:3000/api/v1/users";

const DeleteUser = () => {
  const [email, setEmail] = useState('');

  const deleteUser = async () => {
    try {
      // Send a DELETE request to your backend with the email to delete
      await axios.delete(`${backend_url}/delete-user`, { data: { email } });

      // Clear the form after successful deletion
      setEmail('');

      console.log('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <AppNavBar /> {/* Include your Navbar component */}
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
      </div>
    </div>
  );
};

export default DeleteUser;
