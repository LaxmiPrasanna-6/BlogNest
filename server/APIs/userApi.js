const exp=require('express')
const userApp=exp.Router();
const UserAuthorModel=require('../Models/UserAuthor');
const expressAsyncHandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const article=require('../Models/articleModel')
userApp.get('/user',async(req,res)=>{
    let users=await UserAuthorModel.find();
    res.send({message:"All Users",payload:users});
})


//create new user
userApp.post('/user',expressAsyncHandler(createUserOrAuthor));

//add comment
userApp.put('/comment/:articleId',expressAsyncHandler(async(req,res)=>{
  const commentObj=req.body;
  const articeWithComments=await article.findOneAndUpdate({articleId:req.params.articleId}
    ,{$push:{comments:commentObj}},{new:true})
  res.send({message:"Comments added",payload:articeWithComments})
  
}))












module.exports=userApp;