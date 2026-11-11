const express = require('express');
const router = express.Router();
const testimoniController = require('../controller/testimoniController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

// publik
router.get('/', testimoniController.getAllTestimonials);
router.get('/:id', testimoniController.getTestimoniById);

// harus login (user dan admin)
router.post('/', verifyToken, authorizeRoles('user, admin'), testimoniController.createTestimoni);

// hanya admin
router.put('/:id', verifyToken, authorizeRoles('admin'), testimoniController.updateTestimoni);
router.delete('/:id', verifyToken, authorizeRoles('admin'), testimoniController.deleteTestimoni);
    
module.exports = router;