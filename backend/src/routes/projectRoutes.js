const express = require('express')
const router = express.Router()
const projectController = require('../controller/projectController')
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

// publik
// GET /api/projects -- Mengambil semua proyek
router.get('/', projectController.getAllProjects)
// GET /api/projects/:id -- Mengambil satu proyek berdasarkan id
router.get('/:id', projectController.getProjectById)

// khusus admin
// POST /api/projects -- Menambahkan proyek baru
router.post('/', verifyToken, authorizeRoles('admin'), projectController.createrProject)
// PUT /api/projects/:ID -- Memperbarui proyek berdasarkan id
router.put('/:id', verifyToken, authorizeRoles('admin'), projectController.updateProject)
// DELETE /api/projects/:ID -- Menghapus proyek berdasarkan id
router.delete('/:id', verifyToken, authorizeRoles('admin'), projectController.deleteProject)

module.exports = router