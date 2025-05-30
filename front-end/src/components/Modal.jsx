// src/components/Modal.jsx
import React from 'react';

function Modal({ isOpen, onClose, children, title = "Modal Title" }) {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close modal when clicking on the overlay
    >
      <div
        className="bg-white rounded-lg shadow-xl max-w-lg w-full transform transition-all sm:my-8 sm:align-middle"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
      >
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <div className="p-6">
          {children} {/* This is where your FeedbackForm will be rendered */}
        </div>
      </div>
    </div>
  );
}

export default Modal;