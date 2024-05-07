import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addUser } from '../service/api';

const defaultValue = {
  name : '',
  age : '',
  department: ''
}
const AddUser = () => {
  const [user, setUser]  = useState(defaultValue);
  const navigate = useNavigate();
  const onValueChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value});
    console.log(user);
  }
  const addUserDetails = async()=>{
    // Check if required fields are not empty
    if (!user.name.trim() || !user.age.trim() || !user.department.trim()) {
      alert('Please fill in all required fields');
      return;
  }
    // e.preventDefault();
    await addUser(user);
    navigate('/user-list');
  }
  return (
    <div className='container my-5'>

      <label htmlFor="name" className='px-1'>Enter Your Name : </label>
      <input type="text" name='name' onChange={(e)=>onValueChange(e)} />
      <br /> <br />
      <label htmlFor="name" className='px-1'>Enter Your Age : </label>
      <input type="number" name='age' onChange={(e)=>onValueChange(e)} />
      <br /> <br />
      <label htmlFor="name" className='px-1'>Enter Your Department : </label>
      <input type="text" name='department' onChange={(e)=>onValueChange(e)} />
      <br/> <br />
      <button type='submit' className='btn-primary' onClick={()=>{addUserDetails()}}>Add User</button>

    </div>
    
  )
}

export default AddUser