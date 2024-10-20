import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addTask } from '../service/api';

const defaultValue = {
  taskname: '',
  username: '',
};

const AddTask = () => {
  const [task, setTask] = useState(defaultValue);
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    console.log(task);
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
                <label htmlFor="username" className="form-label">
                  Enter the Name of User:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder="User's name"
                  onChange={onValueChange}
                />
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
