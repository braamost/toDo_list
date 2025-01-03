import React, { useState, useContext } from "react";
import { PlusIcon, X } from "lucide-react";
import axios from "axios";
import { fetchData } from "../../Fetch/Fetch";
import { Datacontext } from "../../main";

const taskAdding = ({ category }) => {
  const { user, setUser } = useContext(Datacontext);
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [content, setDescription] = useState("");
  const [importance, setImportance] = useState("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [errors, setErrors] = useState({});

  const toggleDialog = () => {
    setIsOpen(!isOpen);
    setDueTime("");
    setDueDate("");
    setInputValue("");
    setDescription("");
    setImportance("MEDIUM");

    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};

    if (!inputValue.trim()) {
      newErrors.task = "Task is required";
    }

    if (!dueDate) {
      newErrors.dueDate = "Due date is required";
    }

    if (!dueTime) {
      newErrors.dueTime = "Due time is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    console.log(category.name);
    if (validateForm()) {
      const combinedDateTime = `${dueDate}T${dueTime}`;
      const dto = {
        title: inputValue,
        categoryId: category.categoryId,
        content: content,
        status: "PENDING",
        importance: importance,
        dueDate: combinedDateTime,
      };
      console.log(dto);
      toggleDialog();
      const response = await axios.post("http://localhost:8080/api/todo", dto);
      console.log("no error", response);
    }
    fetchData(user, setUser);
    console.log(user);
  };

  const handleTimeChange = (e) => {
    setDueTime(e.target.value);
    if (errors.dueTime) {
      setErrors((prev) => ({ ...prev, dueTime: "" }));
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (errors.task) {
      setErrors((prev) => ({ ...prev, task: "" }));
    }
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
    if (errors.dueDate) {
      setErrors((prev) => ({ ...prev, dueDate: "" }));
    }
  };

  const getImportanceColor = () => {
    const colors = {
      LOW: "bg-green-500",
      MEDIUM: "bg-yellow-500",
      HIGH: "bg-red-500",
    };
    return colors[importance];
  };

  return (
    <div>
      <button
        onClick={toggleDialog}
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition duration-300 ease-in-out hover:scale-110 fixed right-12 bottom-20"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-pink-600">
              Add New Task
            </h2>
            <div className="mb-4">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter task title *"
                className={`w-full p-2 border rounded text-gray-700 ${
                  errors.task ? "border-red-500" : ""
                }`}
              />
              {errors.task && (
                <p className="text-red-500 text-sm mt-1">{errors.task}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                value={content}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add task content..."
                className="w-full p-2 border rounded text-gray-700 h-24 resize-none"
              />
            </div>

            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={handleDateChange}
                  className={`w-full p-2 border rounded text-gray-700 ${
                    errors.dueDate ? "border-red-500" : ""
                  }`}
                />
                {errors.dueDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.dueDate}</p>
                )}
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 mb-2">
                  Due Time <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="time"
                    value={dueTime}
                    onChange={handleTimeChange}
                    className={`w-full p-2 border rounded text-gray-700 ${
                      errors.dueTime ? "border-red-500" : ""
                    }`}
                  />
                  {errors.dueTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.dueTime}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Importance</label>
              <div className="flex gap-2">
                {["LOW", "MEDIUM", "HIGH"].map((level) => (
                  <button
                    key={level}
                    onClick={() => setImportance(level)}
                    className={`
                      flex-1 px-4 py-2 rounded capitalize
                      ${
                        importance === level
                          ? getImportanceColor() + " text-white"
                          : "bg-gray-100"
                      }
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
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default taskAdding;
