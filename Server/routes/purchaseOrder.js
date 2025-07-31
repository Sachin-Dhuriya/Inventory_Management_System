import express from 'express';
const router = express.Router();
import authenticate from '../middleware/authMiddleware.js'
import {createPurchaseOrder, deletePurchaseOrder, updatePurchaseOrder, ViewAllPurchaseOrder, viewPurchaseOrder} from '../controller/purchaseOrderController.js'

router.get('/',authenticate, ViewAllPurchaseOrder)

router.post('/',authenticate, createPurchaseOrder)

router.get('/:id',authenticate, viewPurchaseOrder)

router.delete('/:id',authenticate, deletePurchaseOrder)

router.put('/:id',authenticate, updatePurchaseOrder)

export default router;