const taskModel = require("../models/task.model");
const Task=require("../models/task.model");

const createTask=async(req,res,next)=>{
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
next(error);

}
}

// Get Task Without Pagination
const getTask=async (req,res)=>{
    const tasks=await Task.find({
        createdBy:req.user.id
    })

    res.status(200).json({
        success:true,
        tasks
    })

}

// Get Task With Pagination

const getTaskWithPagination=async (req,res,next)=>{
   try {
     const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||5

    const skip=(page-1)*limit;

    const tasks=await Task.find({
        createdBy:req.user.id
    }).skip(skip).limit(limit).sort({createdAt:-1});

    
    res.status(200).json({
        success:true,
        tasks
    })
   } catch (error) {
    next(error);
   }
}
const updateTask=async (req,res,next)=>{
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
next(error);
}
}


const deleteTask=async (req,res,next)=>{
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
next(error)
}
}



const searchByTitle= async (req,res,next)=>{
    try{
    const {title}=req.query;
    const tasks=await Task.find({
        title:{
            $regex:title,
            $options:"i"
        },
        createdBy:req.user.id
    });
    if(tasks.length==0){
        res.status(404).json({
            success:false,
            message:"Title Does NOt Exist.."
        })
    }

    res.status(200).json({
        success:true,
        tasks
    })
}catch(error){
    next(error);
}
}

const filterTasks=async(req,res,next)=>{
try{

const {status,priority,category}=req.query;

let filter={
createdBy:req.user.id
};

if(status){
filter.status=status;
}

if(priority){
filter.priority=priority;
}

if(category){
filter.category=category;
}

const tasks=await Task.find(filter);

if(tasks.length===0){
return res.status(404).json({
success:false,
message:"No tasks found"
});
}

res.status(200).json({
success:true,
count:tasks.length,
tasks
});

}catch(error){
next(error);
}
}
module.exports={createTask,getTask,updateTask,deleteTask,searchByTitle,filterTasks};