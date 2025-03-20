const db = require('../config/database');
const bcrypt = require('bcryptjs');

class UserModel {
    static async findByEmail(email) {
        const [rows] = await db.execute(
            'SELECT * FROM Users WHERE email = ?',
            [email]
        );
        return rows[0];
    }

    static async findById(id) {
        const [rows] = await db.execute(
            'SELECT user_id, username, email, role FROM Users WHERE user_id = ?', // Change 'id' to 'user_id'
            [id]
        );
        return rows[0];
    }

    static async create(username, email, password, role = 'student') {
        const hashedPassword = await bcrypt.hash(password, 10);
        const [result] = await db.execute(
            'INSERT INTO Users (username, email, password_hash, role) VALUES (?, ?, ?, ?)',
            [username, email, hashedPassword, role]
        );
        return result.insertId;
    }
}

module.exports = UserModel;