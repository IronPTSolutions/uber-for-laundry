const express = require('express');
const router = express.Router();
const laundryController = require('../controllers/laundry.controller');
const secure = require('../middleware/secure.middleware');

router.get('/dashboard', secure.isAuthenticated, laundryController.dashboard);

router.get('/launderers', secure.isAuthenticated, laundryController.launders);
router.post('/launderers', secure.isAuthenticated, laundryController.doLaunder);

router.get('/launderers/:id', secure.isAuthenticated, laundryController.profile);
router.post('/launderers/:id/schedule-pickup', secure.isAuthenticated, laundryController.schedulePickup);

module.exports = router;
