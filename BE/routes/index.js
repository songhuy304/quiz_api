var express = require('express');
var router = express.Router();


router.use('/users', require('./users'));
router.use('/auth', require('./auth'));
router.use('/api/v1/exams', require('./exam'));
router.use('/api/v1/questions', require('./question'));
router.use('/api/v1/examResult', require('./examResult'));


module.exports = router;
