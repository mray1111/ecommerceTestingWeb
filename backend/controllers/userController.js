const User=require("../models/userModel");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const sendToken=require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail");
const ErrorHander=require("../utils/errorhander");

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
    // const token=user.getJWTToken();

    // res.status(201).json({
    //     success:true,
    //     token,
    //     user
    // });

    sendToken(user,201,res);
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
    // const token=user.getJWTToken();
    // //console.log(token)
    // res.status(201).json({
    //     success:true,
    //     token,
    //     user
    // });

    sendToken(user,200,res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });


  
// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    console.log(user)
    if (!user) {
      return next(new ErrorHander("User not found", 404));
    }
  
    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();
    console.log(resetToken)
    await user.save({ validateBeforeSave: false });
  
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;
  
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce Password Recovery`,
        message,
      });
  
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
  
      await user.save({ validateBeforeSave: false });
  
      return next(new ErrorHander(error.message, 500));
    }
  });
  