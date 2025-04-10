const db = require('../config/database');

class CourseModel {
    static async getAllCourses() {
        const connection = await db.getConnection();
        try {
            const [results] = await connection.execute('SELECT * FROM courses');
            return results;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = CourseModel;


