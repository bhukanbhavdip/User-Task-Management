import React, { useEffect, useState } from 'react';
import { getTask } from '../service/api';
import { useParams } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const SingleUserTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const loadTaskDetails = async () => {
      try {
        let response = await getTask(id);
        setTasks(response.data);
      } catch (error) {
        console.error('Error loading task details:', error);
      }
    };

    loadTaskDetails();
  }, [id]); // Include id in the dependency array

  const sortTasksByName = () => {
    const sorted = [...tasks].sort((a, b) => a.taskname.localeCompare(b.taskname));
    setTasks(sorted);
  };

  // const currentTasks = ; // No pagination, so all tasks are current

  const capitalizeFirstLetter = (string) => {
    if (!string) return ''; // Return empty string if no input
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">
          {tasks.length > 0 ? capitalizeFirstLetter(tasks[0].username) : 'User'}'s Tasks
        </h3>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-sort">
            Sort By
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={sortTasksByName}>Task Name</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="row">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={task._id}>
              <div className="card border-primary">
                <div className="card-body">
                  <h5 className="card-title">Task Name: {task.taskname}</h5>
                  <p className="card-text">
                    <strong>Task ID:</strong> {task._id}
                    <br />
                    <strong>User Name:</strong> {task.username}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>No tasks found for this user</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUserTaskList;
