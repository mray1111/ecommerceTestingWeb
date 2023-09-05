const express = require("express");
const app = express();

const errorMiddleware=require("./middleware/error");
app.use(express.json());


//Route Imports
const product=require("./routes/productRoute");
const user=require("./routes/userRoutes");

app.use("/api/v1",product);
app.use("/api/v1",user);

//Middleware for Errors
app.use(errorMiddleware); 
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

module.exports = app;