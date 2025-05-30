// src/App.jsx
import React, { useState, useCallback } from 'react';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import CategoryFilter from './components/CategoryFilter';
import SortingFilter from './components/SortingFilter';
import Header from './components/Header';
import Modal from './components/Modal';

function App() {
  const [refreshList, setRefreshList] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('all');
  const [currentSort, setCurrentSort] = useState('recent');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const handleFeedbackSubmitted = useCallback(() => {
    setRefreshList(prev => !prev);
    setIsFormOpen(false);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setCurrentCategory(category);
    setRefreshList(prev => !prev);
  }, []);

  const handleSortChange = useCallback((sortOption) => {
    setCurrentSort(sortOption);
    setRefreshList(prev => !prev);
  }, []);

  // New handler for search input changes
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
    setRefreshList(prev => !prev); // Trigger FeedbackList to re-fetch with new search query
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <Header onAddFeedbackClick={() => setIsFormOpen(true)} />

      <main className="max-w-4xl mx-auto pt-24">
        <Modal isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} title="Submit New Feedback">
          <FeedbackForm onFeedbackSubmitted={handleFeedbackSubmitted} />
        </Modal>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback List</h2>

          {/* Search Bar */}
          <div className="mb-6">
         {/* Search Bar: New addition */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search feedback by title or description..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <CategoryFilter
              onSelectCategory={handleCategoryChange}
              activeCategory={currentCategory}
            />
            <SortingFilter
              onSelectSort={handleSortChange}
              activeSort={currentSort}
            />
          </div>

          <FeedbackList
            key={refreshList} // Re-mounts component, forcing re-fetch on state change
            category={currentCategory}
            sort={currentSort}
            searchQuery={searchQuery} // Pass the search query
          />

          
        </div>
      </main>
    </div>
  );
}
export default App;