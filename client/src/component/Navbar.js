import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-sm navbar-light bg-dark text-light">
                <NavLink className="navbar-brand text-light" to='/'>Navbar</NavLink>
                <button className="navbar-toggler " type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse text-light" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item active mx-3 ">
                            <NavLink className="nav text-light" style={{textDecoration: "none", color: "black"}} to='/add-user'>Add User</NavLink>
                        </li>
                        <li className="nav-item active mx-3">
                            <NavLink className="nav text-light" style={{textDecoration: "none", color: "black"}} to='/add-task'>Add Task</NavLink>
                        </li>
                        <li className="nav-item active mx-3">
                            <NavLink className="nav text-light" style={{textDecoration: "none", color: "black"}} to='/user-list'>User's List</NavLink>
                        </li>
                        <li className="nav-item active mx-3">
                            <NavLink className="nav text-light" style={{textDecoration: "none", color: "black"}} to='/task-list'>Task's List</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar