var express = require("express");
var router = express.Router();
var responseReturn = require("../helper/ResponseHandle");
const examResultModel = require("../model/examResult");

router.get("/", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const userdata = await examResultModel
      .find()
      .skip(skip)
      .limit(limit)
      .lean();

    responseReturn.ResponseSend(res, true, 200, userdata);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/exam-result", async function (req, res, next) {
  try {
    const { title, questions, userName } = req.body;
    let totalPoints = 0;
    let count_correct = 0;
    let count_skipChoice = 0;
    let count_uncorrect = 0;
    questions.forEach((question) => {
      if (question.user_choice === question.correct_answer) {
        count_correct += 1;
        question.tag = 'correct';
      } else if (question.user_choice === -1) {
        count_skipChoice += 1;
        question.tag = 'skip'; // Chỉnh lại tag cho đúng
      } else {
        count_uncorrect += 1;
        question.tag = 'uncorrect'; // Chỉnh lại tag cho đúng
      }
    });
    
    if (questions.length > 0) {
      totalPoints = (100 / questions.length) * count_correct;
    }

    var examResult = new examResultModel({
      title: title,
      userName: userName,
      questions: questions,
      questionsCount: questions.length,
      questions_count_correct: count_correct,
      totalPoint: totalPoints,
      skipchoice: count_skipChoice,
      questions_count_uncorrect : count_uncorrect,
    });
    const savedExamResult = await examResult.save();

    responseReturn.ResponseSend(res, true, 200, savedExamResult._id);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Có lỗi xảy ra." });
  }
});
router.get("/exams-history", async function (req, res, next) {
  try {
    const { userName } = req.query;
    console.log(userName)

    if (!userName) {
      return res.status(400).send("User name is required");
    }

    const exams = await examResultModel.find({ userName }).lean();

    if (exams.length === 0) {
      return res.status(404).send("No exams found for this user");
    }

    responseReturn.ResponseSend(res, true, 200, exams);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:examId", async function (req, res, next) {
  try {
    const { examId } = req.params;

    const exam = await examResultModel.findById(examId).lean();

    if (!exam) {
      return res.status(404).send("Exam not found");
    }
    responseReturn.ResponseSend(res, true, 200, exam);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


module.exports = router;
