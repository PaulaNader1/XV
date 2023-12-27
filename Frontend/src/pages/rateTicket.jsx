import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AppNavBar from '../components/navbar'; // Import your Navbar component

const RateTicketPage = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicket, setSelectedTicket] = useState('');
    const [rating, setRating] = useState(1);
    const [resultMessage, setResultMessage] = useState('');

    useEffect(() => {
        // Fetch tickets when the component mounts
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            const uid = localStorage.getItem("userId");
            const response = await axios.get(`http://localhost:3000/api/v1/users/tickets/${uid}`, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response.data.tickets);
            setTickets(response.data.tickets);
        } catch (error) {
            console.error('Error fetching tickets:', error);
        }
    };

    const rateTicket = async () => {
        try {
            const response = await axios.put(`http://localhost:3000/api/v1/users/tickets/${selectedTicket}/rate`, {
                responserating: rating,
            }, {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                setResultMessage('Ticket rated successfully!');
            } else {
                setResultMessage(`Failed to rate the ticket. ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error rating ticket:', error);
        }
    };

    return (
        <div>
            <AppNavBar /> {/* Include your Navbar component */}
            <h1>Rate Ticket Page</h1>

            <label htmlFor="ticketDropdown">Select Ticket:</label>
            <select
                id="ticketDropdown"
                value={selectedTicket}
                onChange={(e) => setSelectedTicket(e.target.value)}
                style={{ marginBottom: '10px', fontSize: '16px' }} // Added fontSize
            >
                {tickets.map((ticket) => (
                    <option key={ticket._id} value={ticket._id}>
                        {ticket.issueinfo}
                    </option>
                ))}
            </select>

            <label htmlFor="ratingDropdown" style={{ marginBottom: '10px' }}>Select Rating:</label>
            <select
                id="ratingDropdown"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                style={{ marginBottom: '20px', fontSize: '16px' }} // Added fontSize
            >
                {[1, 2, 3, 4, 5].map((value) => (
                    <option key={value} value={value}>
                        {value}
                    </option>
                ))}
            </select>

            <button onClick={rateTicket}>Rate Ticket</button>

            <p>{resultMessage}</p>
        </div>
    );
};

export default RateTicketPage;
