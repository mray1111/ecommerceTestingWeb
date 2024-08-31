const mongoose = require("mongoose");

const mongooseURI = process.env.DB_URI || 'mongodb+srv://manishiitguwahati37:Manish@cluster0.ivtehwg.mongodb.net/';

const connectDatabase = () => {
  mongoose
    .connect(mongooseURI, {
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

