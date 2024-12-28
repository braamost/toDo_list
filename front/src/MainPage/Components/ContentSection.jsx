import React, { useState, useContext } from "react";
import MyTasks from "./Table.jsx";
import { Datacontext } from "../../main";
import { fetchData } from "../../Fetch/Fetch";
import axios from "axios";
import {
  Mail,
  Trash2,
  Users,
  LogOut,
  Send,
  Menu,
  X,
  MessageCircle,
  PlusIcon,
  TrashIcon,
  PlusCircle,
  RefreshCcw,
} from "lucide-react";
import TaskAdding from "./composeTask";
import { deleteCategory } from "../../Delete/DeleteCategories";
const ContentSection = ({ title, category, tasks = [] }) => {
  const { user, setUser } = useContext(Datacontext);
  const handleDelete = async (e) => {
    try {
      console.log("Deleting category:", title);
      console.log("Category ID:", category.categoryId);
      await deleteCategory(category.categoryId);
      window.alert("Category deleted successfully");
      await fetchData(user, setUser);
    } catch (error) {
      console.error("Error in handleDelete:", error);
      // You might want to show an error message to the user here
    }
  };
  return (
    <>
      <div>
        <div className="flex flex-col items-center text-gray-500 font-medium text-sm justify-between space-x-2">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">{title}</h3>
          <MyTasks tasks={tasks}/>
          <nav className="mt-8 space-y-2">
            <div className="min-w-full min-h-full ">
              <TaskAdding category={category}></TaskAdding>
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
                onClick={handleDelete}
              >
                <TrashIcon className="w-full h-full" />
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default ContentSection;
