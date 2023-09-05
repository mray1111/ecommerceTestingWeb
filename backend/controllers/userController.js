const User=require("../models/userModel");


//Register a User
exports.registerUser=async(req,res,next)=>{
    const {name, email, password}=req.body;

    const user=await User.create({
        name,
        email,
        password,
        avatar:{
            public_id:"This is a sample id",
            url:"profilepicUrl",
        },
    });

    // console.log(user); 
    const token=user.getJWTToken();

    res.status(201).json({
        success:true,
        token,
        user
    });
};