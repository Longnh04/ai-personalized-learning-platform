// src/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const pool = require('./config/database'); // Đảm bảo database.js đã đúng

const app = express();

// Import routes
const authRoutes = require('./routes/authRoutes');
const quizRoutes = require('./routes/quizRoutes'); 
const roadmapRoutes = require('./routes/roadmapRoutes'); 
const courseRoutes = require('./routes/courseRoutes');
const videoRoutes = require('./routes/videoRoutes');
// Middleware
app.use(cors());
app.use(express.json()); // Middleware xử lý JSON


// Kiểm tra kết nối database trước khi chạy server
pool.getConnection((err, connection) => {
    if (err) {
        console.error("Lỗi kết nối database:", err);
        process.exit(1); // Dừng server nếu database không kết nối được
    } else {
        console.log("Database connected!");
        connection.release();
    }
});   

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api', roadmapRoutes);
app.use('/api', courseRoutes);
app.use('/api', videoRoutes);


// Middleware xử lý lỗi chung
app.use((err, req, res, next) => {
    console.error("Lỗi server:", err.stack);
    res.status(500).json({ message: 'Lỗi server! Vui lòng thử lại sau.' });
});

// Đảm bảo sử dụng PORT từ .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
