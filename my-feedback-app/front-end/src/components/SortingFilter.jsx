// src/components/SortingFilter.jsx
import React from 'react';

// Receives onSelectSort handler and the currently activeSort for styling
function SortingFilter({ onSelectSort, activeSort }) {
  const sortOptions = [
    { id: 'upvotes', label: 'Most Upvoted', icon: (
      <svg className="w-4 h-4 mr-1 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12"></path>
      </svg>
    )}, // Up arrow icon
    { id: 'recent', label: 'Most Recent', icon: (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )}, // Clock icon
  ];

  const getSortButtonClass = (sortId) => {
    const baseClasses = "flex items-center px-6 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ease-in-out";
    if (activeSort === sortId) {
      return `${baseClasses} bg-indigo-600 text-white shadow-lg`; // Active state
    } else {
      return `${baseClasses} bg-white text-gray-800 border border-gray-200 hover:bg-gray-100`; // Inactive state
    }
  };

  return (
    <div className="flex justify-center sm:justify-end gap-2 mb-6">
      {sortOptions.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelectSort(option.id)}
          className={getSortButtonClass(option.id)}
        >
          {option.icon}
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortingFilter;