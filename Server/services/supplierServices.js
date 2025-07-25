import pool from '../config/db.js'

async function getSuppliers() {
    return pool.query(
        `SELECT * FROM suppliers`
    )
}

async function createNewSupplier(name, phone, email, upi) {
   return pool.query(
            `INSERT INTO suppliers(name, phone, email,upi)
            VALUES($1, $2, $3, $4) RETURNING name, phone, email, upi`, [name, phone, email, upi]
        )
}

async function getSupplierById(id) {
    return pool.query(
            `SELECT * FROM suppliers WHERE id = $1`, [id]
        )
}

async function updateSupplierById(id, name, phone, email, upi) {
    return pool.query(
            `UPDATE suppliers
            SET name = $1, phone = $2, email = $3, upi = $4
            WHERE id = $5
            RETURNING name, phone, email, upi`,
            [name, phone, email, upi, id]
        )
}

async function deleteSupplierById(id) {
    return pool.query(
            `DELETE FROM suppliers WHERE id = $1 RETURNING name, email, phone`,[id]
        )
}

export default {
    getSuppliers, createNewSupplier, getSupplierById,updateSupplierById, deleteSupplierById
};