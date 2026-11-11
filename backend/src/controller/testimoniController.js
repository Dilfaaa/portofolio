const testimonialModel= require('../models/testimoniModel')

const getAllTestimonials = async (req, res) => {
    try {
        const testimonials = await testimonialModel.getAlltestimonials();
        res.status(200).json({ success: true, total: testimonials.length, data: testimonials });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const getTestimoniById = async (req, res) => {
    try {
        const { id } = req.params;
        const testimoni = await testimonialModel.getTestimoniById(id);
        if (!testimoni) return res.status(404).json({ success: false, message: 'Data testimoni tidak ditemukan' });
        res.status(200).json({ success: true, data: testimoni });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

const createTestimoni = async (req, res) => {
    try {
        const data = req.body;
        if (!data.name || !data.role || !data.message) return res.status(400).json({ success: false, message: 'Nama sertifikat (name), jabatan (role), dan pesan (message) wajib diisi' });
        const result = await testimonialModel.createTestimoni(data);
        res.status(201).json({ success: true, message: 'Testimoni berhasil ditambahkan', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};  

const updateTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (!data.name || !data.role || !data.message) return res.status(400).json({ success: false, message: 'Nama sertifikat (name), jabatan (role), dan pesan (message) wajib diisi' });
        const result = await testimonialModel.updateTestimoni(id, data);
        if (result.affectedRows === 0) return res.status(404).json({ success : false, message : 'Testimoni tidak ditemukan'})
        res.status(201).json({ success: true, message: 'Testimoni berhasil diperbarui', data: { id: result.insertId } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};  

const deleteTestimoni = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await testimonialModel.deleteTestimoni(id);
        if (result.affectedRows === 0) return res.status(404).json({ success: false, message: 'Testimoni tidak ditemukan' });
        res.status(200).json({ success: true, message: 'Testimoni dihapus' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

module.exports = { getAllTestimonials, getTestimoniById, createTestimoni, updateTestimoni, deleteTestimoni };