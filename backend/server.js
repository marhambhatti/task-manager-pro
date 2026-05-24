require("dotenv").config();
const db=require("./config/db");
const port=process.env.PORT||5000;
const express=require("express");
const app=express();
const {route}=require("./routes/user.route")
const taskroute=require("./routes/task.route");


app.use(express.json())
app.use("/api",route);
app.use("/api",taskroute);
app.listen((port),()=>{
    console.log(`Server Is Running On Port ${port}`);
})