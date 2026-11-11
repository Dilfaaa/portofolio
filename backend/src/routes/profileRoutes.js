const express = require('express')
const router = express.Router()
const profileController = require('../controller/profileController')
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

// publik
// GET /api/profile - Mengambil data profil pemilik portofolio
router.get('/', profileController.getProfile)

// hanya admin
// PUT /api/profile/:id - Memperbarui data profil berdasarkan ID
router.put('/:id', verifyToken, authorizeRoles('admin'), profileController.updateProfile)

module.exports = router
