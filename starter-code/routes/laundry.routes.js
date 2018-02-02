const express = require('express');
const router = express.Router();
const laundryController = require('../controllers/laundry.controller');
const secure = require('../middleware/secure.middleware');

router.get('/dashboard', secure.isAuthenticated, laundryController.dashboard);

module.exports = router;
