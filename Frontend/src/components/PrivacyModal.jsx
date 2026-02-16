import React from 'react';
import { X } from 'lucide-react';
import termsHTML from './terms.html?raw'

const PolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  // Prevents the modal from closing when clicking inside the content area
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 transition-opacity duration-300"
      onClick={onClose} // Close modal when clicking the backdrop
    >
      
      {/* Modal Content Container */}
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto scrollbar-hide transform transition-all duration-300 scale-100 opacity-100"
        onClick={handleContentClick}
      >
        
        {/* Header */}
        <div className="sticky top-0 bg-orange-600 text-white p-6 rounded-t-xl flex justify-between items-center shadow-md">
          <h2 className="text-2xl font-bold">ABC Platform Privacy Policy</h2>
          <button 
            onClick={onClose} 
            className="text-white hover:text-gray-900 transition-colors p-1 rounded-full cp hover:bg-opacity-80 bg-opacity-10"
            aria-label="Close Privacy Modal"
          >
            <X size={24} />
          </button>
        </div>
        {/* Content from HTML */}
        <div
          className="p-8 text-gray-700"
          dangerouslySetInnerHTML={{ __html: termsHTML }}
        />
      </div>
    </div>
  );
};

export default PolicyModal;