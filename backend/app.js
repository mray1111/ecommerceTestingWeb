const express = require("express");
const app = express();
app.use(express.json());


//Route Imports
const product=require("./routes/productRoute");
app.use("/api/v1",product);
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

module.exports = app;