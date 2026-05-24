const {register,login}=require("../controllers/authController");
const express=require("express");
const route=express.Router();

route.post("/register",register);
route.post("/login",login);
module.exports={route};