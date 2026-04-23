const express = require('express');
const router = express.Router();
const { createAssignment, getAssignments, logAbsence, logRestaurant } = require('../controllers/task.controller');
const { auth, authorize } = require('../middleware/auth.middleware');

router.post('/assignments', auth, authorize('ADMIN'), createAssignment);
router.get('/assignments', auth, getAssignments);
router.post('/absences', auth, authorize('SURVEILLANT', 'ADMIN'), logAbsence);
router.post('/restaurant', auth, authorize('SURVEILLANT', 'ADMIN'), logRestaurant);

module.exports = router;
