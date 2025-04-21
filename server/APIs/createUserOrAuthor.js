const userAuthorModel=require('../Models/UserAuthor');

async function  createUserOrAuthor(req,res){
    let newUser=req.body;
    const existUser=await userAuthorModel.findOne({email:newUser.email})
    if(existUser!=null){
        if(existUser.role===newUser.role){
            res.status(200).send({message:newUser.role,payload:existUser})
        }
        else{
            res.status(200).send({message:"Invalid role"})
        }
    }
    else{
        const newUserAuthor=new userAuthorModel(newUser)
        const userAuthorinDB=await newUserAuthor.save();
        res.status(201).send({message:"User created",payload:userAuthorinDB})
    }

}
module.exports=createUserOrAuthor;