const User=require("../models/userModel");
const catchAsyncErrors=require("../middleware/catchAsyncErrors")

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

//login User
exports.loginUser= catchAsyncErrors(async(req, res, next)=>{
    const {email, password}=req.body;

        //checking if user has given password and email both
        if(!email || !password){
            return next(new ErrorHander("Please enter Email & Password",400));
        }

        const user=await User.findOne({email}).select("+password");
        //console.log(user);

        if(!user){
            return next(new ErrorHander("Invalid email or Password "));
        }

        const isPasswordMatched= await user.comparePassword(password);
        //console.log(isPasswordMatched);

        if(!isPasswordMatched){
            return next(new ErrorHander("Invalid email or password ",401));
        }

       // console.log(isPasswordMatched);

    const token=user.getJWTToken();
    //console.log(token)
    res.status(201).json({
        success:true,
        token,
        user
    });
})