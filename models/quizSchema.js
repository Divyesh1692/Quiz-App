const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      question: String,
      options: [String],
      answer: String,
    },
  ],
  submission: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      answers: [{ type: String, required: true }],
      score: { type: Number, required: true },
      submittedAt: { type: Date, default: Date.now },
    },
  ],
});

quizSchema.methods.check = function (userAnswers) {
  try {
    const correctAnswers = this.questions.map((question) => question.answer);
    const score = userAnswers.reduce(
      (acc, answer, index) =>
        answer === correctAnswers[index] ? acc + 1 : acc,
      0
    );
    return score;
  } catch (error) {
    console.log(error.message);
  }
};
const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
