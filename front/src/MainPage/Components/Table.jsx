import React, { useState, useEffect, useContext } from "react";
import { Check, Trash2, X } from 'lucide-react';
import DataTable from "react-data-table-component";
import { Datacontext } from "../../main";
import { fetchData } from "../../Fetch/Fetch";
import axios from "axios";

function MyTasks({data}) {
    const {user, setUser} = useContext(Datacontext);
    const [error, setError] = useState("");
    const [selectedRows, setSelectedRows] = useState([]);
    const [toggleCleared, setToggleCleared] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filteredTasks, setFilteredTasks] = useState(data || []);

    const customStyles = {
        table: {
            style: {
                minWidth: '100%',
            },
        },
        rows: {
            style: {
                minHeight: '60px',
            },
        },
        headRow: {
            style: {
                minHeight: '56px',
                backgroundColor: '#f8f9fa',
            },
        },
        cells: {
            style: {
                paddingLeft: '16px',
                paddingRight: '16px',
            },
        },
    };

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
        
        return valueB - valueA;
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

    const CustomModal = ({ isOpen, onClose, children }) => {
        if (!isOpen) return null;

        return (
            <div 
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 1000
                }}
                onClick={onClose}
            >
                <div 
                    style={{
                        backgroundColor: 'white',
                        padding: '24px',
                        borderRadius: '8px',
                        maxWidth: '600px',
                        width: '90%',
                        maxHeight: '90vh',
                        overflow: 'auto'
                    }}
                    onClick={e => e.stopPropagation()}
                >
                    <div style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end'
                    }}>
                        <button 
                            onClick={onClose}
                            style={{
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <X size={24} />
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        );
    };

    const TaskDetailsModal = ({ task, isOpen, onClose }) => {
        if (!task) return null;
        
        return (
            <CustomModal isOpen={isOpen} onClose={onClose}>
                <div style={{ padding: '16px' }}>
                    <h2 style={{ 
                        fontSize: '1.5rem', 
                        fontWeight: 'bold',
                        marginBottom: '1.5rem'
                    }}>
                        {task.title}
                    </h2>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: '1fr 1fr',
                        gap: '1rem',
                        marginBottom: '1.5rem'
                    }}>
                        <div>
                            <h3 style={{ 
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#666',
                                marginBottom: '0.5rem'
                            }}>
                                Status
                            </h3>
                            <StatusCell status={task.status} />
                        </div>
                        <div>
                            <h3 style={{ 
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#666',
                                marginBottom: '0.5rem'
                            }}>
                                Importance
                            </h3>
                            <ImportanceCell importance={task.importance} />
                        </div>
                    </div>
                    
                    <div style={{ marginBottom: '1.5rem' }}>
                        <h3 style={{ 
                            fontSize: '0.875rem',
                            fontWeight: '600',
                            color: '#666',
                            marginBottom: '0.5rem'
                        }}>
                            Due Date
                        </h3>
                        <p>{new Date(task.dueDate).toLocaleString()}</p>
                    </div>
                    
                    {task.content && (
                        <div>
                            <h3 style={{ 
                                fontSize: '0.875rem',
                                fontWeight: '600',
                                color: '#666',
                                marginBottom: '0.5rem'
                            }}>
                                Description
                            </h3>
                            <p style={{ color: '#333' }}>{task.content}</p>
                        </div>
                    )}
                </div>
            </CustomModal>
        );
    };

    const columns = [
        {
            name: "Task",
            selector: row => row.title,
            sortable: true,
            grow: 2,
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
        }
    ];

    const handleRowClick = row => {
        setSelectedTask(row);
        setIsModalOpen(true);
    };

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
            resetSelection();
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
            resetSelection();
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
            return row.content?.toLowerCase().includes(searchValue) ||
                   row.importance?.toLowerCase().includes(searchValue) ||
                   row.title?.toLowerCase().includes(searchValue) ||
                   (row.status?.toLowerCase() || '').includes(searchValue);
        });
        setFilteredTasks(filtered);
    };

    // Split tasks into pending and completed
    const pendingTasks = filteredTasks.filter(task => task.status !== 'COMPLETED');
    const completedTasks = filteredTasks.filter(task => task.status === 'COMPLETED');

    return (
        <div style={{ 
            width: '100%', 
            height: '100%',
            padding: '20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
        }}>
            <div style={{ 
                width: '100%',
                backgroundColor: 'white',
                borderRadius: '8px',
                overflow: 'hidden'
            }}>
                <div style={{
                    padding: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: '1px solid #e0e0e0'
                }}>
                    <input
                        style={{
                            padding: '8px 12px',
                            borderRadius: '4px',
                            border: '1px solid #e0e0e0',
                            width: '300px'
                        }}
                        type="text"
                        onChange={handleSearch}
                        placeholder="Search by task, importance, or status..."
                    />
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <button
                            onClick={markAsDone}
                            style={{
                                padding: '8px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#4CAF50',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <Check size={20} />
                        </button>
                        <button
                            onClick={deleteTasks}
                            style={{
                                padding: '8px',
                                borderRadius: '4px',
                                border: 'none',
                                backgroundColor: '#f44336',
                                color: 'white',
                                cursor: 'pointer'
                            }}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>

                {/* Pending Tasks Table */}
                <div style={{ marginBottom: '20px' }}>
                    <h2 style={{ padding: '16px', margin: 0, color: '#666' }}>Pending Tasks</h2>
                    <DataTable
                        columns={columns}
                        data={pendingTasks}
                        selectableRows
                        fixedHeader
                        pagination
                        customStyles={customStyles}
                        paginationPerPage={10}
                        paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                        noDataComponent="No pending tasks found"
                        onSelectedRowsChange={handleSelectedRowsChange}
                        clearSelectedRows={toggleCleared}
                        onRowClicked={handleRowClick}
                        pointerOnHover
                    />
                </div>

                {/* Completed Tasks Table - Only show if there are completed tasks */}
                {completedTasks.length > 0 && (
                    <div>
                        <h2 style={{ padding: '16px', margin: 0, color: '#666' }}>Completed Tasks</h2>
                        <DataTable
                            columns={columns}
                            data={completedTasks}
                            selectableRows
                            fixedHeader
                            pagination
                            customStyles={customStyles}
                            paginationPerPage={10}
                            paginationRowsPerPageOptions={[10, 20, 30, 40, 50]}
                            noDataComponent="No completed tasks found"
                            onSelectedRowsChange={handleSelectedRowsChange}
                            clearSelectedRows={toggleCleared}
                            onRowClicked={handleRowClick}
                            pointerOnHover
                        />
                    </div>
                )}

                <TaskDetailsModal 
                    task={selectedTask}
                    isOpen={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false);
                        setSelectedTask(null);
                    }}
                />
            </div>
        </div>
    );
}

export default MyTasks;