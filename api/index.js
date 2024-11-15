const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/dbConnect");

const app = express();
const PORT = process.env.PORT || 8000;

dbConnect();

app.use("/", (req, res) => {
  res.send("Hello from server");
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
