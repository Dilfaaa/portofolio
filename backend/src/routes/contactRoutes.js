const express = require('express');
const router = express.Router();
const contactController = require('../controller/contactController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

// publik
router.post('/', contactController.create)

// admin
router.get('/', verifyToken, authorizeRoles('admin'), contactController.getAll)
router.get('/:id', verifyToken, authorizeRoles('admin'), contactController.getById)
router.delete('/:id', verifyToken, authorizeRoles('admin'), contactController.remove)


module.exports = router