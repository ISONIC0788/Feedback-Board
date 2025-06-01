// src/components/FeedbackList.jsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackItem from './FeedbackItem';
import SortingFilter from './SortingFilter'; // Ensure this path is correct based on your project structure

// Define the base URL for your backend API
//process.env.REACT_APP_BACKEND_URL 
const API_BASE_URL =  'http://localhost:5000/api/feedback';

// Accept category, sort, and searchQuery as props from App.jsx
function FeedbackList({ category, sort, searchQuery }) {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch feedback items from the backend API
  const fetchFeedbacks = async () => {
    setLoading(true); // Set loading to true before fetching
    setError(null);   // Clear any previous errors

    try {
      const url = new URL(API_BASE_URL); // Use URL object for cleaner parameter handling

      // Append category filter if it's not 'all'
      if (category && category !== 'all') {
        url.searchParams.append('category', category);
      }
      // Append sort parameter if it exists
      if (sort) {
        url.searchParams.append('sort', sort);
      }
      // Append search query parameter if it exists and is not empty
      if (searchQuery) {
        url.searchParams.append('search', searchQuery);
      }

      const response = await axios.get(url.toString()); // Convert URL object to string for axios
      setFeedbacks(response.data); // Update feedbacks state with fetched data
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Failed to load feedback. Please try again later.'); // Set error message
    } finally {
      setLoading(false); // Set loading to false after fetch attempt
    }
  };

  // useEffect hook to re-fetch feedbacks whenever category, sort, or searchQuery props change
  useEffect(() => {
    fetchFeedbacks();
  }, [category, sort, searchQuery]); // Dependencies that trigger re-fetch

  // Handler for upvoting/downvoting a feedback item
  const handleUpvote = async (feedbackId) => { // 'feedbackId' here corresponds to the virtual 'id' from backend
    try {
      // Get or generate a unique voter ID from local storage to prevent multiple votes from same device
      const voterId = localStorage.getItem('voterId') || Math.random().toString(36).substring(2, 15);
      localStorage.setItem('voterId', voterId); // Store it for future requests

      // Send the upvote/downvote toggle request to the backend
      const response = await axios.post(`${API_BASE_URL}/${feedbackId}/upvote`, { voterId });

      // Display the message returned from the backend (e.g., "Upvote added" or "Upvote removed")
      alert(response.data.message);

      // Optimistically update the upvotes count in the frontend state for immediate UI feedback
      setFeedbacks(prevFeedbacks =>
        prevFeedbacks.map(feedback =>
          // Find the feedback item by its 'id' (virtual property from Mongoose)
          feedback.id === feedbackId
            ? { ...feedback, upvotes: response.data.newUpvotes } // Update its upvotes count
            : feedback // Return other feedback items unchanged
        )
      );
    } catch (err) {
      console.error('Error toggling upvote:', err.response?.data?.message || err.message);
      // Display error message from backend or a generic one
      alert(err.response?.data?.message || 'Error toggling upvote.');
    }
  };

  // --- Render Loading, Error, and Empty States ---
  if (loading) {
    return <div className="text-center py-4 text-gray-600">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  if (feedbacks.length === 0) {
    return <div className="text-center py-4 text-gray-500">No feedback found matching your criteria.</div>;
  }

  // --- Render Feedback Items ---
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {feedbacks.map((feedback) => (
        <FeedbackItem
          key={feedback.id} // Use feedback.id (virtual property) as the unique key for React
          feedback={feedback}
          onUpvote={() => handleUpvote(feedback.id)} // Pass the handleUpvote function with the specific feedback ID
        />
      ))}
    </div>
  );
}

export default FeedbackList;