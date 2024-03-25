const profile = require('../Models/profileSchema')
const project = require('../Models/projectSchema')

exports.addproject = async (req, res) => {
    console.log("inside add projectcontrollar")
    const userId = req.payload
    console.log('abusid', userId)
    const projectImage = req.file.filename;
    console.log(projectImage);
    console.log("==========");
    console.log(req.body)
    const { title, language, github, website, overview } = req.body;
    console.log("title", title)
    console.log("lang", language)

    try {
     
        const existingproject = await project.findOne({ github: github })
        if (existingproject) {
            res.status(406).json("allready exist")


        }
        else {
            const newproject = new project({
                title: title
                , language: language
                , github: github
                , website: website
                , overview: overview
                , projectimage: projectImage
                , userId: userId

            })

            await newproject.save()
            res.status(200).json("registration request recived succesfully")


        }


    } catch (error) {
        return res.status(401).json({ error: "Unable to add project", details: error });


    }

}

exports.getHomeProject = async (req, res) => {
    try {
        const homeProjects = await project.find().limit(3)
        res.status(200).json(homeProjects)


    } catch (error) {
        res.status(401).json("requaste failed due to", error)


    }
}
exports.getAllproject = async (req, res) => {
    const searchKey = req.query.search
    console.log("key==================",searchKey)
    const query={
        language:{
            //regular expressions
            //i =to remove case sensitivity
            $regex:searchKey,$options:'i'
        }

    }
    try {
        const allProjects= await project.find(query)
        res.status(200).json(allProjects)

    } catch (error) {
        res.status(401).json("requaste failed due to", error)


    }
}
exports.getUserProject= async(req,res)=>{
    const userId=req.payload
    try {
        const userProject =await project.find({userId:userId})
        res.status(200).json(userProject)


    } catch (error) {
        res.status(401).json("requaste failed due to", error)

        
    }
}
exports.updateUserProject = async (req, res) => {
    console.log("inside controller");
    const { id } = req.params;
    const userId = req.payload;
    console.log("project id", id);
    console.log("user id", userId);

    const { title, language, github, website, overview, projectimage } = req.body;

    const uploadProjectImage = req.file ? req.file.filename : projectimage;

    try {
        const updateProject = await project.findOneAndUpdate(
            { _id: id },
            {
                title: title,
                language: language,
                github: github,
                website: website,
                overview: overview,
                projectimage: uploadProjectImage,
                userId: userId
            },
            { new: true }
        );

        if (!updateProject) {
            return res.status(404).json({ error: "Project not found" });
        }

        res.status(200).json("Project updated successfully");
    } catch (error) {
        return res.status(500).json({ error: "Unable to update project", details: error });
    }
};

exports.deleteUserProject = async(req,res) =>{
    console.log("inside add projectcontrollar")

    const {id} = req.params
    console.log("project id ========",id)

    
    try {
        const removeProject= await project.findByIdAndDelete({_id:id})
        res.status(200).json("project delete successfully")


    } catch (error) {
        res.status(401).json("requaste failed due to", error)


        
    }
}

exports.addProfile =async(req,res)=>{
    console.log("inside project constroller profile")
    const userId=req.payload
    const profileImage = req.file.filename;
    const{github,linkdin}=req.body
    console.log("gh======",github)
    const existingprofile = await profile.findOne({ userId:userId})
    if (existingprofile) {
        res.status(406).json("allready exist")


    }
    else{
        const newprofile = new profile({
            github:github
            , linkdin:linkdin
            , profileImage:profileImage
            , userId: userId

        })
        await newprofile.save()
        res.status(200).json(" succesfully add profile")


    }


}
exports.getUserProfile= async(req,res)=>{
    const userId=req.payload
    try {
        const userProfile =await profile.find({userId:userId})
        res.status(200).json(userProfile)


    } catch (error) {
        res.status(401).json("requaste failed due to", error)

        
    }
}
