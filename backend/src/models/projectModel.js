const db = require('../config/db')

// FUNGSI 1: Mengambil SEMUA Data Proyek
const getAllProjects = async () => {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC')
    return rows;
}

// FUNGSI 2: Mengambil SATU Proyek Berdasarkan ID
const getProjectById = async (id) => {
    const [rows] = await db.query('SELECT * FROM project WHERE id = ?', [id])
    return rows[0];
}

// FUNGSI 3: Menambahkan Proyek Baru (CREATE)
const createProject = async (data) => {
    const { title, description, category, image_url, demo_url, github_url, tech_stack, is_featured} = data

    const [result] = await db.query(
        `INSERT INTO projects (tittle, description, category, image_url, demo_url, github_url, tech_stack, is_featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [title, description, category, image_url, demo_url, github_url, tech_stack, is_featured || false]
    )
    return result
}

// FUNGSI 4: Memperbarui Data Proyek (UPDATE)
const updateProject = async (id, data) => {
    const { title, description, category, image_url, demo_url, github_url, tech_stack, is_featured} = data

    const [result] = await db.query(
        `UPDATE projects SET 
        tittle = ?, description = ?, category =?,
        image_url = ?, demo_url = ?, github_url = ?,
        tech_stack = ?, is_featured = ?
        WHERE ID = ?`,
        [title, description, category, image_url, demo_url, github_url, tech_stack, is_featured, id]
    )
    return result

}

// FUNGSI 5: Menghapus Proyek (DELETE)
const deleteProject = async (id) => {
    const [result] = await db.query('DELETE FROM projects WHERE id = ?', [id])
    return result
}

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
}