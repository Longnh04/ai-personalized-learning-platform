const db = require('../config/database');

class QuizModel {
    static async saveUserAnswers(answers) {
        const connection = await db.getConnection();
        try {
            await connection.beginTransaction();

            for (const answer of answers) {
                await connection.execute(
                    'INSERT INTO user_answers (user_id, question_id, selected_answer) VALUES (?, ?, ?)',
                    [answer.user_id, answer.question_id, answer.selected_answer]
                );
            }

            await connection.commit();
            return true;
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
    }
 
}

module.exports = QuizModel;