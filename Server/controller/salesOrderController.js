import salesOrderSchema from '../validators/salesOrderValidators.js'
import productService from '../services/productService.js'
import salesOrderService from '../services/salesOrderService.js'

export const viewSalesOrder = async (req, res) => {
    try {
        let data = await salesOrderService.getSalesOrder();
        if (data.rowCount === 0) {
            return res.status(204).json({ message: 'No sales order yet' })
        }

        res.status(200).json({ salesorder: data.rows })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }
}

export const createSalesOrder = async (req, res) => {
    try {
        let { error } = salesOrderSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        let { product_id, quantity } = req.body

        let existingProduct = await productService.viewProductById(product_id);
        if (existingProduct.rowCount === 0) {
            return res.status(404).json({ message: 'Product does not exist' })
        }

        let currentQuantity = existingProduct.rows[0].quantity;
        if (currentQuantity < quantity) {
            return res.status(400).json({ message: 'Insufficient Stock' })
        }

        let finalQuantity = Number(currentQuantity) - Number(quantity)
        await productService.updateProductQuantityById(finalQuantity, product_id)

        let data = await salesOrderService.createNewSalesOrder(product_id, quantity)

        res.status(200).json({ message: 'Sales Order Created', salesOrder: data.rows[0] })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!!' })
    }
}

export const viewOneSalesOrder = async (req, res) => {
    try {
        let id = req.params.id;

        let data = await salesOrderService.getSalesOrderById(id)
        if (data.rowCount === 0) {
            return res.status(404).json({ message: 'Sales Order does not exist..!!!' })
        }

        res.status(200).json(data.rows[0])

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }
}


export const deleteSalesOrder = async (req, res) => {
    let id = req.params.id;
    try {
        let data = await salesOrderService.getSalesOrderById(id)
        if (data.rowCount === 0) {
            return res.status(404).json({ message: 'Sales Order does not exist' })
        }

        let dataProductId = data.rows[0].product_id;
        let dataQuantity = data.rows[0].quantity

        let ogProduct = await productService.viewProductById(dataProductId)
        if (ogProduct.rowCount === 0) {
            return res.status(400).json({ message: 'Product does not exist for this sales order' })
        }

        let ogProductQuantity = ogProduct.rows[0].quantity;

        let finalQuantity = (Number(ogProductQuantity) || 0) + (Number(dataQuantity) || 0)

        await productService.updateProductQuantityById(finalQuantity, dataProductId)

        let deletedSalesOrder = await salesOrderService.deleteSalesOrderById(id)

        res.status(200).json({ message: 'Sales Order Deleted Successfully', data: deletedSalesOrder.rows[0] })
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }
}

export const updateSalesOrder = async (req, res)=>{
    let id = req.params.id;
    try {
        let data = await salesOrderService.getSalesOrderById(id);
        if(data.rowCount === 0){
            return res.status(404).json({message: 'Sales Order does not exist'})
        }

        let dataProductId = data.rows[0].product_id;
        let productQuantity = data.rows[0].quantity;
        
        let productData = await productService.viewProductById(dataProductId);
        if(productData.rowCount === 0){
            return res.status(404).json({message: 'Product for this sales order does not exist'})
        }

        let productDataQuantity = productData.rows[0].quantity
        let totalQuantity = (Number(productDataQuantity) || 0) + (Number(productQuantity) || 0);

        let {error} = salesOrderSchema.validate(req.body);
        if(error){
            return res.status(400).json({message: error.details[0].message})
        }

        let {product_id, quantity} = req.body;

        if(quantity > totalQuantity){
            return res.status(400).json({message: 'Product stock quantity not available'})
        }
        
        let updatedSalesOrder = await salesOrderService.updateSalesOrderById(product_id, quantity, id)

        let finalQuantity = Number(totalQuantity) - (Number(quantity) || 0);
        await productService.updateProductQuantityById(finalQuantity,product_id)

        res.status(200).json({message: 'Sales Order Updated',data: updatedSalesOrder.rows[0]})
        
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Internal Server Error..!!!'})
    }
}