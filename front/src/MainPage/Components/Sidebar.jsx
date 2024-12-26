import SidebarButton from "./SidebarButton";
import React, { useState } from "react";
import { Mail, Trash2, Users, LogOut, Send, Menu, X, MessageCircle, PlusIcon, TrashIcon, PlusCircle } from "lucide-react";
import PlusButton from "./Button";

const Sidebar = ({
  isSidebar,
  toggleSidebar,
  activeSection,
  navigateSection,
  onLogout,
}) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      // TODO: Implement category addition logic
      console.log('Adding new category:', newCategory);
      // You might want to pass this to a parent component or a state management system
      setNewCategory('');
      setIsAddingCategory(false);
    }
  };

  return (
    <div
      className={`bg-white shadow-lg transition-all duration-300 flex ${
        isSidebar ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4 h-full w-full relative">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <h2
              className={`font-bold text-xl text-gray-800 ${
                !isSidebar && "hidden"
              }`}
            >
              Categories
            </h2>
            {isSidebar && (
              <button
                onClick={() => setIsAddingCategory(!isAddingCategory)}
                className="text-green-500 hover:text-green-600 transition"
              >
                <PlusCircle size={20} />
              </button>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="text-gray-500 hover:text-gray-700"
          >
            {isSidebar ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isAddingCategory && isSidebar && (
          <div className="mb-4 flex space-x">
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="New category name"
              className="flex-grow p-2 border rounded"
            />
            <button
              onClick={handleAddCategory}
              className="bg-green-500 text-white p-1 rounded hover:bg-green-600"
            >
              Add
            </button>
          </div>
        )}

        {isSidebar && (
          <div className="space-y-2">
            <SidebarButton
              label="home"
              onClick={() => navigateSection("home")}
              active={activeSection === "home"}
            />

            <nav className="mt-8 space-y-2">
              <SidebarButton
                label="work"
                active={activeSection === "work"}
                onClick={() => navigateSection("work")}
              />
              <SidebarButton
                label="gym"
                active={activeSection === "gym"}
                onClick={() => navigateSection("gym")}
              />

              <div className="min-w-full min-h-full ">
                <PlusButton></PlusButton>
                <button
                  className="
                    bg-red-500
                    hover:bg-red-600
                    text-white
                    p-3
                    rounded-full
                    shadow-lg
                    transition
                    duration-300
                    ease-in-out
                    hover:scale-110
                    fixed
                    left-80
                    bottom-20
                  "
                >
                  <TrashIcon className="w-full h-full" />
                </button>
              </div>
            </nav>

            <div className="absolute bottom-4 w-56">
              <SidebarButton
                icon={LogOut}
                label="Log out"
                onClick={onLogout}
                variant="danger"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;