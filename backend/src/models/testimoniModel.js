const db = require('../config/db')

// GET SEMUA DATA
const getAlltestimonials = async () => {
    const [rows] = await db.query('SELECT * FROM testimonials ORDER BY created_at DESC')
    return rows
}

//GET BY ID
const getTestimoniById = async (id) => {
    const [rows] = await db.query('SELECT * FROM testimonials WHERE id = ?', [id])
    return rows[0]      
}

//TAMBAH DATA
const createTestimoni = async (data,id) => {
    const { name, role, company, message, avatar_url, rating, } = data
    const [result] = await db.query(
        'INSERT INTO testimonials (name, role, company, message, avatar_url, rating) VALUES (?, ?, ?, ?, ?, ?)',
        [name, role, company, message, avatar_url, rating]
    )
    return result
}

//EDIT DATA
const updateTestimoni = async (id, data) => {
    const { name, role, company, message, avatar_url, rating, } = data
    const result = await db.query(
        'UPDATE testimonials SET name = ?, role = ?, company = ?, message = ?, avatar_url = ?, rating= ? WHERE id = ?',
        [name, role, company, message, avatar_url, rating, id]
    )
    return result
}

//HAPUS DATA
const deleteTestimoni = async (id) => {
    const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [id])
    return result
}

module.exports = {
    getAlltestimonials,
    getTestimoniById,
    createTestimoni,
    updateTestimoni,
    deleteTestimoni,
}