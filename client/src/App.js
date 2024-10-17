
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from './component/Navbar';
import AddTask from './component/AddTask';
import AddUser from './component/AddUser';
import TaskList from './component/TaskList';
import UserList from './component/UserList';
import Home from './component/Home';
import SingleuserTaskList from './component/SingleuserTaskList';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/add-task' element={<Home/>}/>
          <Route path='/add-task' element={<AddTask/>}/>
          <Route path='/add-user' element={<AddUser/>}/>
          <Route path='/task-list' element={<TaskList/>}/>
          <Route path='/task-list/:id' element={<SingleuserTaskList />}/>
          <Route path='/user-list' element={<UserList/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
