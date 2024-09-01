//creating token and saving in cookie
const COOKIE_EXPIRE=process.env.COOKIE_EXPIRE || 5
const sendToken=(user,statuscode,res)=>{
    const token=user.getJWTToken();

    //options for cookie
    const options={
        expires:new Date(
            Date.now() + COOKIE_EXPIRE*24*60*1000
        ),
        httpOnly:true,
    }

    res.status(statuscode).cookie('token',token,options).json({
        success:true,
        token,
        user,
    });
};

module.exports=sendToken;