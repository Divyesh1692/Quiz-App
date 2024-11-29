const { Router } = require("express");
const {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require("../controllers/quizController");
const { checkRole, auth } = require("../middlewares/auth");

const quizRouter = Router();

quizRouter.get("/all", getQuizzes);
quizRouter.get("/quiz/:id", auth, getQuizById);
quizRouter.post("/create", auth, checkRole(["admin"]), createQuiz);
quizRouter.post("/submit/:id", auth, submitQuiz);
quizRouter.patch("/update/:id", auth, checkRole(["admin"]), updateQuiz);
quizRouter.delete("/delete/:id", auth, checkRole(["admin"]), deleteQuiz);

module.exports = quizRouter;
