const express = require('express');
const router = express.Router();
const { createReclamation, getReclamations, updateReclamation } = require('../controllers/reclamation.controller');
const { auth, authorize } = require('../middleware/auth.middleware');

router.post('/', auth, createReclamation);
router.get('/', auth, getReclamations);
router.patch('/:id', auth, authorize('ADMIN', 'TECHNICIAN'), updateReclamation);

module.exports = router;
