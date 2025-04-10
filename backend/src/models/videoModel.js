const db = require('../config/database');

class VideoModel {
    static async getVideosByCourseId(courseId) {
        const connection = await db.getConnection();
        try {
            const [results] = await connection.execute(
                'SELECT * FROM course_videos WHERE courseId = ? ORDER BY videoOrder ASC',
                [courseId]
            );
            return results;
        } catch (error) {
            throw error;
        } finally {
            connection.release();
        }
    }
}

module.exports = VideoModel;
               