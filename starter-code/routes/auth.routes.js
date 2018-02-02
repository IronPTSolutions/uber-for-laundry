const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const secure = require('../middleware/secure.middleware');

router.get('/signup', secure.nonAuthenticated, authController.signup);
router.post('/signup', secure.nonAuthenticated, authController.doSignup);

router.get('/login', secure.nonAuthenticated, authController.login);
router.post('/login', secure.nonAuthenticated, authController.doLogin);

module.exports = router;
