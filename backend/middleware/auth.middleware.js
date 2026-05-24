const jwt=require("jsonwebtoken");
const protectedRoute=async(req,res,next)=>{
    try {
        const token=req.headers.authorization?.split(" ")[1];
        
        if(!token){
            return res.status(401).json({
            message:"No token, authorization denied"  
        });
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    } catch (error) {
        
console.log("AUTH ERROR:",error.message);

return res.status(401).json({
message:"Token invalid"
});

    }
}

module.exports=protectedRoute;