const db = require('../config/db')

// GET SEMUA DATA
const getAllCertificates = async () => {
    const [rows] = await db.query('SELECT * FROM certificates ORDER BY created_at DESC')
    return rows
}

//GET BY ID
const getCertificateById = async (id) => {
    const [rows] = await db.query('SELECT * FROM certificates WHERE id = ?', [id])
    return rows[0]      
}

//TAMBAH DATA
const createCertificate = async (data,id) => {
    const { name, issuer, issue_date, expiration_date, credential_id, credential_url, description } = data
    const [result] = await db.query(
        'INSERT INTO certificates (name, issuer, issue_date, expiration_date, credential_id, credential_url, description) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, issuer, issue_date, expiration_date || null, credential_id || null, credential_url || null, description || null]
    )
    return result
}

// EDIT DATA
const updateCertificate = async (id, data) => {
    const { name, issuer, issue_date, expiration_date, credential_id, credential_url, description } = data
    const result = await db.query(
        'UPDATE certificates SET name = ?, issuer = ?, issue_date = ?, expiration_date = ?, credential_id = ?, credential_url = ?, description = ? WHERE id = ?',
        [name, issuer, issue_date, expiration_date || null, credential_id || null, credential_url || null, description || null, id]
    )
    return result
}

//HAPUS DATA
const deleteCertificate = async (id) => {
    const [result] = await db.query('DELETE FROM certificates WHERE id = ?', [id])
    return result
}

module.exports = {
    getAllCertificates,
    getCertificateById,
    createCertificate,
    updateCertificate,
    deleteCertificate,
}