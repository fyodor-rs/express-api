const express = require('express');
const postRouter = express.Router();
const {Post} = require('../model/schema');
const ApiResult = require('../untils/ApiResult');

postRouter.get('/list',(req,res)=>{
    Post.find().populate('user').then(
        success => res.send(ApiResult("响应成功！", true, success)),
        error => res.send(ApiResult("响应失败！", false, error))
    )
});
postRouter.get('/:id',(req,res)=>{
    console.log(req.params.id)
   Post.findById(req.params.id).then(
    success => res.send(ApiResult("响应成功！", true, success)),
    error => res.send(ApiResult("响应失败！", false, error))
   )
});
postRouter.post('/add',(req,res)=>{
    new Post(req.body).save().then(
        success => res.send(ApiResult("发布成功！", true, success)),
        error => res.send(ApiResult("发布失败！", false, error))
    )
});
postRouter.post('/edit',(req,res)=>{
    
});
postRouter.post('/delete',(req,res)=>{
    
});
module.exports=postRouter
