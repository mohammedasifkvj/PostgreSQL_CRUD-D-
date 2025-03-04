import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import pool from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"
import errorHandler from "./middlewares/errorHandler.js";
import createUserTable from "./data/createUserTable.js";

dotenv.config();

const app=express();
const port=process.env.PORT || 8001;

// Middlewares
app.use(express.json());
app.use(cors())

// Routes
app.use("/api",userRoutes)
// Error handling middleware
app.use(errorHandler)

//Crete table 
createUserTable();

// Test
app.get('/',async(req,res)=>{
    console.log("start");
    const result=await pool.query("SELECT current_database()");
    console.log("end");
    res.send(`The DB name is : ${result.rows[0].current_database}`)
});

app.listen(port,()=>{
    console.log(`Listening on http://127.0.0.1:${port}`);
})