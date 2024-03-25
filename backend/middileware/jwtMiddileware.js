const jwt=require('jsonwebtoken')

const jwtmiddileware = (req,res,next) => {
    console.log("inside jwtm del")
    console.log("req headers check",req.headers['authorization'])
    
    const token = req.headers['authorization'].split(' ')[1];
    console.log("token",token)
    try {
        const jwtResponse=jwt.verify(token,'abu$idMp123')
        req.payload=jwtResponse.userid
        next()


        
    } catch (error) {
        res.status(401).json("login request failed due  to")


        
    }
}
module.exports=jwtmiddileware