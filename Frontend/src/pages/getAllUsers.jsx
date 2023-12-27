import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import AppNavBar from '../components/navbarAdmin'; // Update the path accordingly

function AllUsers() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cookies, removeCookies] = useCookies([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                if (!cookies.token) {
                    // Redirect to login or handle unauthorized access
                    console.log('User is not authenticated. Redirecting to login...');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/v1/admins/Allusers', {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                setAllUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllUsers();
    }, [cookies]);

    return (
        <div>
            <AppNavBar /> {/* Include your navigation bar */}
            <div style={{ padding: '20px' }}>
                <h1 style={{ color: 'white' }}>All Users</h1>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr style={{ background: '#333', color: 'white' }}>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Username</th>
                                <th style={{ padding: '10px', border: '1px solid white' }}>Email</th>
                                {/* Add other table headers as needed */}
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers.map((user) => (
                                <tr key={user._id} style={{ background: '#444', color: 'white' }}>
                                    <td style={{ padding: '10px', border: '1px solid white', color: 'white' }}>{user.username}</td>
                                    <td style={{ padding: '10px', border: '1px solid white', color: 'white' }}>{user.email}</td>
                                    {/* Add other user information cells as needed */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AllUsers;
