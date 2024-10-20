import React, { useEffect, useState } from 'react';
import { getUsers, getTask, deleUser } from '../service/api';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    setLoading(true);
    try {
      let response = await getUsers();
      setUsers(response.data.reverse());
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await deleUser(id);
      await getAllUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSingleTaskDetails = async (id) => {
    await getTask(id);
    navigate(`/task-list/${id}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const sortTasksUsername = () => {
    const sorted = [...users].sort((a, b) => a.name.localeCompare(b.name));
    setUsers(sorted);
  };

  const sortTasksDepartment = () => {
    const sorted = [...users].sort((a, b) => a.department.localeCompare(b.department));
    setUsers(sorted);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="text-primary">User Management</h3>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-sort">
            Sort By
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={sortTasksUsername}>Name</Dropdown.Item>
            <Dropdown.Item onClick={sortTasksDepartment}>Department</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>

      <div className="row">
        {currentUsers.map((user) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={user._id}>
            <div className="card border-primary">
              <div className="card-body">
                <h5 className="card-title">{user.name}</h5>
                <p className="card-text">
                  <strong>User ID:</strong> {user._id}
                  <br />
                  <strong>Age:</strong> {user.age}
                  <br />
                  <strong>Department:</strong> {user.department}
                </p>
                <button
                  className="btn btn-info btn-sm mr-2"
                  onClick={() => getSingleTaskDetails(user._id)}
                >
                  Show Tasks
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
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

export default UserList;