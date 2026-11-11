const { Certificate } = require('node:crypto');
const certifiacteModel = require('../models/certifiacteModel');

const getAllCertificates = async (req, res) => {
    try {
        const certificates = await certifiacteModel.getAllCertificates();
        res.status(200).json({ success: true, total: certificates.length, data: certificates });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const getCertificateById = async (req, res) => {
    try {
        const { id } = req.params;
        const certificate = await certifiacteModel.getCertificateById(id);
        if (!certificate) return res.status(404).json({ success: false, message: 'Data sertifikat tidak ditemukan' });
        res.status(200).json({ success: true, data: certificate });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const createCertificate = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.issuer || !data.issue_date) return res.status(400).json({ success: false, message: 'Nama sertifikat (name), penerbit (issuer), dan tanggal terbit (issue_date) wajib diisi' });
        const result = await certifiacteModel.createCertificate(data);
        res.status(201).json({ success: true, message: 'Sertifikat berhasil ditambahkan', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};  

const updateCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!data.name || !data.issuer || !data.issue_date) return res.status(400).json({ success: false, message: 'Nama sertifikat (name), penerbit (issuer), dan tanggal terbit (issue_date) wajib diisi' });
        const result = await certifiacteModel.updateCertificate(id, data);
        if (result.affectedRows === 0) return res.status(404).json({ success : false, message : 'Sertifikat tidak ditemukan'})
        res.status(201).json({ success: true, message: 'Sertifikat berhasil diperbarui', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};  

const deleteCertificate = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await certifiacteModel.deleteCertificate(id);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Sertifikat tidak ditemukan' });
        res.status(200).json({ success: true, message: 'Sertifikat dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { getAllCertificates, getCertificateById, createCertificate, updateCertificate, deleteCertificate };