const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const dbConnect = require("./config/dbConnect");
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middlewares/errorHandler");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

dbConnect();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use("/", (req, res) => {
//   res.send("Hello from server");
// });

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
