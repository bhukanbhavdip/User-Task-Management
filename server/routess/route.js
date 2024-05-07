import express from 'express';
import { addTask, addUser, getTask, getTasks, getUsers,deleUser } from '../controller/user-controller.js';

const router = express.Router();

router.post('/addUser',addUser)
router.get('/allUser',getUsers)
router.post('/addTask',addTask)
router.get('/allTask',getTasks) 
router.get('/tasks/:userId',getTask)
router.delete('/delete/:id',deleUser)

export default router;