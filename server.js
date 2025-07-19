//-------------------------------------Express Setup-------------------------------------------------
import express from 'express'
const app = express();
//-------------------------------------.ENV Setup----------------------------------------------------
import dotenv from 'dotenv'
dotenv.config()



app.listen(process.env.PORT,()=>{
    console.log(`App is listening on port ${process.env.PORT}`);
})