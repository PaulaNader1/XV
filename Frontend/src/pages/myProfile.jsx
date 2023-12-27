// MyProfile.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppNavBar from '../components/navbar'; // Import your Navbar component

// Assuming you have the backend_url defined
const backend_url = "http://localhost:3000/api/v1/users";

const MyProfile = () => {
  const [user, setUser] = useState({});
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    // Fetch user information initially
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    try {
      // Replace ":id" with the actual user ID
      const uid = localStorage.getItem("userId");
      console.log(uid);
      const response = await axios.get(`${backend_url}/${uid}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error('Error getting user info:', error);
    }
  };

  const updateUsername = async () => {
    try {
      // Replace ":id" with the actual user ID
      const  id  = localStorage.getItem("userId");
      await axios.put(`${backend_url}/users/${id}/update-username`, {
        newUsername,
      }, {
        withCredentials: true,  
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Clear the form after successful update
      setNewUsername('');

      // Refresh user information after updating username
      getUserInfo();

      console.log('Username updated successfully!');
    } catch (error) {
      console.error('Error updating username:', error);
    }
  };

  const updatePassword = async () => {
    try {
      // Replace ":id" with the actual user ID
      const  id  = localStorage.getItem("userId");
      await axios.put(`${backend_url}/users/${id}/update-password`, {
        newPassword,
      }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Clear the form after successful update
      setNewPassword('');

      // Refresh user information after updating password
      getUserInfo();

      console.log('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div>
      <AppNavBar /> {/* Include your Navbar component */}
      <h2>My Profile</h2>
      {user?.email && (
        <div>
          <strong>Email:</strong> {user.email}
        </div>
      )}
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <strong>Username:</strong> {user?.username}
        <button onClick={updateUsername}>Update Username</button>
        <input
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </div>
      <div style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
        <button onClick={updatePassword}>Update Password</button>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
    </div>
  );

};

export default MyProfile;
