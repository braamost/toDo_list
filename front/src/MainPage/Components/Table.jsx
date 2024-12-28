import { useState, useEffect,useContext } from "react";
import "./table.css"
import axios from "axios";
import DataTable from "react-data-table-component";
import { Check, Trash2 } from 'lucide-react';
import { fetchData } from "../../Fetch/Fetch";
import { Datacontext } from "../../main";
function MyTasks({data}) {
    const {user,setUser}= useContext(Datacontext);
    const [error , setError] = useState("")
    const [selectedRows, setSelectedRows] = useState([]);
    const columns = [
        {
            name: "Task",
            selector: row => row.content,
            sortable: true,
        },
        {
            name: "Importance",
            selector: row => row.importance,
            sortable: true,
        },
        {
            name: "Due Date",
            selector: row => row.dueDate,
            sortable: true,
        },
        ];
    
    const [filteredTasks, setFilteredTasks] = useState(data || []);
    const handleSelectedRowsChange = (state) => {
        setSelectedRows(state.selectedRows);
        console.log("Selected Rows:", state.selectedRows);
      };
    const deleteTasks = async ()=>{
        try {
            const response = selectedRows.map((todo) =>
                axios.delete(`http://localhost:8080/api/todo/${todo.todoId}`)
              );
              await Promise.all(response);
              setFilteredTasks((prevTodos) => {
                const selectedIds = selectedRows.map((todo) => todo.todoId);
        
                const updatedtodos = prevTodos.filter(
                  (todo) => !selectedIds.includes(todo.todoId)
                );
                fetchData(user , setUser)
                return updatedtodos;
              });
        
              alert("todos permanently deleted");  
        } catch (error) {
            console.error("Failed to update todos", error);
            setError(`Failed to update todos`);
            
    }
}
const markAsDone = async () =>{
    try {
        const response = selectedRows.map((todo) =>{
            todo.status="COMPLETED";
            axios.put(`http://localhost:8080/api/todo/${todo.todoId}`,todo)
    });
          await Promise.all(response);
          fetchData(user , setUser)
          alert("todos are updated");  
    } catch (error) {
        console.error("Failed to update todos", error);
        setError(`Failed to update todos`);
        
    }

}

    // useEffect(() => {
    //     const fetchContacts = async () => {
    //         try {
    //             const data = await fetchData(user,setUser); // Assuming FetchContacts is a function that fetches data
                
    //             setFilteredTasks(data); // Setting the fetched data to state
    //         } catch (error) {
    //             console.error("Error fetching contacts:", error);
    //         }
    //     };

    //     fetchData(user,setUser); // Call the async function to fetch contacts
        
    // }, [data]);
    // useEffect(() => {
    //     fetchData(user,setUser);
    //  }, [data]);

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase();
        const filtered = data.filter(row => {
            return row.content.toLowerCase().includes(searchValue) ||
                row.importance.toLowerCase().includes(searchValue);
        });
        setFilteredTasks(filtered);
    };


    return (
        <div className="pageContent">
            <div className="container">

                {/* Search input */}
                <div className="up">
                    <div>
                        <input
                            className="search"
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search by task or importance..."
                        />
                    </div>
                    <div className="buttons">
                        <button
                            className="refresh"
                            onClick={markAsDone}

                        >
                            <Check size={20} />
                        </button>
                        <button
                            className="trash"
                            onClick={deleteTasks}

                        >
                            <Trash2 size={18} />
                        </button>
                    </div>

                </div>

                {/* DataTable to display contacts */}
                <DataTable
                    columns={columns}
                    data={filteredTasks}
                    selectableRows
                    fixedHeader
                    pagination
                    paginationPerPage={6}
                    noDataComponent="No Tasks found"
                    onSelectedRowsChange={handleSelectedRowsChange}
                    defaultSortFieldId={1}
                />
            </div>
        </div>
    );
}

export default MyTasks;