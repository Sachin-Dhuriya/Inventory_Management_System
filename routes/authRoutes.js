import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import jwt from 'jsonwebtoken'

import {userRegister, userLogin} from '../controller/authController.js'

router.post('/register', userRegister )
router.post('/login', userLogin )


export default router;
