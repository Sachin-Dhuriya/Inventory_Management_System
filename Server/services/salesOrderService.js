import pool from '../config/db.js'

async function createNewSalesOrder(product_id, quantity) {
    return await pool.query(
        `INSERT INTO salesorder(product_id, quantity)
        VALUES($1, $2)
        RETURNING product_id, quantity, sales_date`,[product_id,quantity]
    )
}

async function getSalesOrder() {
    return await pool.query(
        `SELECT * FROM salesorder`
    )
}

async function getSalesOrderById(id) {
    return await pool.query(
        `SELECT * FROM salesorder WHERE id = $1`,[id]
    )
}

export default{
    createNewSalesOrder, getSalesOrder, getSalesOrderById
}