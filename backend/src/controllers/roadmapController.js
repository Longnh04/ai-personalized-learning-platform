// controllers/roadmapController.js
const roadmapModel = require('../models/roadmapModel');

async function getUserRoadmap(req, res) {
  const userId = req.params.userId; // Lấy user_id từ tham số URL

  try {
    const roadmap = await roadmapModel.getRoadmapByUserId(userId);

    if (roadmap) {
      // Kiểm tra xem courses có phải là chuỗi JSON hay không
      if (typeof roadmap.courses === 'string') {
        try {
          roadmap.courses = JSON.parse(roadmap.courses);
        } catch (error) {
          console.error('Lỗi khi parse JSON:', error);
          return res.status(500).json({ message: 'Lỗi server khi parse JSON' });
        }
      }
      res.status(200).json(roadmap);
    } else {
      res.status(404).json({ message: 'Không tìm thấy roadmap cho người dùng này' });
    }
  } catch (error) {
    console.error('Lỗi khi lấy roadmap:', error);
    res.status(500).json({ message: 'Lỗi server' });
  }
}

module.exports = { getUserRoadmap };
