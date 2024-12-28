import { useState, useEffect, useContext } from "react";
import "./table.css";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Check, Trash2 } from 'lucide-react';
import { Datacontext } from "../../main";
import { fetchData } from "../../Fetch/Fetch";

function MyTasks({data}) {
    const {user, setUser} = useContext(Datacontext);
    const [error, setError] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false); 

    const StatusCell = ({ status }) => (
        <div
            style={{
                padding: '6px 12px',
                borderRadius: '12px',
                fontWeight: '500',
                fontSize: '14px',
                textTransform: 'capitalize',
                display: 'inline-block',
                backgroundColor: status === 'COMPLETED' ? '#e6f4ea' : '#fff3e0',
                color: status === 'COMPLETED' ? '#1e7e34' : '#ff8f00'
            }}
        >
            {status?.toLowerCase() || 'pending'}
        </div>
    );
    const importanceSortFunction = (rowA, rowB) => {
        const importanceOrder = {
            'HIGH': 3,
            'MEDIUM': 2,
            'LOW': 1
        };
        
        const valueA = importanceOrder[rowA.importance.toUpperCase()] || 0;
        const valueB = importanceOrder[rowB.importance.toUpperCase()] || 0;
        
        return valueB - valueA; // Default to descending (HIGH to LOW)
    };
    const ImportanceCell = ({ importance }) => {
        const getColor = (importance) => {
            const colors = {
                'HIGH': '#ff4444',
                'MEDIUM': '#ffbb33',
                'LOW': '#00C851'
            };
            return colors[importance.toUpperCase()] || '#757575';
        };

        return (
            <div style={{
                color: getColor(importance),
                fontWeight: '500'
            }}>
                {importance}
            </div>
        );
    };

    const columns = [
        {
            name: "Task",
            selector: row => row.title,
            sortable: true,
        },
        {
            name: "Importance",
            selector: row => row.importance,
            sortable: true,
            sortFunction: importanceSortFunction,
            cell: row => <ImportanceCell importance={row.importance} />
        },
        {
            name: "Due Date",
            selector: row => row.dueDate,
            sortable: true,
            cell: row => {
                const date = new Date(row.dueDate);
                return (
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span style={{ fontWeight: '500' }}>
                            {date.toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'short', 
                                day: 'numeric'
                            })}
                        </span>
                        <span style={{ 
                            color: '#666',
                            fontSize: '0.9em'
                        }}>
                            {date.toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                hour12: true
                            })}
                        </span>
                    </div>
                );
            }
        },
        {
            name: "Status",
            selector: row => row.status,
            sortable: true,
            cell: row => <StatusCell status={row.status} />
        }
    ];
    
    const [filteredTasks, setFilteredTasks] = useState(data || []);

    const handleSelectedRowsChange = (state) => {
        setSelectedRows(state.selectedRows);
    };

    const resetSelection = () => {
        setToggleCleared(!toggleCleared);
        setSelectedRows([]);
    };

    const deleteTasks = async () => {
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
                fetchData(user, setUser);
                return updatedtodos;
            });
            resetSelection(); // Reset selection after delete
            alert("todos permanently deleted");
        } catch (error) {
            console.error("Failed to update todos", error);
            setError(`Failed to update todos`);
        }
    };

    const markAsDone = async () => {
        try {
            const response = selectedRows.map((todo) => {
                todo.status = "COMPLETED";
                return axios.put(`http://localhost:8080/api/todo/${todo.todoId}`, todo);
            });
            await Promise.all(response);
            await fetchData(user, setUser);
            resetSelection(); // Reset selection after marking as done
            alert("todos are updated");
        } catch (error) {
            console.error("Failed to update todos", error);
            setError(`Failed to update todos`);
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setFilteredTasks(data);
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
                row.importance.toLowerCase().includes(searchValue) ||
                (row.status?.toLowerCase() || '').includes(searchValue);
        });
        setFilteredTasks(filtered);
    };

    return (
        <div className="pageContent">
            <div className="container">
                <div className="up">
                    <div>
                        <input
                            className="search"
                            type="text"
                            onChange={handleSearch}
                            placeholder="Search by task, importance, or status..."
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

                <DataTable
                    columns={columns}
                    data={filteredTasks}
                    selectableRows
                    fixedHeader
                    pagination
                    paginationPerPage={6}
                    noDataComponent="No Tasks found"
                    onSelectedRowsChange={handleSelectedRowsChange}
                    clearSelectedRows={toggleCleared}
                    defaultSortFieldId={1}
                />
            </div>
        </div>
    );
}

export default MyTasks;