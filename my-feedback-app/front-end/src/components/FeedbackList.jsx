// src/components/FeedbackList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackItem from './FeedbackItem';

// Accept searchQuery as a prop
function FeedbackList({ category, sort, searchQuery }) { // searchQuery added here
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFeedbacks = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = 'http://localhost:5000/api/feedback';
      const params = new URLSearchParams();

      if (category && category !== 'all') {
        params.append('category', category);
      }
      if (sort) {
        params.append('sort', sort);
      }
      // Add search query parameter if it exists: New logic
      if (searchQuery) {
        params.append('search', searchQuery);
      }

      if (params.toString()) {
        url = `${url}?${params.toString()}`;
      }

      const response = await axios.get(url);
      setFeedbacks(response.data);
    } catch (err) {
      console.error('Error fetching feedback:', err);
      setError('Failed to load feedback. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when category, sort, or searchQuery changes
  useEffect(() => {
    fetchFeedbacks();
  }, [category, sort, searchQuery]); // searchQuery added to dependencies

  // ... rest of the component (handleUpvoteSuccess, loading/error/empty checks, return JSX)
  const handleUpvoteSuccess = () => {
    fetchFeedbacks(); // Re-fetch feedbacks to update upvote counts
  };

  if (loading) {
    return <div className="text-center py-4">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">{error}</div>;
  }

  if (feedbacks.length === 0) {
    return <div className="text-center py-4 text-gray-500">No feedback found.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {feedbacks.map((feedback) => (
        <FeedbackItem key={feedback.id} feedback={feedback} onUpvoteSuccess={handleUpvoteSuccess} />
      ))}
    </div>
  );
}

export default FeedbackList;