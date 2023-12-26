import React, { useState } from 'react';
import axios from 'axios';
import AppNavBar from "../components/navbar";


const backend_url = "http://localhost:3000/api/v1/users";

const DeleteUser = () => {
  const [email, setEmail] = useState('');

  const deleteUser = async () => {
    try {

      await axios.delete(`${backend_url}/delete-user`, { data: { email } });

   
      setEmail('');

      console.log('User deleted successfully!');
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <AppNavBar /> {}
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
