const Contact = require('../models/contactModel')

// ambil semua data
const getAll = async (req,res) => {
    try {
        const contacts = await Contact.getAllContacts()
        res.json({ success : true, data : contacts})
    } catch (err) {
        console.error(err)
        res.status(500).json({ success : false, message : 'Server error'})
    }
}

// ambil data dari id
const getById = async (req,res) => {
    try {
        const contact = await Contact.getContactById(req.params.id)
        if (!contact) return res.status(404).json({ success : false, message : 'Not found'})
        res.json({ success : true, data : contact})
    } catch (err) {
        console.error(err)
        res.status(500).json({ success : false, message : 'Server error'})
    }
}

// bikin
const create = async (req,res) => {
    try {
        const result = await Contact.createContact(req.body)
        res.status(201).json({
            success : true,
            message : 'Message sent!',
            data : {id: result.insertId, ...req.body}
        })
    } catch(err) {
        console.error(err)
        res.status(400).json({ success : false, message : 'Invalid data'})
    }
}

// hapus
const remove = async (req,res) => {
    try {
        const result = await Contact.deleteContact(req.params.id)
        if (result.affectedRows === 0)
            return res.status(404).json({ success : false, message : 'Not found'})
        res.json({ success : true, message : 'Message deleted'})
    } catch(err) {
        console.error(err)
        res.status(500).json({ success : false, message : err.message})
    }
}

module.exports = {
    getAll,
    getById,
    create,
    remove  
}