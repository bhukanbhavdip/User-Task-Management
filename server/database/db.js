import mongoose from "mongoose";
const Connection = async(username,password)=>{
    const URL = `mongodb://${username}:${password}@ac-8pgutk0-shard-00-00.wrdidxl.mongodb.net:27017,ac-8pgutk0-shard-00-01.wrdidxl.mongodb.net:27017,ac-8pgutk0-shard-00-02.wrdidxl.mongodb.net:27017/?ssl=true&replicaSet=atlas-4yqj5r-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL)
        console.log("database connected..!");
    } catch (error) {
            console.log("error while connecting database",error);
    }
}
export default Connection;