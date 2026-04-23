const express = require('express');
const router = express.Router();
const { getUsers, deleteUser, getStats } = require('../controllers/user.controller');
const { auth, authorize } = require('../middleware/auth.middleware');

router.get('/', auth, authorize('ADMIN'), getUsers);
router.delete('/:id', auth, authorize('ADMIN'), deleteUser);
router.get('/stats', auth, getStats);

module.exports = router;
