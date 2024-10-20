import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask, getUsers } from '../service/api';

const defaultValue = {
  taskname: '',
  username: '', // This will be the selected user ID
};

const AddTask = () => {
  const [task, setTask] = useState(defaultValue);
  const [users, setUsers] = useState([]); // State to hold users
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await getUsers();
      if (response && response.data) {
        setUsers(response.data); // Assuming the user data is in response.data
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this runs once on component mount

  const onValueChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const addTaskDetails = async () => {
    if (!task.taskname.trim() || !task.username.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    await addTask(task);
    navigate('/task-list');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-center">
              <h3 className="mb-0">Add New Task</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="taskname" className="form-label">
                  Enter Task:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="taskname"
                  placeholder="Task name"
                  onChange={onValueChange}
                />
              </div>

              <div className="mb-3">
                <label key={users._id} htmlFor="username" className="form-label">
                  Select User:
                </label>
                <select
                  name="username"
                  className="form-select"
                  onChange={onValueChange}
                  value={task.name} // Set the value to the selected user
                >
                  <option value="">Select a user</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.name}> {/* Assuming user object has id and username */}
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={addTaskDetails}
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
