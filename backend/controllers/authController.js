const user = require("../models/user.model");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const register=async(req,res)=>{
try{

const {name,email,password}=req.body;

const userExist=await user.findOne({email});

if(userExist){
return res.status(400).json({message:"User already exists"});
}

const hashedPassword=await bcrypt.hash(password,10);

const createUser=await user.create({
name,
email,
password:hashedPassword
});

res.status(201).json({
success:true,
message:"User created successfully",
user:createUser
});

}catch(error){
res.status(500).json({message:error.message});
}
}

const login=async(req,res)=>{
try{

const {email,password}=req.body;

const userExist=await user.findOne({email});

if(!userExist){
return res.status(400).json({
message:"Invalid credentials"
});
}

const isMatch=await bcrypt.compare(password,userExist.password);

if(!isMatch){
return res.status(400).json({
message:"Incorrect password"
});
}

const token=jwt.sign(
{
id:userExist._id,
name:userExist.name
},
process.env.JWT_SECRET,
{expiresIn:"7d"}
);

res.status(200).json({
success:true,
token,
message:"Login successful"
});

}catch(error){
console.log(error);
res.status(500).json({message:error.message});
}
}

module.exports={register,login}