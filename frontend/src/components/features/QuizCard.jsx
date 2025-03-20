import React, { useState, useEffect } from "react";
import questions from "../../data/pages/DataQuestions";
import "../../styles/Features/QuizCard.css";

const QuizCard = () => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submittedAnswers, setSubmittedAnswers] = useState(null);
  const [user, setUser] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    console.log("Stored User:", storedUser);
    console.log("Stored Token:", storedToken);

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleSubmit = async () => {
    if (!user.id) {
      alert("Vui lòng đăng nhập để submit bài test");
      return;
    }

    const allAnswered = questions.every(
      (question) => selectedAnswers[question.quiz_id] !== undefined
    );

    if (!allAnswered) {
      alert("Vui lòng trả lời hết tất cả các câu hỏi");
      return;
    }

    const formattedAnswers = questions.map((question) => ({
      user_id: user.id,
      question_id: question.quiz_id,
      selected_answer: question.answers[selectedAnswers[question.quiz_id]],
    }));

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Phiên đăng nhập đã hết hạn");
        return;
      }

      // Gửi request đến backend để lưu dữ liệu
      const response = await fetch("http://localhost:5000/api/quiz/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ answers: formattedAnswers }),
      });

      if (response.status === 401) {
        alert("Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.");
        return;
      }

      const result = await response.json();
      if (response.ok) {
        setSubmittedAnswers(result.answers);
        alert("Bài test đã được lưu thành công!");

        // Gửi request đến AI service để dự đoán lộ trình
        const aiResponse = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers: formattedAnswers }),
        });

        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();
          console.log("Kết quả dự đoán từ AI service:", aiResult);
          setRoadmap(aiResult.roadmap);
        } else {
          console.error("Lỗi khi gọi AI service:", aiResponse.status);
        }
      } else {
        alert(result.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Lỗi:", error);
      alert("Không thể kết nối đến server");
    }
  };

  return (
    <div>
      <div className="p-6">
        {questions.map((question) => (
          <div
            key={question.quiz_id}
            className="rounded-lg p-5 mt-2.5 shadow-md bg-white"
          >
            <div className="p-2.5 font-medium">
              {question.quiz_id} _ {question.question}
            </div>
            <ul>
              {question.answers.map((answer, index) => (
                <li
                  key={index}
                  onClick={() => handleAnswerSelect(question.quiz_id, index)}
                  className={`cursor-pointer p-2.5 mt-2.5 rounded-md shadow-sm ${
                    selectedAnswers[question.quiz_id] === index
                      ? "bg-blue-100 border-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <span>{String.fromCharCode(65 + index)} . </span>
                  <span>{answer}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="roadmap_submit">
        <button className="btn_submit" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      {submittedAnswers && (
        <div className="answerSubmitted p-6">
          <div className="mt-6 p-6 bg-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">Your submitted Answers:</h2>
            {submittedAnswers.map((answer, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-medium">
                  {answer.question_id}: {questions.find((q) => q.quiz_id === answer.question_id)?.question}
                </p>
                <p>Selected Answer: {answer.selected_answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {roadmap && (
        <div className="roadmapSubmitted p-6">
          <div className="mt-6 p-6 bg-white rounded-lg">
            <h2 className="text-xl font-bold mb-4">Predicted Roadmap:</h2>
            <p>{roadmap}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizCard;
