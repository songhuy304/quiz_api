const mongoose = require("mongoose");

// Tạo schema cho kỳ thi (Exam)
const examResultSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userName: String,
    totalPoint: Number,
    questionsCount: Number,
    questions_count_correct: Number,
    questions_count_uncorrect: Number,
    skipchoice: Number,
    questions: [
      {
        content: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["single-choice", "multiple-choice"],
          required: true,
        },
        difficult: {
          type: String,
          enum: ["easy", "medium", "hard"],
          default: "medium",
        },
        options: [
          {
            id: {
              type: String,
              required: true,
            },
            text: {
              type: String,
              required: true,
            },
          },
        ],
        correct_answer: {
          type: Number,
          required: true,
        },
        user_choice: {
          type: Number,
          required: true,
        },
        tag: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("examResult", examResultSchema);
