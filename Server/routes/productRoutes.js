import express from 'express';
import  authenticate  from '../middleware/authMiddleware.js';
import productSchema from '../validators/productValidator.js'
import pool from '../config/db.js'
const router = express.Router();


router.post('/',authenticate, async(req,res)=>{
    try {
        let user = req.user;
        if(user.role != 'admin'){
            return res.status(401).json({message: 'Unauthorize Access..!!!'})
        }

        const {error} = productSchema.validate(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }

        let {name, description, price, quantity} = req.body;

        let productData = await pool.query(
            `INSERT INTO products (name, description, price, quantity)
            VALUES($1, $2, $3, $4) 
            RETURNING name, description, price, quantity`,
            [name, description, price, quantity]
        )

        res.status(200).json({message: 'Product Added',product:  productData.rows[0]})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal Server Error...!!!!'})
    }
})

router.get('/',authenticate,async(req,res)=>{
    try {
        const productData = await pool.query('SELECT * FROM products')
        if(productData.rowCount <=0){
            return res.status(404).json({message: 'No product added yet'})
        }

        let data = productData.rows

        res.status(200).json({message: 'All Products', data})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal Server Error..!!!'})
    }
})


export default router;

