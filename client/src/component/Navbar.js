import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUserPlus, FaTasks, FaList, FaClipboardList } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
    // State to manage the collapse of the navbar
    const [isOpen, setIsOpen] = useState(false);

    // Function to toggle the navbar state
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    // Function to close the navbar when an item is clicked
    const handleItemClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
            <div className="container-fluid px-3">
                <NavLink className="navbar-brand" to='/' style={{ fontSize: '24px', fontWeight: 'bold' }}>
                    Task Manager
                </NavLink>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    onClick={toggleNavbar}  // Use toggle function
                    aria-controls="navbarNav" 
                    aria-expanded={isOpen} // Bind state to aria-expanded
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`} id="navbarNav"> {/* Show class conditionally */}
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link d-flex align-items-center" to='/add-user' onClick={handleItemClick}>
                                <FaUserPlus className="me-1" style={{ fontSize: '1.1em', marginBottom: '1px' }} /> Add User
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link d-flex align-items-center" to='/add-task' onClick={handleItemClick}>
                                <FaTasks className="me-1" style={{ fontSize: '1.1em', marginBottom: '1px' }} /> Add Task
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link d-flex align-items-center" to='/user-list' onClick={handleItemClick}>
                                <FaList className="me-1" style={{ fontSize: '1.1em', marginBottom: '1px' }} /> User's List
                            </NavLink>
                        </li>
                        <li className="nav-item mx-3">
                            <NavLink className="nav-link d-flex align-items-center" to='/task-list' onClick={handleItemClick}>
                                <FaClipboardList className="me-1" style={{ fontSize: '1.1em', marginBottom: '1px' }} /> Task's List
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
