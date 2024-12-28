import { useState, useEffect } from "react";
import "./table.css"
import axios from "axios";
import DataTable from "react-data-table-component";
import { RefreshCcw, Trash2 } from 'lucide-react';
function MyTasks() {
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
        {
            name: "Due Time",
            selector: row => row.dueTime,
            sortable: true,
        }];
    const data = [{
        "id": 1,
        "content": "Algorithms",
        "importance": "medium",
        "dueTime": "8:21 AM",
        "dueDate": "2024-05-21"
    }, {
        "id": 2,
        "content": "Operating Systems",
        "importance": "low",
        "dueTime": "1:33 AM",
        "dueDate": "2024-01-03"
    }, {
        "id": 3,
        "content": "Data Structures",
        "importance": "low",
        "dueTime": "4:11 PM",
        "dueDate": "2024-02-16"
    }, {
        "id": 4,
        "content": "Database Systems",
        "importance": "medium",
        "dueTime": "11:40 PM",
        "dueDate": "2024-01-20"
    }, {
        "id": 5,
        "content": "Data Structures",
        "importance": "high",
        "dueTime": "10:15 AM",
        "dueDate": "2024-06-26"
    }, {
        "id": 6,
        "content": "Cybersecurity",
        "importance": "high",
        "dueTime": "4:48 PM",
        "dueDate": "2024-09-21"
    }, {
        "id": 7,
        "content": "Data Structures",
        "importance": "high",
        "dueTime": "6:51 AM",
        "dueDate": "2024-05-15"
    }, {
        "id": 8,
        "content": "Machine Learning",
        "importance": "medium",
        "dueTime": "5:23 PM",
        "dueDate": "2024-10-22"
    }, {
        "id": 9,
        "content": "Software Engineering",
        "importance": "high",
        "dueTime": "3:34 AM",
        "dueDate": "2024-12-01"
    }, {
        "id": 10,
        "content": "Operating Systems",
        "importance": "low",
        "dueTime": "12:37 AM",
        "dueDate": "2024-11-17"
    }, {
        "id": 11,
        "content": "Computer Architecture",
        "importance": "high",
        "dueTime": "7:37 PM",
        "dueDate": "2024-05-02"
    }, {
        "id": 12,
        "content": "Software Engineering",
        "importance": "medium",
        "dueTime": "12:11 PM",
        "dueDate": "2024-12-15"
    }, {
        "id": 13,
        "content": "Computer Networks",
        "importance": "medium",
        "dueTime": "8:28 PM",
        "dueDate": "2024-01-04"
    }, {
        "id": 14,
        "content": "Computer Graphics",
        "importance": "high",
        "dueTime": "9:53 AM",
        "dueDate": "2024-06-26"
    }, {
        "id": 15,
        "content": "Data Structures",
        "importance": "low",
        "dueTime": "11:00 AM",
        "dueDate": "2024-11-18"
    }]

    const [filteredTasks, setFilteredTasks] = useState(data || []);
    const handleSelectedRowsChange = (state) => {
        setSelectedRows(state.selectedRows);
        console.log("Selected Rows:", state.selectedRows);
      };
    const deleteTasks = async ()=>{
        try {
            const response = selectedRows.map((todo) =>
                axios.delete(`http://localhost:8080/api/todo/${todo.id}`)
              );
              await Promise.all(response);
        
              setFilteredTasks((prevTodos) => {
                const selectedIds = selectedRows.map((todo) => todo.id);
        
                const updatedtodos = prevTodos.filter(
                  (todo) => !selectedIds.includes(todo.id)
                );
                return updatedtodos;
              });
        
              alert("todos permanently deleted");  
        } catch (error) {
            console.error("Failed to update emails", error);
            setError(`Failed to update emails`);
            
    }
}

    // useEffect(() => {
    //     const fetchContacts = async () => {
    //         try {
    //             const data = await FetchContacts(user.id); // Assuming FetchContacts is a function that fetches data
    //             console.log(data);
    //             setFilteredContacts(data); // Setting the fetched data to state
    //         } catch (error) {
    //             console.error("Error fetching contacts:", error);
    //         }
    //     };

    //     fetchContacts(); // Call the async function to fetch contacts
    // }, [user.id]);

    // Initialize state with contacts prop
    // useEffect(() => {
    //     setFilteredTasks(data || []);
    // }, [data]);

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

                        >
                            <RefreshCcw size={18} />
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