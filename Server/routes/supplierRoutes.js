import express from 'express';
const router = express.Router();
import authenticate from '../middleware/authMiddleware.js'
import { allSuppliers, createSupplier, deleteSupplier, getOneSupplier, updateSupplier } from '../controller/supplierContoller.js';


router.post('/', authenticate, createSupplier)

router.get('/',authenticate, allSuppliers)

router.get('/:id',authenticate, getOneSupplier)

router.put('/:id',authenticate, updateSupplier)

router.delete('/:id',authenticate, deleteSupplier)

export default router;