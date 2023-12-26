// TicketPage.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppNavBar from '../components/navbar'; // Import your Navbar component

// Assuming you have the backend_url defined
const backend_url = "http://localhost:3000/api/v1/users";

const TicketPage = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [priority, setPriority] = useState('');
    const [info, setInfo] = useState('');
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        // Fetch user's tickets initially
        getTickets();
    }, []);

    const createTicket = async () => {
        try {
            await axios.post(`${backend_url}/users/:id/create-ticket`, {
                title,
                category,
                subCategory: subcategory,
                priority,
                info,
            });

            // Clear the form after successful ticket creation
            setTitle('');
            setCategory('');
            setSubcategory('');
            setPriority('');
            setInfo('');

            // Refresh the user's tickets after creating a new one
            getTickets();

            console.log('Ticket created successfully!');
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    };

    const getTickets = async () => {
        try {
            // Replace ":id" with the actual user ID
            const response = await axios.get(`${backend_url}/tickets/:id`);
            setTickets(response.data.tickets);
        } catch (error) {
            console.error('Error getting tickets:', error);
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
                            <option value="Desktops">Desktops</option>
                            <option value="Laptops">Laptops</option>
                            <option value="Printers">Printers</option>
                            <option value="Servers">Servers</option>
                            <option value="Networking equipment">Networking equipment</option>
                        </>
                    )}
                    {category === 'Software' && (
                        <>
                            <option value="Operating system">Operating system</option>
                            <option value="Application software">Application software</option>
                            <option value="Custom software">Custom software</option>
                            <option value="Integration issues">Integration issues</option>
                        </>
                    )}
                    {category === 'Network' && (
                        <>
                            <option value="Email issues">Email issues</option>
                            <option value="Internet connection problems">Internet connection problems</option>
                            <option value="Website errors">Website errors</option>
                        </>
                    )}
                </select>

                <label htmlFor="priority">Priority:</label>
                <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
                    <option value="">Select Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                </select>

                <label htmlFor="info">Info:</label>
                <textarea name="info" value={info} onChange={(e) => setInfo(e.target.value)} />

                <button type="button" onClick={createTicket}>Create Ticket</button>
            </form>

            <h2>Your Tickets</h2>
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket._id}>
                        <strong>Title:</strong> {ticket.title}, <strong>Category:</strong>{' '}
                        {ticket.category}, <strong>Priority:</strong> {ticket.priority}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TicketPage;
