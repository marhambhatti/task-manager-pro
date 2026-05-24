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
if(!title?.trim()){
return res.status(400).json({
message:"Title is required"
});
}

// task create
const task=await Task.create({
title:title.trim(),
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

const getTask=async (req,res,next)=>{
    try {
    const page=Math.max(Number(req.query.page)||1,1);
    const limit=Math.min(Math.max(Number(req.query.limit)||5,1),50);
    const skip=(page-1)*limit;
    const {search,status,priority,category}=req.query;

    const filter={
        createdBy:req.user.id
    };

    if(search){
        filter.title={
            $regex:search,
            $options:"i"
        };
    }

    if(status){
        filter.status=status;
    }

    if(priority){
        filter.priority=priority;
    }

    if(category){
        filter.category=category;
    }

    const [tasks,total]=await Promise.all([
        Task.find(filter).sort({createdAt:-1}).skip(skip).limit(limit),
        Task.countDocuments(filter)
    ]);

    res.status(200).json({
        success:true,
        tasks,
        pagination:{
            page,
            limit,
            total,
            totalPages:Math.ceil(total/limit)||1
        }
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
const allowedUpdates=["title","description","status","priority","category","dueDate"];
const updates={};

allowedUpdates.forEach((field)=>{
if(req.body[field]!==undefined){
updates[field]=req.body[field];
}
});

if(updates.title!==undefined && !updates.title.trim()){
return res.status(400).json({
message:"Title is required"
});
}

if(updates.title){
updates.title=updates.title.trim();
}

const updatedTask=await Task.findOneAndUpdate(
{_id:taskId,createdBy:req.user.id},
updates,
{new:true,runValidators:true}
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
    if(!title){
        return res.status(200).json({
            success:true,
            tasks:[]
        });
    }

    const tasks=await Task.find({
        title:{
            $regex:title,
            $options:"i"
        },
        createdBy:req.user.id
    }).sort({createdAt:-1});

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

const tasks=await Task.find(filter).sort({createdAt:-1});

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
