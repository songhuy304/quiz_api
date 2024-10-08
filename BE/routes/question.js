var express = require("express");
var router = express.Router();
var responseReturn = require("../helper/ResponseHandle");
const questionModel = require("../model/question");

router.get("/", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const questiondata = await questionModel.find().skip(skip).limit(limit).lean();

    responseReturn.ResponseSend(res, true, 200, questiondata);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
