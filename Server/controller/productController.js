import productSchema from '../validators/productValidator.js'
import pool from '../config/db.js'
import productService from '../services/productService.js'

export const createProduct = async (req, res) => {
    try {
        let user = req.user;
        if (user.role != 'admin') {
            return res.status(401).json({ message: 'Unauthorize Access..!!!' })
        }

        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { name, description, price, quantity } = req.body;

        let productData = await productService.createNewProduct(name, description, price, quantity)

        res.status(201).json({ message: 'Product Added', product: productData.rows[0] })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error...!!!!' })
    }
}

export const viewProduct = async (req, res) => {
    try {
        const productData = await productService.viewAllProducts()
        if (productData.rowCount <= 0) {
            return res.status(404).json({ message: 'No product added yet' })
        }

        let data = productData.rows

        res.status(200).json({ message: 'All Products', data })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }
}

export const viewSingleProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const data = await productService.viewProductById(id)
        if (data.rowCount === 0) {
            return res.status(404).json({ message: 'Product does not exist..!!!' })
        }

        res.status(200).json({ message: 'Product fetched successfully', product: data.rows[0] })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({ message: 'Unauthorize Access..!!!' })
        }

        let data = await productService.deleteProductById(id)

        res.status(200).json({ message: 'Product Deleted', product: data.rows[0] })

    } catch (err) {
        console.error(err)
        res.status(500).json({ message: 'Internal Server Error..!!!!' })
    }
}

export const updateProduct = async (req, res) => {
    let id = req.params.id;
    try {
        if (req.user.role != 'admin') {
            return res.status(401).json({ message: 'Unauthorize Access..!!!' })
        }

        let productData = await productService.viewProductById(id)
        if (productData.rowCount === 0) {
            return res.status(404).json({ message: 'Product does not Exist..!!!' })
        }

        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        let { name, description, price, quantity } = req.body;

        let updateProduct = await productService.updateProductById(name, description, price, quantity, id)

        res.status(200).json({ message: 'Product updated successfully', product: updateProduct.rows[0] })

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error..!!!' })
    }
}