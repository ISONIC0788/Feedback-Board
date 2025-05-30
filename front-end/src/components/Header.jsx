// src/components/Header.jsx
import React from 'react';

function Header({ onAddFeedbackClick }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left">
      {/* Container for Icon/Logo and Text */}
      <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-4 sm:mb-0">
        {/* Icon/Logo using the simpler chat bubble SVG */}
        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {/* New simpler chat bubble icon path */}
            <path d="M21 3H3C1.895 3 1 3.895 1 5v14c0 1.105.895 2 2 2h18c1.105 0 2-.895 2-2V5c0-1.105-.895-2-2-2zM8 12.001h8v2H8v-2zm-2-4h12v2H6V8.001z"/>
          </svg>
        </div>
        {/* Title and Subtitle */}
        <div>
          <h1 className="text-3xl font-bold text-indigo-700">FeedbackBoard</h1>
          <p className="text-sm text-gray-600">Share your ideas and vote on others</p>
        </div>
      </div>

      {/* Add Feedback Button */}
      <button
        onClick={onAddFeedbackClick}
        className="flex items-center px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
        </svg>
        Add Feedback
      </button>
    </header>
  );
}

export default Header;