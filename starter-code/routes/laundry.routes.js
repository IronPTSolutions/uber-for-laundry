const express = require('express');
const router = express.Router();
const laundryController = require('../controllers/laundry.controller');
const secure = require('../middleware/secure.middleware');

router.get('/dashboard', secure.isAuthenticated, laundryController.dashboard);
router.post('/launderers', secure.isAuthenticated, laundryController.doLaunder);

module.exports = router;
