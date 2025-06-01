// src/components/FeedbackItem.jsx
import React, { useState } from 'react'; // Import useState for local message display
import axios from 'axios';

// Corrected: Destructure 'feedback' and 'onUpvoteSuccess' from the props object
function FeedbackItem({ feedback, onUpvoteSuccess }) {
  const [message, setMessage] = useState(''); // State to display messages to the user

  const handleUpvote = async () => {
    // Clear any previous messages
    setMessage('');

    try {
      // Generate a unique voter ID (e.g., using a library like uuid or a simple random string)
      let voterId = localStorage.getItem('voterId');
      if (!voterId) {
        voterId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        localStorage.setItem('voterId', voterId);
      }

      // Client-side check: Check if already upvoted this item in local storage for immediate UX feedback
      const upvotedItems = JSON.parse(localStorage.getItem('upvotedItems') || '[]');
      if (upvotedItems.includes(feedback.id)) {
        setMessage('You have already upvoted this item!');
        return; // Stop execution if already upvoted client-side
      }

      // Send the upvote request to the backend
      const response = await axios.post(`https://feedback-board-g5qf.onrender.com/api/feedback/${feedback.id}/upvote`||`http://localhost:5000/api/feedback/${feedback.id}/upvote`, { voterId });

      // If successful, update local storage and trigger parent refresh
      localStorage.setItem('upvotedItems', JSON.stringify([...upvotedItems, feedback.id]));
      setMessage('Upvoted successfully!');

      // Call the callback to tell the parent (FeedbackList) to re-fetch data
      if (onUpvoteSuccess) {
        onUpvoteSuccess();
      }

    } catch (error) {
      console.error('Error upvoting:', error.response?.data || error.message);
      // Display specific error message from backend if available, otherwise a generic one
      setMessage(error.response?.data?.message || 'Failed to upvote. Please try again.');
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'bug':
        return 'bg-red-200 text-red-800';
      case 'feature':
        return 'bg-green-200 text-green-800';
      case 'improvement':
        return 'bg-blue-200 text-blue-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 flex flex-col justify-between">
      <div>
        {/* Access properties directly from the 'feedback' object */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{feedback.title}</h3>
        <p className="text-gray-700 text-sm mb-3">{feedback.description}</p>
        <span className={`inline-block text-xs font-medium px-2.5 py-0.5 rounded-full ${getCategoryColor(feedback.category)} mb-4`}>
          {feedback.category.charAt(0).toUpperCase() + feedback.category.slice(1)}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button
            onClick={handleUpvote}
            className="flex items-center px-3 py-1 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-8V6a1 1 0 112 0v2h2a1 1 0 110 2h-2v2a1 1 0 11-2 0v-2H7a1 1 0 110-2h2z" clipRule="evenodd"></path>
            </svg>
            Upvote
          </button>
          {/* Access properties directly from the 'feedback' object */}
          <span className="text-lg font-bold text-gray-800">{feedback.upvotes}</span>
        </div>
      </div>
      {/* Display message to the user */}
      {message && (
        <p className={`mt-2 text-sm ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
          {message}
        </p>
      )}
    </div>
  );
}

export default FeedbackItem;