import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import pool from '../config/db.js';

router.post('/register',async(req,res)=>{
    try {
        let {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({message:"All Fields are required..!!!!"})
        }

        const existingUser = await pool.query(
            `SELECT * FROM users WHERE username = $1 OR email = $2`,[username,email]
        )
        
        if(existingUser.rows.length > 0){
            return res.status(400).json({message: "Username or Email already exist..!!!"})
        }

        let hashPassword = await bcrypt.hash(password,10)

        const result = await pool.query(
            `INSERT INTO users(username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username,email, role`,
            [username,email,hashPassword] 
        );
        res.status(200).json({
            message: "User Register Successfully!!!",
            user: result.rows[0]
        })

        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: "Internal Server Error..!!!"})
    }
})


export default router;
