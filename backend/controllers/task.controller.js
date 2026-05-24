const taskModel = require("../models/task.model");
const Task=require("../models/task.model");

const createTask=async(req,res)=>{
try{

const {
title,
description,
status,
priority,
category,
dueDate
}=req.body;

// validation (important)
if(!title){
return res.status(400).json({
message:"Title is required"
});
}

// task create
const task=await Task.create({
title,
description,
status,
priority,
category,
dueDate,

// secure user id (JWT middleware se aayega)
createdBy:req.user.id
});

res.status(201).json({
message:"Task created successfully",
task
});

}catch(error){

console.log("CREATE TASK ERROR:",error);

res.status(500).json({
message:error.message
});

}
}
const getTask=async (req,res)=>{
    const tasks=await Task.find({
        createdBy:req.user.id
    })

    res.status(200).json({
        success:true,
        tasks
    })

}
const updateTask=async (req,res)=>{
    try{

const taskId=req.params.id;

// check task belongs to logged-in user
const task=await Task.findOne({
_id:taskId,
createdBy:req.user.id
});

if(!task){
return res.status(404).json({
message:"Task not found or unauthorized"
});
}

// update task
const updatedTask=await Task.findByIdAndUpdate(
taskId,
req.body,
{new:true}
);

res.json({
success:true,
message:"Task updated successfully",
task:updatedTask
});

}catch(error){
res.status(500).json({
message:error.message
});
}
}


const deleteTask=async (req,res)=>{
    try{

const taskId=req.params.id;

const task=await Task.findOne({
_id:taskId,
createdBy:req.user.id
});

if(!task){
return res.status(404).json({
message:"Task not found or unauthorized"
});
}

// delete
await Task.findByIdAndDelete(taskId);

res.json({
success:true,
message:"Task deleted successfully"
});

}catch(error){
res.status(500).json({
message:error.message
});
}
}




module.exports={createTask,getTask,updateTask,deleteTask};