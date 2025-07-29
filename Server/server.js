//-------------------------------------Express Setup-------------------------------------------------
import express from 'express'
const app = express();
//-------------------------------------.ENV Setup----------------------------------------------------
import dotenv from 'dotenv'
dotenv.config()
//-------------------------------------Data parsing----------------------------------------------------
import cors from 'cors';
//-------------------------------------Data parsing----------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({extended:true}))

//--------------------------------------DATABASE Connection-------------------------------------------
import pool from './config/db.js'

(async()=>{
    try {   
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected successfully at: ', res.rows[0].now)
        
    } catch (err) {
        console.error('Database Connection Failed...!!!', err)
    }
})();

//--------------------------------------Middlewares-------------------------------------------
app.use(cors());

//--------------------------------------  API-Routes  --------------------------------------------------
//-------------Auth API-------------------
import authRoutes from './routes/authRoutes.js'
app.use('/api/auth', authRoutes)
//-------------Product API-------------------
import productRoutes from './routes/productRoutes.js'
app.use('/api/product',productRoutes)
//-------------Supplier API--------------
import supplierRoutes from './routes/supplierRoutes.js'
app.use('/api/supplier', supplierRoutes)
//------------PurchaseOrder API-----------
import purchaseOrder from './routes/purchaseOrder.js'
app.use('/api/po', purchaseOrder)


app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
})