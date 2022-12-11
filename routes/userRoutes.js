const express = require('express');
const controller = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middlewares/auth');
const {validateLogIn, validateSignUp, validateResult} = require('../middlewares/validators');
const {logInLimiter} = require('../middlewares/rateLimiters');


const router = express.Router();

//renders sign up page
router.get('/new', isGuest, controller.new);

//handles creation of new sign-up
router.post('/', isGuest, validateSignUp, validateResult,  controller.create);

//renders login page
router.get('/login', isGuest,  controller.userLogin);

// handles a login attempt
router.post('/login', logInLimiter, isGuest, validateLogIn, validateResult, controller.login);

router.get('/profile', isLoggedIn, controller.profile);

router.get('/logout', isLoggedIn, controller.logout);

module.exports = router;