const { default: mongoose } = require("mongoose");

const dbConnect = () => {
  try {
    const conn = mongoose.connect("mongodb://localhost:27017/puzzle");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database error");
    // throw new Error(error);
  }
};

module.exports = dbConnect;
