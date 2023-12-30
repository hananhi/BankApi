import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import {errorHandiling}from './middilewares/errorMiddilewares.js'
import usersRoutes from './Routes/usersRoutes.js';
const app=express();


app.use(cors());

app.use(express.json());
app.use('/users',usersRoutes);
app.use(errorHandiling);



const PORT= process.env.PORT ||5151 ;
app.listen(PORT,()=>{
    console.log('server listening')
})