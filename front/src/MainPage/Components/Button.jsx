import React, { useState } from 'react';
import { PlusIcon } from 'lucide-react';

const PlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [importance, setImportance] = useState(50);

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    console.log('Submitted:', {
      text: inputValue,
      importance: importance
    });
    toggleDialog();
  };

  const getImportanceColor = () => {
    if (importance < 33) return 'bg-green-300';
    if (importance < 66) return 'bg-yellow-300';
    return 'bg-red-300';
  };

  return (
    <div>
      <button 
        onClick={toggleDialog}
        className="
          bg-green-500 
          hover:bg-green-600 
          text-white 
          p-3 
          rounded-full 
          shadow-lg 
          transition 
          duration-300 
          ease-in-out 
          hover:scale-110 
          fixed 
          right-12 
          bottom-20
        "
      >
        <PlusIcon className="w-full h-full" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-pink-600">Add New task to do</h2>
            
            <input 
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter new task"
              className="w-full p-2 border rounded mb-4 text-gray-700"
            />
            <input 
              type="date"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              
              className="w-full p-2 border rounded mb-4 text-gray-700"
            />
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Importance: {importance}</label>
              <div className="flex items-center space-x-4">
                <span className="text-green-600">Low</span>
                <input 
                  type="range"
                  min="0"
                  max="100"
                  value={importance}
                  onChange={(e) => setImportance(Number(e.target.value))}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-pink-600">High</span>
              </div>
              <div 
                className={`h-2 rounded-full mt-2 ${getImportanceColor()}`} 
                style={{width: `${importance}%`}}
              />
            </div>
            
            <div className="flex justify-end space-x-2">
              <button 
                onClick={toggleDialog}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button 
                onClick={handleSubmit}
                className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlusButton;