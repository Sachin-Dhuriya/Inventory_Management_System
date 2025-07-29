import express from 'express';
const router = express.Router();
import authenticate from '../middleware/authMiddleware.js'
import {createPurchaseOrder, ViewAllPurchaseOrder, viewPurchaseOrder} from '../controller/purchaseOrderController.js'

router.get('/',authenticate, ViewAllPurchaseOrder)

router.post('/',authenticate, createPurchaseOrder)

router.get('/:id',authenticate, viewPurchaseOrder)

export default router;