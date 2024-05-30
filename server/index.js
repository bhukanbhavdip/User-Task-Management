import express from 'express'
import Connection from './database/db.js';
import  dotenv  from 'dotenv';
import Routes from './routess/route.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
dotenv.config();
app.use(cors(
  {
     origin: ["https://user-task-management-frontend.vercel.app"],
     methods: ["POST", "GET"],
     credentials: true
  }
));
app.use(express.json());
app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/',Routes)
const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
Connection(username,password);
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`))

