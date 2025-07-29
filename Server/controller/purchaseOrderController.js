import purchaseOrderSchema from '../validators/purchaseOrderValidators.js'
import purchaseOrderService from '../services/purchaseOrderService.js';

export const createPurchaseOrder = async (req, res) => {
    try {
        console.log(req.body);
        let { error } = purchaseOrderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { product_id, supplier_id, quantity } = req.body;

        let data = await purchaseOrderService.createNewPurchaseOrder(product_id, supplier_id, quantity)

        res.status(200).json({ message: 'Purchase Order Created', data: data.rows[0] })
    } catch (err) {
        console.error(err);

        if (err.code === '23503') {
            return res.status(400).json({
                message: 'Invalid product_id or supplier_id. Make sure the product and supplier exist.'
            });
        }

        res.status(500).json({ message: 'Internal Server Error..!!!!' })
    }
}

export const ViewAllPurchaseOrder = async (req, res) => {
    try {
        let data = await purchaseOrderService.getPurchaseOrder();
        if(data.rowCount === 0){
            return res.status(404).json({message: 'No Purchase Order Yet..!!!'})
        }
        res.status(200).json({message: 'All Purchase Order', data: data.rows})

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }
}

export const viewPurchaseOrder = async (req, res) => {
        let id = req.params.id;
    try {
        let data = await purchaseOrderService.findPurchaseOrderByID(id);
        if(data.rowCount === 0){
            return res.status(404).json({message: 'Purchase Order does not exist..!!!'})
        }

        res.status(200).json({message: 'Purchase Order', data: data.rows[0]})
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!!' })
    }
}

