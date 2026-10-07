const express = require('express')
const router = express.Router()
const projectController = require('../controller/projectController')

// GET /api/projects -- Mengambil semua proyek
router.get('/', projectController.getAllProjects)

// GET /api/projects/:id -- Mengambil satu proyek berdasarkan id
router.get('/:id', projectController.getProjectById)

// POST /api/projects -- Menambahkan proyek baru
router.get('/', projectController.createrProject)

// PUT /api/projects/:ID -- Memperbarui proyek berdasarkan id
router.get('/:id', projectController.updateProject)

// DELETE /api/projects/:ID -- Menghapus proyek berdasarkan id
router.get('/:id', projectController.deleteProject)

module.exports = router