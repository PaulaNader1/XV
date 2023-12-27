import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GenerateAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/manager/ticket-analytics', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // Check response status before accessing data
        if (response.status === 200) {
          setAnalyticsData(response.data);
        } else {
          // Handle/report unexpected response status
          console.error('Unexpected response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching analytics:', error);
        // Handle/report the error to the user if needed
        alert('Error fetching analytics. Please try again.');
      }
    };

    // Fetch analytics when the component mounts
    fetchAnalytics();
  }, []);

  if (!analyticsData) {
    // Display loading indicator or return null while fetching data
    return <div>Loading...</div>;
  }

  // Render your analytics data with white font color
  return (
    <div style={{ color: 'white' }}>
      <h2>Ticket Analytics</h2>
      <div>
        <h3>Priority Counts:</h3>
        <p>High: {analyticsData.priorityCounts.highPriorityCount}</p>
        <p>Medium: {analyticsData.priorityCounts.mediumPriorityCount}</p>
        <p>Low: {analyticsData.priorityCounts.lowPriorityCount}</p>
      </div>
      <div>
        <h3>Status Counts:</h3>
        <p>Open: {analyticsData.statusCounts.openStatusCount}</p>
        <p>Closed: {analyticsData.statusCounts.closedStatusCount}</p>
        <p>In Progress: {analyticsData.statusCounts.inProgressStatusCount}</p>
      </div>
      <div>
        <h3>Category Counts:</h3>
        <p>Software: {analyticsData.categoryCounts.softwareCategoryCount}</p>
        <p>Hardware: {analyticsData.categoryCounts.hardwareCategoryCount}</p>
        <p>Network: {analyticsData.categoryCounts.networkCategoryCount}</p>
      </div>
    </div>
  );
};

export default GenerateAnalytics;



