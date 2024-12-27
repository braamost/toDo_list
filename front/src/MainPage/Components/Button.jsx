import React, { useState } from 'react';
import { PlusIcon, Clock, Tag } from 'lucide-react';

const PlusButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [importance, setImportance] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [dueTime, setDueTime] = useState('');

  const toggleDialog = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    console.log('Submitted:', {
      text: inputValue,
      importance,
      dueDate,
      dueTime
    });
    toggleDialog();
  };

  const getImportanceColor = () => {
    const colors = {
      low: 'bg-green-500',
      medium: 'bg-yellow-500',
      high: 'bg-red-500'
    };
    return colors[importance];
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
        <PlusIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-pink-600">Add New Task</h2>
            
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter new task"
              className="w-full p-2 border rounded mb-4 text-gray-700"
            />

            

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Due Date</label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border rounded text-gray-700"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">Due Time</label>
                <input
                  type="time"
                  value={dueTime}
                  onChange={(e) => setDueTime(e.target.value)}
                  className="w-full p-2 border rounded text-gray-700"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Importance</label>
              <div className="flex gap-2">
                {['low', 'medium', 'high'].map((level) => (
                  <button
                    key={level}
                    onClick={() => setImportance(level)}
                    className={`
                      flex-1 px-4 py-2 rounded capitalize
                      ${importance === level ? getImportanceColor() + ' text-white' : 'bg-gray-100'}
                      transition duration-200
                    `}
                  >
                    {level}
                  </button>
                ))}
              </div>
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