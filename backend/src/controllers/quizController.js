const QuizModel = require('../models/quizModel');

const quizController = {
    async submitQuiz(req, res) {
        try {
            const { answers } = req.body;
            const userId = req.user.userId; // Lấy từ auth middleware

            // Validate data
            if (!answers || !Array.isArray(answers)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid answer format'
                });
            }

            // Lưu câu trả lời
            await QuizModel.saveUserAnswers(answers);

            res.status(200).json({
                success: true,
                message: 'Quiz answers saved successfully',
                answers: answers
            });
        } catch (error) {
            console.error('Error saving quiz answers:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
};

module.exports = quizController;