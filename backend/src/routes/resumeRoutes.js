const express = require('express');
const router = express.Router();
const resumeController = require('../controller/resumeController');
const upload = require('../config/uploadConfig');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

// public
// 2. GET /api/resumes/active - Ambil 1 CV aktif (digunakan oleh tombol Download CV frontend)
router.get('/active', resumeController.getActiveResume);

// admin
// 1. GET /api/resumes - Ambil semua riwayat file CV
router.get('/', verifyToken, authorizeRoles('admin'), resumeController.getAllResumes);
// 3. GET /api/resumes/:id - Ambil detail CV berdasarkan ID
router.get('/:id', verifyToken, authorizeRoles('admin'), resumeController.getResumeById);
// 4. POST /api/resumes - Upload file PDF CV baru (menggunakan middleware upload.single("resume_file"))
router.post('/', verifyToken, authorizeRoles('admin'), upload.single('resume_file'), resumeController.uploadResume);
// 5. PUT /api/resumes/:id - Update data metadata CV (judul, versi, status aktif)
router.put('/:id', verifyToken, authorizeRoles('admin'), resumeController.updateResume);
// 6. DELETE /api/resumes/:id - Hapus file PDF dan datanya dari server
router.delete('/:id', verifyToken, authorizeRoles('admin'), resumeController.deleteResume);

module.exports = router;