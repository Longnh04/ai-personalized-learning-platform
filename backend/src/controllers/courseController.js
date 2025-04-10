// src/controllers/courseController.js
const CourseModel = require('../models/courseModel');

const getAllCourses = async (req, res) => {
    try {
        const courses = await CourseModel.getAllCourses();
        res.json(courses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Lỗi khi tải khóa học' });
    }
};

module.exports = {
    getAllCourses,
};