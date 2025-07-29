import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import { signupSchema, loginSchema } from '../validators/authValidators.js';
import authService from '../services/authService.js';


export const userRegister = async (req, res) => {
    try {
        const { error } = signupSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { username, email, password } = req.body;

        const existingUser = await authService.getExistingUser(username, email)
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ message: "Username or Email already exist..!!!" })
        }

        let hashPassword = await bcrypt.hash(password, 10)

        const result = await authService.registerUser(username, email, hashPassword);
        res.status(200).json({
            message: "User Register Successfully!!!",
            user: result.rows[0]
        })


    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal Server Error..!!!" })
    }
}

export const userLogin = async (req, res) => {
    try {
        const { error } = loginSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { email, password } = req.body;

        let data = await authService.getUserByEmail(email)

        if (data.rows.length <= 0) {
            return res.status(400).json({ message: "Email does not exist..!!!!" })
        }

        const user = data.rows[0]

        let hashPass = user.password;

        const isMatch = await bcrypt.compare(password, hashPass)

        if (!isMatch) {
            return res.status(400).json({ message: "Password does not match..!!!" })
        }

        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '12h' }
        )

        res.status(200).json({ message: "User LoggedIn successfully..!!!", token })


    } catch (err) {
        console.error(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

