// 1. Import library yang dibutuhkan
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// 2. Load file konfigurasi .env
dotenv.config();

// Load koneksi database
const db = require('./config/db')

// 3. Inisialisasi aplikasi Express
const app = express();
const PORT = process.env.PORT || 5000;

// 4. Middleware dasar
app.use(cors()); // Mengizinkan request dari domain lain (frontend)
app.use(express.json()); // Membaca body request bertipe JSON
app.use(express.urlencoded({ extended: true })); // Membaca body request bertipe form-data

// 5. Endpoint dasar (Testing Server)
app.get('/',(req, res) => {
    res.status(200).json({
    success: true,
    message: 'selamat datang di API Portopolio Dinamis!', 
    version: '1.0.0'
    });
});

// Endpoint untuk cek status API
app.get('/api/status', (req, res) => {
    res.status(200).json({
    success: true,
    message: 'Server Dalam keadaan sehat dan aktif.', 
    timestamp: new Date().toISOString()
    });
});

app.get('/api/biodata', (req, res) => {
    res.status(200).json({
    success: true,
    "data": {
    "nama": "Muhammad Fadil Yusril Ihza Mahendra",
    "kelas": "XI RPL 1",
    "cita_cita": "Fullstack Developer",
    "hobi": "Coding & Gaming"
    }
    });
});

// Routes API
const profileRoutes = require('./routes/profileRoutes');
const projectRoutes = require('./routes/projectRoutes');
const skillRoutes = require('./routes/skillRoutes');
const experienceRoutes = require('./routes/experienceRoutes');

app.use('/api/profile', profileRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/experiences', experienceRoutes);

// 6. Middleware untuk menangani route yang tidak ditemukan (404 not found)
app.use((req, res) => {
    res.status(404).json({
        success: false, 
        message: "Endpoint tidak ditemukan!"
    });
});

// 7. Menjalankan server
app.listen(PORT, () => {
    console.log(`==============================`);
    console.log(`🚀 Server Berjalan di: http://localhost:${PORT}`);
    console.log(`🌌 Environment: ${process.env.NODE_ENV || 'delevopment'}`);
    console.log(`=============================`);
})