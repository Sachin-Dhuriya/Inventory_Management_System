import suppliersValidation from '../validators/supplierValidator.js';
import pool from '../config/db.js'
import supplierServices from '../services/supplierServices.js';

export const allSuppliers = async(req,res)=>{
    try {
        let suppliersData = await supplierServices.getSuppliers()

        if(suppliersData.rowCount === 0){
            return res.status(404).json({message: 'No suppliers data yet..!!!'})
        }

        let data = suppliersData.rows
        
        res.status(200).json({message: 'All Suppliers Data', data})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal Server Error..!!!'})
    }
}

export const createSupplier = async (req, res) => {
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({ message: 'Unauthorize Access' })
        }

        let { error } = suppliersValidation.validate(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { name, phone, email, upi } = req.body;
        let supplierData = await supplierServices.createNewSupplier(name,phone, email, upi)

        res.status(201).json({ message: 'Supplier Data Added', data: supplierData.rows[0] })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!!' })
    }
}

export const getOneSupplier = async(req,res)=>{
    try {
        let id = req.params.id;

        let supplierdata =  await supplierServices.getSupplierById(id)
        if(supplierdata.rowCount === 0){
            return res.status(404).json({message: 'Supplier does not exist..!!!'})
        }

        let data = supplierdata.rows[0];

        res.status(200).json({message: 'Supplier data found',data})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal Server Error..!!!'})
    }
}

export const updateSupplier = async(req,res)=>{
    try {
        if(req.user.role !== 'admin'){
            return res.status(401).json({message: 'Unauthorize access'})
        } 

        let id = req.params.id
        let supplierData = await supplierServices.getSupplierById(id)
        if(supplierData.rowCount === 0){
            return res.status(404).json({message: 'Supplier does not exist..!!'})
        }

        let {error} = suppliersValidation.validate(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }

        let {name, phone, email, upi} = req.body;
        
        let updatedSupplier = await supplierServices.updateSupplierById(id, name, phone, email, upi)

        res.status(200).json({message: 'Supplier Data Updated', data: updatedSupplier.rows[0]})
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error..!!!'})
    }
}

export const deleteSupplier = async(req,res)=>{
    try {
        if(req.user.role !== 'admin'){
            return res.status(401).json({message: 'Unauthorize Access'})
        }

        let id = req.params.id; 
        const existingSupplier = await supplierServices.getSupplierById(id)
        if(existingSupplier.rowCount === 0){
            return res.status(404).json({message: 'Supplier does not exist..!!!'})
        }

        let deleteSupplier = await supplierServices.deleteSupplierById(id)

        res.status(200).json({message: 'Supplier Deleted Successfully', data: deleteSupplier.rows[0]})
        
    } catch (err) {
        console.error(err)
        res.status(500).json({message: 'Internal Server Error..!!!!'})
    }
}