const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected to ${data.connection.host}`);
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error.message);
    });
};

module.exports = connectDatabase;

