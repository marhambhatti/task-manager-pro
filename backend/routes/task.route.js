
const {createTask,
    getTask,
    updateTask,
    deleteTask,
    searchByTitle,
    filterTasks
}=require("../controllers/task.controller");
const express=require("express");
const auth=require("../middleware/auth.middleware");
const taskroute=express.Router();

//  Create
taskroute.post("/task/create",auth,createTask);
//  Get All
taskroute.get("/task/get",auth,getTask);
// Get By Title
taskroute.get("/task/search",auth,searchByTitle);
// Get By status , priority, category
taskroute.get("/task/filter",auth,filterTasks);
// Update
taskroute.put("/task/update",auth,updateTask);
// Delete
taskroute.delete("/task/delete",auth,deleteTask);

module.exports=taskroute;