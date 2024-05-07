import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addTask } from '../service/api';


const defaultValue = {
  taskname : '',
  username : '',
  // department: ''
}

const AddTask = () => {
  const [task, setTask] = useState(defaultValue);
  const navigate = useNavigate();
  const onValueChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    console.log(task);
  }
  const addTaskDetails = async () => {
    // Check if required fields are not empty
    if (!task.taskname.trim() || !task.username.trim()) {
      alert('Please fill in all required fields');
      return;
  }
    // e.preventDefault();
    await addTask(task);
    navigate('/task-list');
  }
  return (
    <div className='container my-5'>

      <label htmlFor="name" className='px-1'>Enter Task : </label>
      <input type="text" name='taskname' onChange={(e) => onValueChange(e)} />
      <br /> <br />
      <label htmlFor="name" className='px-1'>Enter the name of user : </label>
      <input type="text" name='username' onChange={(e) => onValueChange(e)} />
      <br /> <br />
      {/* <label htmlFor="name" className='px-1'>Enter Your Department : </label>
      <input type="text" name='department' onChange={(e) => onValueChange(e)} />
      <br /> <br /> */}
      <button type='submit' className='btn-primary' onClick={() => { addTaskDetails() }}>Add Task</button>

    </div>
  )
}

export default AddTask