import pool from '../config/db.js'

async function createNewPurchaseOrder(product_id, supplier_id, quantity) {
    return pool.query(
        `INSERT INTO purchaseorder (product_id, supplier_id, quantity)
        VALUES ($1, $2, $3)
        RETURNING id, product_id, supplier_id, quantity, purchase_date`,
        [product_id, supplier_id, quantity]
    )
}

async function getPurchaseOrder() {
    return pool.query(
        `SELECT 
            po.id,
            po.quantity,
            po.purchase_date,
            p.id AS product_id,
            p.name AS product_name,
            s.id AS supplier_id,
            s.name AS supplier_name
         FROM purchaseorder po
         JOIN products p ON po.product_id = p.id
         JOIN suppliers s ON po.supplier_id = s.id
         ORDER BY po.id`
    )
}

async function findPurchaseOrderByID(id) {
    return pool.query(
        `SELECT 
            po.id,
            po.quantity,
            po.purchase_date,
            p.id AS product_id,
            p.name AS product_name,
            s.id AS supplier_id,
            s.name AS supplier_name
        FROM purchaseorder po
        JOIN products p ON po.product_id = p.id
        JOIN suppliers s ON po.supplier_id = s.id
        WHERE po.id = $1`,
        [id]
    )
}

async function deletePurchaseOrderById(id) {
    return await pool.query(
        `DELETE FROM purchaseorder WHERE id = $1 RETURNING product_id, supplier_id, quantity, purchase_date`, [id]
    )
}

async function updatePurchaseOrderById(id, product_id, supplier_id, quantity) {
    return await pool.query(
        `UPDATE purchaseorder
         SET product_id = $1, supplier_id = $2, quantity = $3
        WHERE id = $4
        RETURNING product_id, supplier_id, quantity, purchase_date`, [product_id, supplier_id, quantity, id]
    )
}

export default {
    createNewPurchaseOrder, getPurchaseOrder, findPurchaseOrderByID, deletePurchaseOrderById, updatePurchaseOrderById
}