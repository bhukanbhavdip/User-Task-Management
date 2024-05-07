import mongoose, { Schema } from "mongoose";
const taskSchema = mongoose.Schema({
    userId:{ type: Schema.Types.ObjectId, ref: "User" },
    taskname: String,
    username: String,
    department: String,
})
const Task = mongoose.model("task", taskSchema)

export default Task;