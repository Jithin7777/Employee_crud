require('dotenv').config() 
const express=require('express')

const cors=require('cors')
const route = require('./routes/userRoute');
require('./db/connection')

const projectApp=express()

projectApp.use(cors())

projectApp.use(express.json())

const PORT=5000 || process.env.PORT

projectApp.listen(PORT,()=>{
    console.log(`___Project Server Started At Port Number ${PORT}___`);
})


projectApp.use("/employees",route)