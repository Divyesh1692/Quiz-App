const Quiz = require("../models/quizSchema");

const createQuiz = async (req, res) => {
  try {
    let { title, description, questions } = req.body;
    const quiz = await Quiz.create({
      title,
      description,
      questions,
    });
    res.status(201).send({ message: "Quiz created successfully", data: quiz });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error creating quiz", error: error.message });
  }
};

const getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().select();
    res.send({ message: "Quizzes fetched successfully", Quizzes: quizzes });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching quizzes", error: error.message });
  }
};

const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).select("-questions.answer");
    if (!quiz) return res.status(404).send({ message: "Quiz not found" });
    res.send({ message: "Quiz fetched successfully", data: quiz });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error fetching quiz", error: error.message });
  }
};

const updateQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!quiz) return res.status(404).send({ message: "Quiz not found" });
    res.send({ message: "Quiz updated successfully", data: quiz });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating quiz", error: error.message });
  }
};

const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!quiz) return res.status(404).send({ message: "Quiz not found" });
    res.send({ message: "Quiz deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error deleting quiz", error: error.message });
  }
};

const submitQuiz = async (req, res) => {
  try {
    let Answers = req.body.answers;
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).send({ message: "Quiz not found" });
    const score = await quiz.check(Answers);
    quiz.submission.push({
      user: req.user._id,
      answers: Answers,
      score: score,
    });
    await quiz.save();
    res.send({ message: "Quiz submitted successfully", score: score });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error submitting quiz", error: error.message });
  }
};

module.exports = {
  createQuiz,
  getQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
};
