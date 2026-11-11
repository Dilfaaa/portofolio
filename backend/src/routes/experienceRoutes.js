const express = require('express');
const router = express.Router();
const experienceController = require('../controller/experienceController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

// publik
router.get('/', experienceController.getAllExperiences);
router.get('/:id', experienceController.getExperienceById);

// hanya admin
router.post('/', verifyToken, authorizeRoles('admin'), experienceController.createExperience);
router.put('/:id', verifyToken, authorizeRoles('admin'), experienceController.updateExperience);
router.delete('/:id', verifyToken, authorizeRoles('admin'), experienceController.deleteExperience);

module.exports = router;