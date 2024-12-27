import React, { useState,useContext } from 'react';
import MyTasks from './Table.jsx';
import { Datacontext } from '../../main';
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
const ContentSection = ({ title, category, messages = [] }) => {

  const {user,setUser} =useContext(Datacontext);
  const handleDelete = async (e) => {
    try {
      console.log("Deleting category:", title);
      console.log("Category ID:", category.categoryId);

      await deleteCategory(category.categoryId);
      await fetchData(user, setUser);
    } catch (error) {
      console.error("Error in handleDelete:", error);
      // You might want to show an error message to the user here
    }};
  return (
    <>

    <div>
      <div className='flex flex-col items-center text-gray-500 font-medium text-sm justify-between space-x-2'>
      <MyTasks></MyTasks>
      
      
      </div>
    </div>
    </>
  );
};

export default ContentSection;
