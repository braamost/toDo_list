import React, { useState,useContext } from 'react';

import { Datacontext } from '../../main';
import { Service } from './service';
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
    <div>
      <div className='flex items-center text-gray-500 font-medium text-sm justify-between space-x-2'>
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        {title}
      </h3>
      <div className='flex'>
      <button
          className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-blue-500"
         
      >
          <RefreshCcw className="mr-2" size={18} />
      </button>
      <button
          className="text-gray-800 font-bold py-2 px-4 rounded flex items-center transition-all duration-300 ease-in-out transform hover:scale-110 hover:text-red-500"
          
      >
          <Trash2 className="mr-2" size={18} />
      </button>
      </div>
      </div>
      <Service 
        handleClearSearch={handleClearSearch} 
        onSort={onSort}
        onFilter={onFilter}
        handleSearchChange={handleSearchChange}
        searchPlaceholder={searchPlaceholder}
        sortLabel={sortLabel}
        filterLabel={filterLabel}  
        user={user}
        setUser={setUser}
        searchTerm={searchTerm}
        setSearchTerm={searchTerm}
        />
      <div>
     
      </div>
    </div>
  );
};

export default ContentSection;