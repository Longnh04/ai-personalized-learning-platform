const e = require('express');
const VideoModel = require('../models/videoModel');

const getVideosByCourseId = async (req, res) => {
    const { courseId } = req.params; // Lấy courseId từ URL
    try {
        const videos = await VideoModel.getVideosByCourseId(courseId);
        res.json(videos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tải danh sách video' });
    }
};
    
module.exports = {
    getVideosByCourseId,
};           