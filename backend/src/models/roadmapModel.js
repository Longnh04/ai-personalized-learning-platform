// models/roadmapModel.js
const pool = require('../config/database');

async function getRoadmapByUserId(userId) {
  try {
    const [rows] = await pool.query(
      'SELECT roadmap_path, reason, courses FROM known_roadmaps WHERE user_id = ?',
      [userId]
    );
    return rows[0] || null; // Trả về roadmap hoặc null nếu không tìm thấy
  } catch (error) {
    console.error('Lỗi khi truy vấn database:', error);
    throw error;
  }
}

module.exports = { getRoadmapByUserId };
