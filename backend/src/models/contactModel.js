const db = require('../config/db')

// GET SEMUA DATA
const getAllContacts = async () => {
    const [rows] = await db.query('SELECT * FROM messages ORDER BY created_at DESC')
    return rows
}

//GET BY ID
const getContactById = async (id) => {
    const [rows] = await db.query('SELECT * FROM messages WHERE id = ?', [id])
    return rows[0]
}

//TAMBAH DATA
const createContact = async (data,id) => {
    const { sender_name, sender_email, subject, message } = data
    const [result] = await db.query(
        'INSERT INTO messages (sender_name, sender_email, subject, message) VALUES (?, ?, ?, ?)',
        [sender_name, sender_email, subject, message]
    )
    return result
}

//HAPUS DATA
const deleteContact = async (id) => {
    const [result] = await db.query('DELETE FROM messages WHERE id = ?', [id])
    return result
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    deleteContact,
}