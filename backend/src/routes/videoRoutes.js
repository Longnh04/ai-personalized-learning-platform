const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.get('/videos/:courseId', videoController.getVideosByCourseId);
// Đường dẫn này sẽ được sử dụng để lấy danh sách video theo courseId

module.exports = router;
   