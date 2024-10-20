import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../service/api';

const defaultValue = {
  name: '',
  age: '',
  department: ''
};

const AddUser = () => {
  const [user, setUser] = useState(defaultValue);
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    console.log(user);
  };

  const addUserDetails = async () => {
    // Check if required fields are not empty
    if (!user.name.trim() || !user.age.trim() || !user.department.trim()) {
      alert('Please fill in all required fields');
      return;
    }
    await addUser(user);
    navigate('/user-list');
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header text-center">
              <h3 className="mb-0">Add New User</h3>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Enter Your Name:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="John Doe"
                  onChange={onValueChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Enter Your Age:
                </label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  placeholder="25"
                  onChange={onValueChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="department" className="form-label">
                  Enter Your Department:
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="department"
                  placeholder="HR"
                  onChange={onValueChange}
                />
              </div>

              <div className="d-grid">
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={addUserDetails}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
