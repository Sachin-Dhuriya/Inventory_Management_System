import express from 'express';
import  authenticate  from '../middleware/authMiddleware.js';
import { createProduct, deleteProduct, updateProduct, viewProduct, viewSingleProduct } from '../controller/productController.js';
const router = express.Router();


router.post('/',authenticate, createProduct)

router.get('/',authenticate,viewProduct)

router.get('/:id',authenticate, viewSingleProduct)

router.delete('/:id',authenticate, deleteProduct)

router.put('/:id',authenticate, updateProduct)

export default router;

