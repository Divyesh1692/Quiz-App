const { Router } = require("express");
const {
  signup,
  login,
  logout,
  userQuizzes,
} = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

const userRouter = Router();

userRouter.post("/signup", signup);
userRouter.post("/login", login);
userRouter.post("/logout", logout);
userRouter.get("/quizzes", auth, userQuizzes);

module.exports = userRouter;
