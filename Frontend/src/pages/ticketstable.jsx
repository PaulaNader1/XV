import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylesheets/TicketsTable.css';

const bearerHeader = {
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
}
function TicketsTable() {
    let navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
        axios.get('http://localhost:3000/api/v1/agents/getOpenedTickets', { ...bearerHeader })
            .then(response => {
                setTickets(response.data); // assuming the response data is the array of tickets
            })
            .catch(error => console.error('Error:', error));
    }, []);

    const handlePriorityChange = (ticketId, newPriority) => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
        axios.put(`http://localhost:3000/api/v1/agents/changeTicketPriority/${ticketId}/${newPriority}`, {},{ ...bearerHeader })
            .then(_ => {
                const updatedTickets = tickets.map(ticket =>
                    ticket._id === ticketId ? { ...ticket, priority: newPriority } : ticket
                );
                setTickets(updatedTickets);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleCloseTicket = (ticketId, agentResponse) => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
        axios.put(`http://localhost:3000/api/v1/agents/closeTicket/${ticketId}`, { agentResponse },
            { ...bearerHeader }
        )
            .then(response => {
                const updatedTickets = tickets.map(ticket =>
                    ticket._id === ticketId ? { ...ticket, status: 'closed' } : ticket
                );
                setTickets(updatedTickets);
            })
            .catch(error => console.error('Error:', error));
    };

    const handleAgentResponseChange = (ticketId, response) => {
        const updatedTickets = tickets.map(ticket =>
            ticket._id === ticketId ? { ...ticket, agentResponse: response } : ticket
        );
        setTickets(updatedTickets);
    };
    return (
        <>
            <AppNavBar /> {/* Include your Navbar component */}
            <table className="table">
                <thead>
                    <tr>
                        <th>Ticket ID</th>
                        <th>User ID</th>
                        <th>Priority</th>
                        <th>Category</th>
                        <th>SubCategory</th>
                        <th>Status</th>
                        <th>Agent Response</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map(ticket => (
                        <tr key={ticket._id}>
                            <td>{ticket._id}</td>
                            <td>{ticket.userid}</td>
                            <td>
                                <select value={ticket.priority} onChange={(e) => handlePriorityChange(ticket._id, e.target.value)}>
                                    <option value="high">High</option>
                                    <option value="medium">Medium</option>
                                    <option value="low">Low</option>
                                </select>
                            </td>
                            <td>{ticket.category}</td>
                            <td>{ticket.subCategory}</td>
                            <td>{ticket.status}</td>
                            <td>
                                <input
                                    type="text"
                                    value={ticket.agentResponse}
                                    onChange={(e) => handleAgentResponseChange(ticket._id, e.target.value)}
                                />
                            </td>
                            <td>
                                {ticket.status === 'pending' && (
                                    <button onClick={() => handleCloseTicket(ticket._id, ticket.agentResponse)}
                                        disabled={!ticket.agentResponse}>
                                        Close Ticket
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>

    );
}

export default TicketsTable;