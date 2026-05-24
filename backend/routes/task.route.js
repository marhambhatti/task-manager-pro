
const {createTask,getTask,updateTask,deleteTask}=require("../controllers/task.controller");
const express=require("express");
const auth=require("../middleware/auth.middleware");
const taskroute=express.Router();

taskroute.post("/task/create",auth,createTask);
taskroute.get("/task/get",auth,getTask);
taskroute.put("/task/update",auth,updateTask);
taskroute.delete("/task/delete",auth,deleteTask);

module.exports=taskroute;