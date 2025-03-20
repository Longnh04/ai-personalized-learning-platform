import mysql.connector
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
import json
import requests

app = Flask(__name__)
app.config['JSON_SORT_KEYS'] = False
CORS(app, resources={r"/predict": {"origins": "*"}})  # Cho phép tất cả các origin truy cập

# Cấu hình kết nối database
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',  # Thay bằng username MySQL của bạn
    'password': 'Long.me2004@qn',  # Thay bằng password MySQL của bạn
    'database': 'bitc_online_lms'
}

# Dữ liệu câu hỏi demo
questions = [
    {
        'quiz_id': 1,
        'question': "When working with computers, you prefer:",
        'answers': [
            "Designing interfaces and working with colors and images",
            "Solving logical problems and algorithms",
            "Analyzing data and finding insights",
            "Optimizing system performance"
        ]
    },
    {
        'quiz_id': 2,
        'question': "Among these tasks, you find most interesting:",
        'answers': [
            "Creating beautiful and user-friendly interfaces",
            "Building system structure and data processing",
            "Working with AI and big data analysis",
            "Managing and deploying systems"
        ]
    },
    {
        'quiz_id': 3,
        'question': "When facing a difficult problem, you usually:",
        'answers': [
            "Try different approaches until finding a solution",
            "Analyze the problem thoroughly before solving",
            "Look for patterns and rules",
            "Optimize step by step"
        ]
    },
    {
        'quiz_id': 4,
        'question': "How do you rate your aesthetic abilities:",
        'answers': [
            "Very good, have an eye for design",
            "Average, focus more on functionality",
            "Prefer analysis over design",
            "Care about both aesthetics and performance"
        ]
    },
    {
        'quiz_id': 5,
        'question': "In a group project, you usually:",
        'answers': [
            "Suggest ideas about interface and user experience",
            "Build system structure and logic",
            "Analyze requirements and propose solutions",
            "Ensure everything runs smoothly"
        ]
    },
    {
        'quiz_id': 6,
        'question': "You feel you're best at:",
        'answers': [
            "Creativity and design",
            "Programming and problem-solving",
            "Analysis and data processing",
            "Optimization and system improvement"
        ]
    },
    {
        'quiz_id': 7,
        'question': "When using a website, the first thing you notice is:",
        'answers': [
            "Interface and user experience",
            "Speed and performance",
            "Features and functionality",
            "System stability"
        ]
    },
    {
        'quiz_id': 8,
        'question': "You want to create products that are:",
        'answers': [
            "Beautiful and easy to use",
            "Fast and stable",
            "Smart and automated",
            "Safe and reliable"
        ]
    },
    {
        'quiz_id': 9,
        'question': "When learning new technology, you prefer:",
        'answers': [
            "Practice and create demos",
            "Deep dive into how it works",
            "Explore possible applications",
            "Optimize performance"
        ]
    },
    {
        'quiz_id': 10,
        'question': "What interests you most about software development:",
        'answers': [
            "Creating visual experiences",
            "Building robust systems",
            "Developing intelligent solutions",
            "Ensuring system reliability"
        ]
    },
    {
        'quiz_id': 11,
        'question': "In a team discussion, you often focus on:",
        'answers': [
            "User interface and design aspects",
            "Technical architecture and implementation",
            "Data flow and processing",
            "System scalability and maintenance"
        ]
    },
    {
        'quiz_id': 12,
        'question': "Your preferred way of solving problems is:",
        'answers': [
            "Visual and interactive approach",
            "Systematic and logical approach",
            "Data-driven approach",
            "Performance-oriented approach"
        ]
    },
    {
        'quiz_id': 13,
        'question': "How much time do you spend learning programming weekly:",
        'answers': [
            "5-10 hours",
            "10-20 hours",
            "20-30 hours",
            "Over 30 hours"
        ]
    },
    {
        'quiz_id': 14,
        'question': "What time of day do you usually study productively?",
        'answers': [
            "In the morning",
            "In the afternoon",
            "In the evening",
            "Late at night"
        ]
    }
]

# Hàm thêm câu hỏi vào database
def add_questions_to_db(connection):
    cursor = connection.cursor()
    for i, question in enumerate(questions):
        cursor.execute("INSERT INTO RoadmapQuestions (question_text, options) VALUES (%s, %s)",
                       (question['question'], json.dumps(question['answers'])))
    connection.commit()
    cursor.close()

# Hàm thêm câu trả lời mẫu vào database
def add_sample_answers_to_db(connection):
    cursor = connection.cursor()
    sample_answers = [
        (1, 1, 'Designing interfaces and working with colors and images'),
        (1, 2, 'Building system structure and data processing'),
        (1, 3, 'Analyze the problem thoroughly before solving'),
        (1, 4, 'Average, focus more on functionality'),
        (1, 5, 'Build system structure and logic'),
        (1, 6, 'Programming and problem-solving'),
        (1, 7, 'Interface and user experience'),
        (1, 8, 'Beautiful and easy to use'),
        (1, 9, 'Deep dive into how it works'),
        (1, 10, 'Building robust systems'),
        (1, 11, 'Technical architecture and implementation'),
        (1, 12, 'Systematic and logical approach'),
        (1, 13, '10-20 hours'),
        (1, 14, 'In the afternoon')
    ]
    for answer in sample_answers:
        cursor.execute("INSERT INTO user_answers (user_id, question_id, selected_answer) VALUES (%s, %s, %s)", answer)
    connection.commit()
    cursor.close()

# Hàm lấy câu trả lời của người dùng
def get_user_answers(connection, user_id):
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT question_id, selected_answer
            FROM user_answers
            WHERE user_id = %s
            ORDER BY question_id ASC
        """, (user_id,))
        results = cursor.fetchall()
        cursor.close()

        if not results:
            print(f"Không tìm thấy câu trả lời cho user_id: {user_id}")
            return None

        return results

    except mysql.connector.Error as err:
        print(f"Lỗi khi lấy câu trả lời của người dùng: {err}")
        return None

# Hàm chuẩn bị dữ liệu cho model
def prepare_features(connection, user_answers, all_question_ids):
    try:
        # Tạo từ điển ánh xạ answer text sang index
        answer_mapping = {}
        for question in questions:
            for i, answer in enumerate(question['answers']):
                answer_mapping[answer] = i

        features = np.zeros(len(all_question_ids))
        for answer in user_answers:
            try:
                question_idx = all_question_ids.index(answer['question_id'])
                answer_text = answer['selected_answer']

                # Tìm index của answer trong mảng answers
                answer_index = answer_mapping[answer_text]

                features[question_idx] = answer_index

            except ValueError:
                print(f"Bỏ qua question_id không hợp lệ: {answer['question_id']}")
                continue

        return features.reshape(1, -1)

    except Exception as err:
        print(f"Lỗi khi chuẩn bị vector đặc trưng: {err}")
        return None

# Hàm huấn luyện model
def train_model(connection):
    try:
        # Lấy dữ liệu huấn luyện
        cursor = connection.cursor(dictionary=True)
        cursor.execute("""
            SELECT ua.user_id, ua.question_id, ua.selected_answer, kr.roadmap_path
            FROM user_answers ua
            JOIN known_roadmaps kr ON ua.user_id = kr.user_id
        """)
        results = cursor.fetchall()
        cursor.close()

        if not results:
            print("Không có dữ liệu huấn luyện")
            return None

        # Chuẩn bị dữ liệu huấn luyện
        X = []
        y = []
        for result in results:
            user_id = result['user_id']
            user_answers = get_user_answers(connection, user_id)
            if user_answers is None:
                continue

            features = prepare_features(connection, user_answers, [q['quiz_id'] for q in questions])
            if features is not None:
                X.append(features[0])
                y.append(result['roadmap_path'])

        # Huấn luyện model
        if len(X) >= 3:  # KNN cần ít nhất 3 điểm dữ liệu
            model = KNeighborsClassifier(n_neighbors=3)
            model.fit(X, y)
            return model
        else:
            print("Không đủ dữ liệu huấn luyện")
            return None

    except Exception as err:
        print(f"Lỗi khi huấn luyện model: {err}")
        return None

# Hàm lưu lộ trình vào database
def save_known_roadmap(connection, user_id, roadmap_path, reason, courses):
    try:
        cursor = connection.cursor()

        # Chuyển đổi danh sách các khóa học thành chuỗi JSON
        courses_json = json.dumps(courses)

        # Kiểm tra nếu lộ trình đã tồn tại
        cursor.execute("SELECT COUNT(*) FROM known_roadmaps WHERE user_id = %s", (user_id,))
        result = cursor.fetchone()

        if result[0] > 0:
            print(f"Lộ trình đã tồn tại cho user_id {user_id}")

            # Cập nhật lộ trình và lý do nếu đã tồn tại
            cursor.execute("UPDATE known_roadmaps SET roadmap_path = %s, reason = %s, courses = %s WHERE user_id = %s",
                           (roadmap_path, reason, courses_json, user_id))
        else:
            # Chèn lộ trình mới
            cursor.execute("INSERT INTO known_roadmaps (user_id, roadmap_path, reason, courses) VALUES (%s, %s, %s, %s)",
                           (user_id, roadmap_path, reason, courses_json))

        connection.commit()
        cursor.close()
        return True
    except mysql.connector.Error as err:
        print(f"Lỗi khi lưu lộ trình: {err}")
        return False

# Hàm gọi API Gemini để tạo lý do
def generate_reason(user_answers, roadmap_path, api_key):
    try:
        # API Endpoint của Gemini
        api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}"

        # Tạo prompt
        prompt = f"""
        Dựa trên các câu trả lời sau từ người dùng: {user_answers},
        hãy giải thích tại sao lộ trình {roadmap_path} phù hợp nhất với họ (xưng hô với người dùng là bạn).
        """

        # Dữ liệu yêu cầu
        data = {
            "contents": [{
                "parts": [{"text": prompt}]
            }]
        }

        # Thiết lập header
        headers = {'Content-type': 'application/json'}

        # Gửi request
        response = requests.post(api_url, data=json.dumps(data), headers=headers)
        response.raise_for_status()  # Raise an exception for HTTP errors

        # Lấy response
        result = response.json()

        # Trả về text từ response
        return result['candidates'][0]['content']['parts'][0]['text']

    except requests.exceptions.RequestException as e:
        print(f"Lỗi khi gọi API Gemini: {e}")
        return "Không thể tạo lý do vì lỗi hệ thống."
    except KeyError as e:
        print(f"Lỗi khi xử lý JSON response: {e}")
        print(f"Response content: {response.content}")
        return "Không thể tạo lý do vì lỗi hệ thống."

# Hàm lấy khóa học phù hợp
def get_relevant_courses(roadmap_path):
    try:
        with open('courses.json', 'r') as f:
            courses = json.load(f)

        relevant_courses = {
            'basic': [],
            'advanced': []
        }

        for course in courses:
            # Chuẩn hóa chuỗi để so sánh
            roadmap_path_lower = roadmap_path.lower()
            field_lower = course['field'].lower()

            if field_lower in roadmap_path_lower:
                level = course['level']
                if level in relevant_courses:
                    relevant_courses[level].append({
                        'id': course['id'],
                        'img': course['img'],
                        'courseName': course['courseName'],
                        'price': course['price'],
                        'author': course['author'],
                        'duration': course['duration']
                    })

        return relevant_courses

    except FileNotFoundError:
        print("Không tìm thấy file courses.json")
        return {"basic": [], "advanced": []}
    except json.JSONDecodeError as e:
        print(f"Lỗi khi đọc file JSON: {e}")
        return {"basic": [], "advanced": []}

# API endpoint để thêm câu hỏi vào database
@app.route('/api/add-questions', methods=['POST'])
def add_questions():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        add_questions_to_db(connection)
        connection.close()
        return jsonify({'message': 'Câu hỏi đã được thêm vào database'}), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

# API endpoint để thêm câu trả lời mẫu vào database
@app.route('/api/add-sample-answers', methods=['POST'])
def add_sample_answers():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)
        add_sample_answers_to_db(connection)
        connection.close()
        return jsonify({'message': 'Câu trả lời mẫu đã được thêm vào database'}), 200
    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500

# API endpoint để dự đoán lộ trình
@app.route('/predict', methods=['POST'])
def predict():
    try:
        connection = mysql.connector.connect(**DB_CONFIG)

        data = request.get_json()
        user_id = data['answers'][0]['user_id']
        api_key = "AIzaSyBobCrHpnO5ndittAP9JOLOAcmaMY8Rc1E"  # Thay bằng API key của bạn

        model = train_model(connection)
        if model is None:
            return jsonify({'error': 'Không thể huấn luyện model'}), 500

        user_answers = get_user_answers(connection, user_id)
        if user_answers is None:
            return jsonify({'error': 'Không tìm thấy câu trả lời'}), 404

        features = prepare_features(connection, user_answers, [q['quiz_id'] for q in questions])
        if features is None:
            return jsonify({'error': 'Không thể chuẩn bị dữ liệu'}), 500

        prediction = model.predict(features.reshape(1, -1))
        roadmap_path = prediction[0]

        # Tạo lý do bằng API Gemini
        reason = generate_reason(user_answers, roadmap_path, api_key)

        # Lấy khóa học phù hợp
        relevant_courses = get_relevant_courses(roadmap_path)

        # Lưu lộ trình vào database
        save_known_roadmap(connection, user_id, roadmap_path, reason, relevant_courses)

        return jsonify({
            'roadmap': roadmap_path,
            'reason': reason,
            'courses': relevant_courses
        }), 200

    except mysql.connector.Error as err:
        return jsonify({'error': str(err)}), 500
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(port=8000)
