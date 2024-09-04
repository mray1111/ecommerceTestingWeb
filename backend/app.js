const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");
// const path=require("path");
const cors = require("cors");
const errorMiddleware=require("./middleware/error");


//config
dotenv.config({path:"../backend/config/config.env"})


app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000", // Replace with your frontend's URL
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
}));
//Route Imports
const product=require("./routes/productRoute");
const user=require("./routes/userRoutes");
const order = require("./routes/orderRoute");
const payment=require("./routes/paymentRoute");



app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);


app.get("/",(req,res)=>{
    res.send(`Backend is running successfully`)
})




//for npm run build in online
// app.use(express.static(path.join(__dirname,"../frontend/build")));
// app.get("*",(req, res)=>{
//     res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
// })



//Middleware for Errors
app.use(errorMiddleware); 
module.exports = app;