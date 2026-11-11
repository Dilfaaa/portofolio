const express = require('express');
const router = express.Router();
const certificateController = require('../controller/certifcateController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware')

//1. akses publik
router.get('/', certificateController.getAllCertificates);
router.get('/:id', certificateController.getCertificateById);

//2. khusus admin
router.post('/', verifyToken, authorizeRoles('admin'), certificateController.createCertificate);
router.put('/:id', verifyToken, authorizeRoles('admin'), certificateController.updateCertificate);
router.delete('/:id', verifyToken, authorizeRoles('admin'), certificateController.deleteCertificate);

module.exports = router;