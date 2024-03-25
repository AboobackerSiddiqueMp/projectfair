const jwt=require('jsonwebtoken')

const appmiddileware=(req,res,next)=>{
    const token= req.headers['authorization']
    console.log(token)
    next()
}
module.exports=appmiddileware