const app = require("./app");
const dotenv=require("dotenv");
const cloudinary=require("cloudinary");

const connectDatabase=require("./config/database.js");
// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
  });

//config
  dotenv.config({path:"backend/config/config.env"});

//connecting to database

connectDatabase();

const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME || "dbzkygnbh";
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY || "433441131784874";
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET || "ErfgidwpufrSCjAjuWx8gQS8f3Q";
const PORT = process.env.PORT || 4000;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});


const server = app.listen(PORT, () => {
    console.log(`Server is working on http://localhost:${PORT}`);
  });

 // console.log(hereerror)
  
  // Unhandled Promise Rejection
  process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });