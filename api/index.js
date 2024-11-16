const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");

const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

const app = express();
const PORT = process.env.PORT || 8000;

dbConnect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// app.use("/", (req, res) => {
//   res.send("Hello from server");
// });

app.use("/api/auth", authRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
