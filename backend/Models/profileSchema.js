const mongoose = require('mongoose')

const profileSchema= new mongoose.Schema({
    github:{
        type:String,
        require:true    
    },
    linkdin:{
        type:String,
        require:true    
    },
    profileImage:{
        type:String,
        require:true    
    },
    userId:{
        type:String,
        require:true    
    }
    
})
const profile =mongoose.model("profile",profileSchema)


module.exports=profile