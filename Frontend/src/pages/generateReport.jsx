import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateReportPage = () => {
    const [tickets, setTickets] = useState([]);
    const [selectedTicketId, setSelectedTicketId] = useState('');
  
    useEffect(() => {
      // Fetch all tickets from the backend
      const fetchAllTickets = async () => {
        try {
          const response = await axios.get('http://localhost:3000/api/v1/manager/tickets' , {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
  
          if (Array.isArray(response.data)) {
            setTickets(response.data);
          } else {
            console.error('Invalid data format received from the backend. Expected an array.');
          }
        } catch (error) {
          console.error('Error fetching all tickets:', error);
        }
      };
  
      fetchAllTickets();
    }, []);

    const handleGenerateReport = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/v1/manager/generateReports/${selectedTicketId}`, {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
    
          // Handle the response as needed
          const reportData = response.data;
    
          // Display the report data on the page
          let reportMessage = `Ticket Status: ${reportData.ticketStatus}`;
          if (reportData.ticketStatus === "opened" || reportData.ticketStatus === "pending") {
            reportMessage += `\nTicket Date: ${reportData.ticketdate}`;
          } else {
            reportMessage += `\nResponse Time: ${reportData.responsetime} \nRating: ${reportData.rating}\nAgent Email: ${reportData.agentemail}`;
          }
    
          alert(reportMessage);
        } catch (error) {
          console.error('Error generating report:', error);
          alert('Error generating report. Please try again.');
        }
      };
    
      useEffect(() => {
        // Fetch all tickets from the backend
        const fetchAllTickets = async () => {
          try {
            const response = await axios.get('http://localhost:3000/api/v1/manager/allTickets', {
              withCredentials: true,
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            });
    
            if (Array.isArray(response.data)) {
              setTickets(response.data);
            } else {
              console.error('Invalid data format received from the backend. Expected an array.');
            }
          } catch (error) {
            console.error('Error fetching all tickets:', error);
          }
        };
    
        fetchAllTickets();
      }, []);
    
      return (
        <div>
          <label htmlFor="ticketId">Select Ticket ID:</label>
          <select id="ticketId" value={selectedTicketId} onChange={(e) => setSelectedTicketId(e.target.value)}>
            <option value="">-- Select Ticket ID --</option>
            {tickets.map((ticket) => (
              <option key={ticket._id} value={ticket._id}>
                {ticket._id}
              </option>
            ))}
          </select>
    
          <button onClick={handleGenerateReport}>Generate Report</button>
        </div>
      );

      
    };

    export default GenerateReportPage;


    