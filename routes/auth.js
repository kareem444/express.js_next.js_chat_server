const express = require('express');
const { signup, login } = require('../controllers/auth');
const checkIfExisitUser = require('../middleware/verifySignUp');
const router = express.Router()

router.post('/signup', checkIfExisitUser, signup);
router.post('/signin', login);

module.exports = router