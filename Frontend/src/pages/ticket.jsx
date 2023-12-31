import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppNavBar from '../components/navbar'; // Import your Navbar component

// Assuming you have the backend_url defined
const backend_url = "http://localhost:3000/api/v1/users";

const TicketPage = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [info, setInfo] = useState('');
    const [tickets, setTickets] = useState([]);
    const [knowledgeBase, setKnowledgeBase] = useState(null); // Added state for knowledge base entries
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Fetch user's tickets initially
        getTickets();
    }, []);

    // Fetch knowledge base entries when category and subcategory change
    useEffect(() => {
        if (category && subcategory) {
            provideCwf();
        }
    }, [category, subcategory]);

    const createTicket = async () => {
        try {
            await axios.post(`${backend_url}/create-ticket`, {
                title,
                category,
                subCategory: subcategory,
                issueinfo: info,
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Clear the form after successful ticket creation
            setTitle('');
            setCategory('');
            setSubcategory('');
            setInfo('');

            // Refresh the user's tickets after creating a new one
            getTickets();

            // Display success message
            setSuccessMessage('Ticket created successfully!');
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    const getTickets = async () => {
        try {
            // Replace ":id" with the actual user ID
            const uid = localStorage.getItem("userId");
            const response = await axios.get(`${backend_url}/tickets/${uid}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            setTickets(response.data.tickets);
        } catch (error) {
            console.error('Error getting tickets:', error);
        }
    };

    const provideCwf = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/agents/provideCwf", {
                params: {
                    Category: category,
                    subCategory: subcategory,
                },
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Update the knowledge base state with the response data
            setKnowledgeBase(response.data.data);
        } catch (error) {
            console.error('Error fetching knowledge base:', error);
        }
    };

    return (
        <div>
            <AppNavBar /> {/* Include your Navbar component */}
            <h2>Create Ticket</h2>
            <form>
                <label htmlFor="title">Title:</label>
                <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />

                <label htmlFor="category">Category:</label>
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Select Category</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Software">Software</option>
                    <option value="Network">Network</option>
                </select>

                <label htmlFor="subcategory">Subcategory:</label>
                <select name="subcategory" value={subcategory} onChange={(e) => setSubcategory(e.target.value)}>
                    {/* Add options based on the selected category */}
                    {category === 'Hardware' && (
                        <>
                            <option value="">Select Sub Category</option>
                            <option value="Desktops">Desktops</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Printers">Printers</option>
                            <option value="Servers">Servers</option>
                            <option value="Networking equipment">Networking equipment</option>
                        </>
                    )}
                    {category === 'Software' && (
                        <>
                            <option value="">Select Sub Category</option>
                            <option value="Operating system">Operating system</option>
                            <option value="Application software">Application software</option>
                            <option value="Custom software">Custom software</option>
                            <option value="Integration issues">Integration issues</option>
                        </>
                    )}
                    {category === 'Network' && (
                        <>
                            <option value="">Select Sub Category</option>
                            <option value="Email issues">Email issues</option>
                            <option value="Internet connection problems">Internet connection problems</option>
                            <option value="Website errors">Website errors</option>
                        </>
                    )}
                </select>


                <label htmlFor="info">Info:</label>
                <textarea name="info" value={info} onChange={(e) => setInfo(e.target.value)} />

                <button type="button" onClick={createTicket}>Create Ticket</button>
            </form>

            {/* Display success message if it exists */}
            {successMessage && <p>{successMessage}</p>}

            <h2>Your Tickets</h2>
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket._id}>
                        <strong>Title:</strong> {ticket.title}, <strong>Category:</strong> {ticket.category},{' '}
                        <strong>Subcategory:</strong> {ticket.subCategory}, <strong>Priority:</strong> {ticket.priority},{' '}
                        <strong>Issue Info:</strong> {ticket.issueinfo}
                    </li>
                ))}
            </ul>

            {/* Display knowledge base entries */}
            <h2>Knowledge Base Entries</h2>
            {/* {knowledgeBase !== null ? (
                <ul>
                    {knowledgeBase.map((entry, index) => (
                        <li key={index}>{entry}</li>
                    ))}
                </ul>
            ) : (
                <p>No knowledge base entries available.</p>
            )} */}
        </div>
    );
};

export default TicketPage;
