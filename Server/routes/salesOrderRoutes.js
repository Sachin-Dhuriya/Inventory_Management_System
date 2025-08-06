import express from 'express';
const router = express.Router()
import {viewSalesOrder, createSalesOrder, viewOneSalesOrder, deleteSalesOrder, updateSalesOrder} from '../controller/salesOrderController.js'
import authenticate from '../middleware/authMiddleware.js'

router.get('/',authenticate, viewSalesOrder)

router.post('/',authenticate, createSalesOrder)

router.get('/:id', authenticate, viewOneSalesOrder)

router.delete('/:id', authenticate, deleteSalesOrder)

router.put('/:id', authenticate, updateSalesOrder)


export default router;
