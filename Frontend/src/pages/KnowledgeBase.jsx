// KnowledgeBase.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from "react-cookie";
import AppNavBar from '../components/navbar'; // Update the path accordingly

// Assuming you have the backend_url defined
const backend_url = "http://localhost:3000/api/v1/users";

const KnowledgeBase = () => {
    const [knowledgeBaseEntries, setKnowledgeBaseEntries] = useState([]);
    const [cookies, removeCookies] = useCookies([]);
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [title, setTitle] = useState('');
    const [searchText, setSearchText] = useState('All Knowledge Base Entries');

    useEffect(() => {
        // Fetch all knowledge base entries initially
        getAllKnowledgeBase();
    }, [cookies]);

    const getAllKnowledgeBase = async () => {
        try {
            if (!cookies.token) {
                navigate("/");
            }
            const response = await axios.get("http://localhost:3000/api/v1/users/users/knowledgebase", {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            console.log(response.data);

            if (response.data && response.data && response.data.knowledgeBaseEntries) {
                setKnowledgeBaseEntries(response.data.knowledgeBaseEntries);
                setSearchText('All Knowledge Base Entries');
            } else {
                console.error('Invalid response format:', response);
                // Optionally, you can display an error message to the user
                // setErrorMessage('Error fetching knowledge base entries');
            }

        } catch (error) {
            console.error('Error fetching knowledge base entries:', error);
            // Optionally, you can display an error message to the user
            // setErrorMessage('Error fetching knowledge base entries');
        }
    };

    const searchByCategory = async () => {
        try {
            if (!cookies.token) {
                navigate("/");
            }
            const response = await axios.get("http://localhost:3000/api/v1/users/knowledgebase/category", {
                params: { category },
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.knowledgeBaseEntries && Array.isArray(response.data.knowledgeBaseEntries)) {
                setKnowledgeBaseEntries(response.data.knowledgeBaseEntries);
                setSearchText(`Knowledge Base Entries for Category: ${category}`);
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching knowledge base entries:', error);
        }
    };

    const searchBySubcategory = async () => {
        try {
            if (!cookies.token) {
                navigate("/");
            }
            const response = await axios.get("http://localhost:3000/api/v1/users/knowledgebase/subCategory", {
                params: { subcategory }, // Use params instead of body for a GET request
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.knowledgeBaseEntries && Array.isArray(response.data.knowledgeBaseEntries)) {
                setKnowledgeBaseEntries(response.data.knowledgeBaseEntries);
                setSearchText(`Knowledge Base Entries for Subcategory: ${subcategory}`);
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching knowledge base entries:', error);
        }
    };

    const searchByTitle = async () => {
        try {
            if (!cookies.token) {
                navigate("/");
            }
            const response = await axios.get(`${backend_url}/knowledgebase/title`, {
                params: { title }, // Use params instead of body for a GET request
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.data.knowledgeBaseEntries && Array.isArray(response.data.knowledgeBaseEntries)) {
                setKnowledgeBaseEntries(response.data.knowledgeBaseEntries);
                setSearchText(`Knowledge Base Entries for Title: ${title}`);
            } else {
                console.error('Invalid response format:', response);
            }
        } catch (error) {
            console.error('Error fetching knowledge base entries:', error);
        }
    };

    return (
        <div>
            <AppNavBar /> {/* Include your navigation bar */}
            <h2>Knowledge Base</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <label htmlFor="category">Category:</label>
                    <select
                        name="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        style={{ width: '100%' }}
                    >
                        <option value="">Select Category</option>
                        <option value="Software">Software</option>
                        <option value="Hardware">Hardware</option>
                        <option value="Network">Network</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div style={{ flex: 1, marginRight: '10px' }}>
                    <label htmlFor="subcategory">Subcategory:</label>
                    <select
                        name="subcategory"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                        style={{ width: '100%' }}
                    >
                        <option value="">Select Subcategory</option>
                        <option value="Desktops">Desktops</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Printers">Printers</option>
                        <option value="Servers">Servers</option>
                        <option value="Networking equipment">Networking equipment</option>
                        <option value="Operating system">Operating system</option>
                        <option value="Application software">Application software</option>
                        <option value="Custom software">Custom software</option>
                        <option value="Integration issues">Integration issues</option>
                        <option value="Email issues">Email issues</option>
                        <option value="Internet connection problems">Internet connection problems</option>
                        <option value="Website errors">Website errors</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <div style={{ flex: 1 }}>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <button onClick={searchByCategory} style={{ flex: 1 }}>Search by Category</button>
                <button onClick={searchBySubcategory} style={{ flex: 1 }}>Search by Subcategory</button>
                <button onClick={searchByTitle} style={{ flex: 1 }}>Search by Title</button>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <h3>{searchText}</h3>
                <ul>
                    {knowledgeBaseEntries.map((entry) => (
                        <li key={entry._id}>
                            <strong>Title:</strong> {entry.title}, <strong>Category:</strong> {entry.category},{' '}
                            <strong>Subcategory:</strong> {entry.subCategory}, <strong>Answer:</strong> {entry.answer}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default KnowledgeBase;
