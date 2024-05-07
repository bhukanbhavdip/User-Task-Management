import Task from "../model/taskModel.js";
import User from "../model/userModel.js";

export const addUser=async(req,res)=>{
    const user = req.body;
    const newUser = new User(user);
    try {
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
export const getUsers=async(req,res)=>{
    try {
        const users = await User.find({})
        res.status(200).json(users);
    } catch (error) {
        res.status(401).json({message:error.message})
    }
}
export const addTask= async(req,res)=>{
    const task = req.body;
    //const newTask = new Task(task)
    try {
        const user=await User.find({name:req.body.username})
        // console.log(user[0]._id)
        const newTask = new Task({...task,userId:user[0]._id})
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({message: error.message})
    }
}
export const deleUser = async (req,res) =>{
    const id = req.params.id
    try{
        const duser = await User.deleteOne({_id : id})
        res.status(200).json(duser)
        await Task.deleteMany({ userId: id });
    }catch (error) {
        res.status(401).json({message:error.message})
    }
    
}
export const getTasks=async(req,res)=>{
    try {
        const tasks = await Task.find().populate("userId") // get name only
        // console.log(tasks)
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(401).json({message:error.message})
    }
}
export const getTask = async (req,res)=>{
    try{
        const task = await Task.find({userId: req.params.userId})
        // console.log(req.params.id);
        res.status(200).json(task);
    }catch(error){
        console.log(error)
        res.status(401).json({message: error.message});
    }
}

///name,task,department

// const user= await user.find(name)
// const task =new task(name,task,userid:user._id)