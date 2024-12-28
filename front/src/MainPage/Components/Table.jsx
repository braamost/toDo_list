import { useState, useEffect,useContext } from "react";
import "./table.css"
import DataTable from "react-data-table-component";
import { RefreshCcw, Trash2 } from 'lucide-react';
import { Datacontext } from "../../main";
function MyTasks({data}) {
    const {user,setUser}= useContext(Datacontext);
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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setFilteredTasks(data); // Setting the fetched data to state
            } catch (error) {
                console.error("Error fetching contacts:", error);
            }
        };
        fetchTasks(); 
        
    }, [user]);

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
                    defaultSortFieldId={1}
                />
            </div>
        </div>
    );
}

export default MyTasks;