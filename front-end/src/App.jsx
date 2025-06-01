// src/App.jsx
import React, { useState, useCallback } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import CategoryFilter from './components/CategoryFilter';
import SortingFilter from './components/SortingFilter';
import Header from './components/Header';
import Modal from './components/Modal';

function App() {
  // `refreshList` is used as a key on FeedbackList to force a re-render/re-fetch.
  // It's toggled whenever filters, sort, or search criteria change, or new feedback is submitted.
  const [refreshList, setRefreshList] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentSort, setCurrentSort] = useState('recent');
  const [isFormOpen, setIsFormOpen] = useState(false); // State to control the feedback form modal visibility
  const [searchQuery, setSearchQuery] = useState(''); // State for the search input query

  // Callback to refresh the feedback list after a new feedback is submitted
  const handleFeedbackSubmitted = useCallback(() => {
    setRefreshList(prev => !prev); // Toggle key to force FeedbackList re-render/re-fetch
    setIsFormOpen(false); // Close the feedback submission form modal
  }, []);

  // Callback to update the active category filter
  const handleCategoryChange = useCallback((category) => {
    setCurrentCategory(category);
    setRefreshList(prev => !prev); // Trigger FeedbackList re-fetch with new category
  }, []);

  // Callback to update the active sort option
  const handleSortChange = useCallback((sortOption) => {
    setCurrentSort(sortOption);
    setRefreshList(prev => !prev); // Trigger FeedbackList re-fetch with new sort option
  }, []);

  // Callback to handle changes in the search input field
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setRefreshList(prev => !prev); // Trigger FeedbackList re-fetch with new search query
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      {/* Header component with a button to open the feedback form */}
      <Header onAddFeedbackClick={() => setIsFormOpen(true)} />

      <main className="max-w-4xl mx-auto pt-24 sm:pt-12">
        {/* Modal for the feedback submission form */}
        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Submit New Feedback">
          <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
        </Modal>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback List</h2>

          {/* Search Bar input field */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search feedback by title or description..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Filter and Sort options section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            {/* Category Filter component */}
            <CategoryFilter
              onSelectCategory={handleCategoryChange}
              activeCategory={currentCategory}
            />
            {/* Sorting Filter component */}
            <SortingFilter
              onSelectSort={handleSortChange}
              activeSort={currentSort}
            />
          </div>

          {/* FeedbackList component, which fetches and displays feedback based on props */}
          <FeedbackList
            // Using `refreshList` as a key to force re-mount and re-fetch when filters/sort/search change
            key={refreshList}
            category={currentCategory}
            sort={currentSort}
            searchQuery={searchQuery} // Pass the search query state to FeedbackList
          />
        </div>
      </main>
    </div>
  );
}

export default App;