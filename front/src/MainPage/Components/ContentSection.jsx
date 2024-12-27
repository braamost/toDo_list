import React, { useState,useContext } from 'react';
import MyTasks from './Table.jsx';
import { Datacontext } from '../../main';

import axios from 'axios';
import { RefreshCcw, Trash2 } from 'lucide-react';
const ContentSection = ({
   title,
   children,
   onSearch,
   onSort,
   onFilter,
   searchPlaceholder = "Search...",
   sortLabel = "Sort",
   filterLabel = "Filter",
   messages=[]
}) => {

  const {user,setUser} =useContext(Datacontext);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch && onSearch(value);
    console.log(user);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch && onSearch('');
  };

 

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