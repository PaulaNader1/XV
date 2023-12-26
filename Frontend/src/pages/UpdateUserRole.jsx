// UpdateUserRolePage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppNavBar from '../components/navbarAdmin'; // Update the path accordingly

const backend_url = "http://localhost:3000/api/v1/admins";

const UpdateUserRolePage = () => {
    const [email, setEmail] = useState('');
    const [newRole, setNewRole] = useState('');
    const [category, setCategory] = useState('');
    const [roleOptions] = useState(['user', 'admin', 'manager', 'agent']);
    const [categoryOptions] = useState(['Software', 'Hardware', 'Network']);
    const [successMessage, setSuccessMessage] = useState(null); // New state for success message

    const updateUserRole = async () => {
        try {
            const response = await axios.put(`${backend_url}/update-user-role`, {
                email,
                newRole,
                primaryCategory: newRole === 'agent' ? category : null,
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setSuccessMessage('User role updated successfully'); // Set success message
            console.log(response.data.message);
        } catch (error) {
            console.error('Error updating user role:', error.response?.data?.error || 'Internal server error');
        }
    };

    return (
        <div>
            <AppNavBar /> {/* Include your navigation bar */}
            <h2>Update User Role</h2>
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>} {/* Display success message */}
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="newRole">New Role:</label>
                <select
                    id="newRole"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                >
                    <option value="">Select Role</option>
                    {roleOptions.map((role) => (
                        <option key={role} value={role}>{role}</option>
                    ))}
                </select>
            </div>
            {newRole === 'agent' && (
                <div>
                    <label htmlFor="category">Category:</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Select Category</option>
                        {categoryOptions.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                        ))}
                    </select>
                </div>
            )}
            <button onClick={updateUserRole}>Update User Role</button>
        </div>
    );
};

export default UpdateUserRolePage;
