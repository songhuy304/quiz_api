var express = require('express');
var router = express.Router();
var userModel = require('../model/user')
var ResHelper = require('../helper/ResponseHandle');
var Validator = require('../validators/user');
const { validationResult } = require('express-validator');

const config = require('../config/config');
const protect = require('../middleware/protect');
const paginateResults = require('../helper/paginateResults')


router.get('/', async function (req, res, next) {
  try {
    const paginatedUsers = await paginateResults(userModel, {}, {
      page: req.query.page,
      limit: req.query.limit,
      sortField: 'createdAt',
      sortOrder: -1
    });

    ResHelper.ResponseSend(res, true, 200, paginatedUsers);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async function (req, res, next) {
  try {
    let user = await userModel.find({ _id: req.params.id }).exec();
    ResHelper.RenderRes(res, true, 200, user)
  } catch (error) {
    ResHelper.ResponseSend(res, false, 404, error)
  }
});

router.post('/', Validator.UserValidate(), async function (req, res, next) {
  var errors = validationResult(req).errors;
  if (errors.length > 0) {
    ResHelper.ResponseSend(res, false, 404, errors);
    return;
  }
  try {
    var newUser = new userModel({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    await newUser.save();
    ResHelper.ResponseSend(res, true, 200, newUser)
  } catch (error) {
    ResHelper.ResponseSend(res, false, 404, error)
  }
});
router.put('/:id', async function (req, res, next) {
  try {
    let user = await userModel.findById
      (req.params.id).exec()
    user.email = req.body.email;
    await user.save()
    ResHelper.ResponseSend(res, true, 200, user);
  } catch (error) {
    ResHelper.ResponseSend(res, false, 404, error)
  }
});


router.delete('/:id', async function (req, res, next) {
  try {
    let user = await userModel.findByIdAndUpdate
      (req.params.id, {
        status: false
      }, {
        new: true
      }).exec()
    ResHelper.ResponseSend(res, true, 200, user);
  } catch (error) {
    ResHelper.ResponseSend(res, false, 404, error)
  }
});

module.exports = router;
