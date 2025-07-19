//-------------------------------------Express Setup-------------------------------------------------
import express from 'express'
const app = express();
//-------------------------------------.ENV Setup----------------------------------------------------
import dotenv from 'dotenv'
dotenv.config()
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
//-----------------------------------------------------------------------------------------------------------



//--------------API-------------------




app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
})