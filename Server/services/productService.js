import pool from "../config/db.js";

async function createNewProduct(name, description, price, quantity) {
    return await pool.query(
        `INSERT INTO products (name, description, price, quantity)
            VALUES($1, $2, $3, $4) 
            RETURNING name, description, price, quantity`,
        [name, description, price, quantity]
    )
}

async function viewAllProducts() {
    return await pool.query('SELECT * FROM products')
}

async function viewProductById(id) {
    return await pool.query(`SELECT * FROM products WHERE id = $1`, [id])
}

async function deleteProductById(id) {
    return await pool.query(`DELETE FROM products WHERE id = $1 RETURNING name, description, price, quantity`, [id]);
}

async function updateProductById(name, description, price, quantity, id) {
    return await pool.query(
        `UPDATE products
            SET name = $1, description = $2, price = $3, quantity =$4
            WHERE id = $5
            RETURNING name, description, price, quantity`,
        [name, description, price, quantity, id]
    )
}

export default {
    createNewProduct, viewAllProducts, viewProductById, deleteProductById, updateProductById
}