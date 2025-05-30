// src/components/CategoryFilter.jsx
import React from 'react';

// Receives onSelectCategory handler and the currently activeCategory for styling
function CategoryFilter({ onSelectCategory, activeCategory }) {
  const categories = ['all', 'bug', 'feature', 'improvement', 'other'];

  const getCategoryButtonClass = (cat) => {
    const baseClasses = "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ease-in-out capitalize";
    if (activeCategory === cat) {
      // Active state styling
      switch (cat) {
        case 'all': return `${baseClasses} bg-indigo-600 text-white shadow-md`;
        case 'bug': return `${baseClasses} bg-red-600 text-white shadow-md`;
        case 'feature': return `${baseClasses} bg-green-600 text-white shadow-md`;
        case 'improvement': return `${baseClasses} bg-blue-600 text-white shadow-md`;
        case 'other': return `${baseClasses} bg-purple-600 text-white shadow-md`;
        default: return `${baseClasses} bg-gray-600 text-white shadow-md`;
      }
    } else {
      // Inactive state styling (lighter background, darker text, hover effect)
      switch (cat) {
        case 'all': return `${baseClasses} bg-indigo-100 text-indigo-800 hover:bg-indigo-200`;
        case 'bug': return `${baseClasses} bg-red-100 text-red-800 hover:bg-red-200`;
        case 'feature': return `${baseClasses} bg-green-100 text-green-800 hover:bg-green-200`;
        case 'improvement': return `${baseClasses} bg-blue-100 text-blue-800 hover:bg-blue-200`;
        case 'other': return `${baseClasses} bg-purple-100 text-purple-800 hover:bg-purple-200`;
        default: return `${baseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300`;
      }
    }
  };

  return (
    <div className="flex flex-wrap justify-center sm:justify-start gap-2 mb-6">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onSelectCategory(cat)}
          className={getCategoryButtonClass(cat)}
        >
          {cat === 'all' ? 'All' : cat}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;