const exp=require('express')
const authorApp=exp.Router();
const articleModel=require('../Models/articleModel')
const expressAsyncHandler=require('express-async-handler')
const createUserOrAuthor=require('./createUserOrAuthor')
const { requireAuth, clerkMiddleware } = require("@clerk/express")
require('dotenv').config()
authorApp.get('/',(req,res)=>{
    res.send("author Api")
})
// create author
authorApp.post('/author',expressAsyncHandler(createUserOrAuthor));
//author posts articles
authorApp.post("/article",expressAsyncHandler(async(req,res)=>{
    const newArticleObj=req.body;
    const newArticle=new articleModel(newArticleObj)
    const articleObj=await newArticle.save();
    res.status(201).send({message:"Article created",payload:articleObj})

}))

//get Api read all articles by author
authorApp.get('/articles',requireAuth({signInUrl:"unauthorised"}),expressAsyncHandler(async(req,res)=>{
    const listofArticles=await articleModel.find({isArticleActive:true})
    res.status(200).send({message:"Articles",payload:listofArticles})
}))
authorApp.get('/Unauthorized',(req,res)=>{
    res.send("Unauthorised request")
})
//to update an article
authorApp.put('/article/:articleId',expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body;
    const articleId = req.params.articleId;
    const originalObj=await articleModel.findByIdAndUpdate(modifiedArticle._id,{... modifiedArticle},{returnOriginal:false})
    res.status(200).send({message:"article modified",payload:originalObj})
}))

//to soft delete we need to use put and isactive is false we need to make
//but we need to delete it ny using dlete cmnd because in future we may use that data
authorApp.put('/articles/:articleId',expressAsyncHandler(async(req,res)=>{
    const modifiedArticle=req.body;
    const articleId = req.params.articleId;
    const originalObj=await articleModel.findByIdAndUpdate(modifiedArticle._id,{... modifiedArticle},{returnOriginal:false})
    res.send({message:"Article deleted",payload:originalObj})
}))




module.exports=authorApp;