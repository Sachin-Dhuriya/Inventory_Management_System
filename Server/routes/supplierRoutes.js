import express from 'express';
const router = express.Router();

import suppliersValidation from '../validators/supplierValidator.js';
import authenticate from '../middleware/authMiddleware.js'
import pool from '../config/db.js'

router.post('/', authenticate, async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({ message: 'Unauthorize Access' })
        }

        let { error } = suppliersValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { name, phone, email, upi } = req.body;
        let supplierData = await pool.query(
            `INSERT INTO suppliers(name, phone, email,upi)
            VALUES($1, $2, $3, $4) RETURNING name, phone, email, upi`, [name, phone, email, upi]
        )

        res.status(201).json({ message: 'Supplier Data Added', data: supplierData.rows[0] })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!!' })
    }
})

router.get('/',authenticate,async(req,res)=>{
    try {
        let suppliersData = await pool.query(
            `SELECT * FROM suppliers`
        )

        if(suppliersData.rowCount === 0){
            return res.status(404).json({message: 'No suppliers data yet..!!!'})
        }

        let data = suppliersData.rows
        
        res.status(200).json({message: 'All Suppliers Data', data})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal Server Error..!!!'})
    }
})

router.get('/:id',authenticate,async(req,res)=>{
    try {
        let id = req.params.id;

        let supplierdata =  await pool.query(
            `SELECT * FROM suppliers WHERE id = $1`, [id]
        )
        if(supplierdata.rowCount === 0){
            return res.status(404).json({message: 'Supplier does not exist..!!!'})
        }

        let data = supplierdata.rows[0];

        res.status(200).json({message: 'Supplier data found',data})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal Server Error..!!!'})
    }
})

export default router;