require("dotenv").config() // import installed function
const express =require("express")
const cors= require("cors");
const router = require("./Routes/router");

//create  server
const pfServer= express();

require('./DB/connection')

// use the cors by server
pfServer.use(cors())

//use a middileware to convert json  to js 
pfServer.use(express.json());
pfServer.use(router)

pfServer.use('/uploads',express.static('./uploads'))





const PORT = 4000;

pfServer.listen(PORT,()=>{
    console.log(`server running succesfully at  port :${PORT}`)
})
pfServer.get('/', (req,res)=>{
    res.send("projrct fair server is running succesfully")
})