import React, { useCallback, useEffect, useState } from 'react';
import { getTasks } from '../service/api';
import Multiselect from 'multiselect-react-dropdown';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [selectedUsernames, setSelectedUsernames] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);

    const uniqueUsernames = Array.from(new Set(response.data.map(task => task.username)));
    setUsernames(uniqueUsernames);
    setSelectedUsernames(uniqueUsernames); // Select all by default
  };

  const filterTasks = useCallback(() => {
    let filtered = tasks.filter(task => selectedUsernames.includes(task.username));
    if (search.trim() !== '') {
      filtered = filtered.filter(task =>
        task.username.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredTasks(filtered);
  }, [tasks, selectedUsernames, search]);

  useEffect(() => {
    filterTasks();
  }, [tasks, selectedUsernames, search, filterTasks]);

  const sortTasksUsername = () => {
    const sorted = [...filteredTasks].sort((a, b) => a.username.localeCompare(b.username));
    setFilteredTasks(sorted);
  };

  const sortTasks = () => {
    const sorted = [...filteredTasks].sort((a, b) => a.taskname.localeCompare(b.taskname));
    setFilteredTasks(sorted);
  };

  const sortTasksDepartment = () => {
    const sorted = [...filteredTasks].sort((a, b) => {
      if (a.userId && a.userId.department && b.userId && b.userId.department) {
        return a.userId.department.localeCompare(b.userId.department);
      }
      return 0; // Keep the order unchanged if department or userId is undefined
    });
    setFilteredTasks(sorted);
  };

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = filteredTasks.slice(indexOfFirstTask, indexOfLastTask);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container my-5">
      {/* Search and Filter Section */}
      <div className="row mb-4 align-items-center justify-content-between">
        {/* Search Bar */}
        <div className="col-md-4 mb-2 mb-md-0">
          <div className="input-group">
            <input
              type="search"
              className="form-control"
              placeholder="Search by user"
              aria-label="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="btn btn-secondary" type="button">
              Search
            </button>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="col-md-4 text-center mb-2 mb-md-0">
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Sort By
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={sortTasksUsername}>Username</Dropdown.Item>
              <Dropdown.Item onClick={sortTasks}>Task</Dropdown.Item>
              <Dropdown.Item onClick={sortTasksDepartment}>Department</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* MultiSelect for User Filtering */}
        <div className="col-md-4">
          <Multiselect
            className="float-end"
            isObject={false}
            showCheckbox
            options={usernames}
            selectedValues={selectedUsernames}
            onSelect={(selectedList) => setSelectedUsernames(selectedList)}
            onRemove={(selectedList) => setSelectedUsernames(selectedList)}
            displayValue="Username"
            placeholder="Filter by Username"
            style={{
              multiselectContainer: { maxHeight: '200px', overflowY: 'auto' },
              searchBox: { padding: '10px', border: '1px solid #ced4da' },
              option: { fontSize: '14px' },
            }}
          />
        </div>
      </div>

      {/* Tasks List (Responsive Card Design) */}
      <div className="row">
        {currentTasks.length > 0 ? (
          currentTasks.map(task => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={task._id}>
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title">Task Name: {task.taskname}</h5>
                  <p className="card-text">
                    <strong>Username:</strong> {task.username}
                    <br />
                    <strong>Department:</strong> {task.userId.department}
                    <br />
                    <strong>Task ID:</strong> {task._id}
                    <br />
                    <strong>User ID:</strong> {task.userId._id}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No tasks found.</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(filteredTasks.length / tasksPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default TaskList;
