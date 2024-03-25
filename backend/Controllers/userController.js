const users = require('../Models/userSchema')
var jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    console.log("inside user controller:reister function")
    const { username, email, password } = req.body;
    try {
        const existinguser = await users.findOne({ email: email })
        console.log("huhjhjhh")
        if (existinguser) {
            res.status(406).json("account allready exist")

        }
        else {
            const newUser = new users({ 

                username: username,
                email: email,
                password: password,
                github: "",
                linkdin: "",
                profile: ""
            })
            await newUser.save()
            res.status(200).json("registration request recjived succesfully")

        }


    } catch (error) {
        res.status(401).json("register request failed due  to", error)

    }
}
exports.login= async(req,res)=>{
    console.log("inside login controll")
    const{email,password}=req.body
    console.log(email)
    try {
        const existinguser=await users.findOne({email:email,password:password})
        if(existinguser){
            const token = jwt.sign({userid:existinguser._id},'abu$idMp123')
            console.log(token)
            console.log('success')
            res.status(200).json({existinguser,token})
            
        }
        else{
            res.status(401).json("login request failed due  to")

        }
       

    } catch (error) {
        res.status(401).json("login request failed due  to", error)

        
    }
}