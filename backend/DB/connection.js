//import mongoose
const mongoose=require('mongoose')

//get connection String from .env
const connectionString = process.env.DATABASE;

//connect mongodb
mongoose.connect(connectionString).then((res)=>{
    console.log("mongodb connect succesfully")
}).catch((err)=>{
    console.log(`mongodb fconnection failed due to ${err}`)
})