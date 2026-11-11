const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

// 1. Endpoint publik (siapapun bisa akses)
router.post('/register', authController.register)
router.post('/login', authController.login)

// 2. Endpoint terproteksi autentikasi (harus login dan menyertakan token jwt)
router.get('/me', verifyToken, authController.getMyProfile)

// 3. Endpoint terproteksi otorisasi (harus login dan memiliki role 'admin')
router.get('/users', verifyToken, authorizeRoles('admin'), authController.getAllUsers)

module.exports = router