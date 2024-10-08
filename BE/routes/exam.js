var express = require("express");
var router = express.Router();
var responseReturn = require("../helper/ResponseHandle");
const examModel = require("../model/exam");

router.get("/", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const userdata = await examModel.find().skip(skip).limit(limit).lean();

    const totalRecords = await examModel.countDocuments();
    const totalPages = Math.ceil(totalRecords / limit);

    responseReturn.ResponseSend(res, true, 200, userdata);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/:examId", async function (req, res, next) {
  try {
    const { examId } = req.params;

    const exam = await examModel.findById(examId).populate("questions").lean();

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
