import React from 'react'
import { useEffect, useState } from 'react';
import { getTask } from '../service/api';
import { useParams } from 'react-router-dom';

const SingleuserTaskList = () => {
  const [tasks, setTasks] = useState([]);
  const {id}=useParams()
  // console.log("id is ",id)
  useEffect(() => {
    loadTaskDetails();
}, []);

const loadTaskDetails = async () => {
    // let response = await getTask(id);
    // setTasks({...response.data.userId._id[0]});
    try {
      let response = await getTask(id);
      // console.log('Response:', response);
      console.log('Response data:', response.data);
      setTasks(response.data);
  } catch (error) {
      console.error('Error loading task details:', error);
  }
}
// console.log(tasks)
  return (
    <>
    <div className='container my-5'>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id Of Task</th>
            <th scope="col">Name Of Task</th>
            <th scope="col">Name Of The User</th>
            {/* <th scope="col">Department</th> */}
          </tr>
        </thead>
        <tbody>
          {tasks.map(task=>(
          <tr key={task._id}>
            <td>{task._id}</td>
            <td>{task.taskname}</td>
            <td>{task.username}</td>
            {/* <td>{task.department}</td> */}
          </tr>
          ))
        }
        </tbody>
      </table>
    </div>
    </>
  )
}

export default SingleuserTaskList