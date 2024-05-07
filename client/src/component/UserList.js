import React, { useEffect, useState } from 'react';
import { getUsers, getTask, deleUser } from '../service/api';
import { useNavigate, Link } from 'react-router-dom';
import { FaSort } from "react-icons/fa";
import Dropdown from 'react-bootstrap/Dropdown';

const UserList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5); // Number of users to display per page
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    let response = await getUsers();
    setUsers(response.data);
  }
  const handleDelete = async (id) => {
    await deleUser(id);
    getAllUsers();
  }
  const getSingleTaskDetails = async (id) => {
    await getTask(id);
    navigate(`/task-list/${id}`);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }
  // const handleSort = (field) => {
  //   if (sortBy === field) {
  //     setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  //   } else {
  //     setSortBy(field);
  //     setSortOrder('asc');
  //   }
  // }
  const sortTasksUsername = () => {
    const sorted = [...users].sort((a, b) => {
      // Assuming 'username' is the criterion for sorting
      return a.name.localeCompare(b.name);
    });
    setUsers(sorted);
  }

  const sortTasksDepartment = () => {
    const sorted = [...users].sort((a, b) => {
      // Assuming 'username' is the criterion for sorting
      return a.department.localeCompare(b.department);
    });
    setUsers(sorted);
  }
  // const sortedUsers = () => {
  //   if (sortBy) {
  //     const sorted = [...users].sort((a, b) => {
  //       let comparison = 0;
  //       if (typeof a[sortBy] === 'string' && typeof b[sortBy] === 'string') {
  //         comparison = a[sortBy].localeCompare(b[sortBy]);
  //       } else if (typeof a[sortBy] === 'number' && typeof b[sortBy] === 'number') {
  //         comparison = a[sortBy] - b[sortBy];
  //       }
  //       return sortOrder === 'asc' ? comparison : -comparison; // Toggle comparison for descending order
  //     });
  //     return sorted;
  //   }
  //   return users;
  // }


  // Calculate the index of the last user to display on the current page
  const indexOfLastUser = currentPage * usersPerPage;
  // Calculate the index of the first user to display on the current page
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Slice the array of users to get the users for the current page
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
      <div className="container my-5">
        <h5>Sort By Value</h5>
        <Dropdown className=' container'>
          <Dropdown.Toggle className='dropdown_btn btn-secondary' id="dropdown-basic">
            <FaSort/>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={sortTasksUsername}>Name</Dropdown.Item>
            <Dropdown.Item onClick={sortTasksDepartment}>Department</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='container my-5'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id Of Users</th>
              <th scope="col">
                Name
              </th>
              <th scope="col">
                Age
              </th>
              <th scope="col">
                Department
              </th>

              <th scope="col">Tasks</th>
              <th scope="col">Delete User</th>

            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.department}</td>
                <td>
                  <button style={{cursor: "pointer"}} onClick={() => { getSingleTaskDetails(user._id) }} component={Link} to={`/task-list/${user._id}`}>show task</button>
                </td>
                <td>
                  <button onClick={()=>handleDelete(user._id)} style={{cursor: "pointer"}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container my-2">
        <ul className="pagination">
          {Array.from({ length: Math.ceil(users.length / usersPerPage) }, (_, index) => (
            <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              <button className="page-link" onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default UserList;
