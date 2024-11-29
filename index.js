const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRouter = require("./routes/userRoutes");
const quizRouter = require("./routes/quizRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8090;

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
connectDB();

app.use("/user", userRouter);
app.use("/quizzes", quizRouter);
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
app.get("/", (req, res) => {
  res.send("Welcome to the Quiz App API");
});

module.exports = app;
