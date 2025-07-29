import pool from "../config/db.js";

async function getExistingUser(username, email) {
    return await pool.query(
        `SELECT * FROM users WHERE username = $1 OR email = $2`, [username, email]
    )
}

async function registerUser(username, email, hashPassword) {
    return await pool.query(
        `INSERT INTO users(username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username,email, role`,
        [username, email, hashPassword]
    )
}

async function getUserByEmail(email) {
    return await pool.query(`SELECT * FROM users WHERE email = $1`, [email])
}

export default {
    getExistingUser, registerUser, getUserByEmail
}