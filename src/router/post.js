const express = require('express');
const postRouter = express.Router();
const {
    upload,
    myHost
} = require('../untils/fileUtils');
const {
    Post,
    Tag
} = require('../model/schema');
const {
    Success,
    Fail
} = require('../untils/ApiResult');

postRouter.post('/file', upload.array('file', 1), (req, res) => {
    var files = req.files;
    Object.assign(files[0], {
        url: myHost + files[0].filename
    })
    if (!files[0]) {
        res.end(new Fail("上传失败！", null));
    } else {
        res.end(JSON.stringify(new Success("上传成功！", files[0])))
    }
})

postRouter.get('/list', (req, res) => {
    const request=Object.keys(req.query)!=0?Post.find(req.query):Post.find()
    request.populate('tags').populate('user').then(
        success => res.send(new Success("响应成功！", success)),
        error => res.send(new Fail("响应失败！", error))
    )
});
postRouter.get('/list/:text', (req, res) => {
    var search = {}
    if (req.params.text) {
        const query = new RegExp(req.params.text, 'i')
        search = {
            "$or": [{
                    'title': query
                }, {
                    'category': query
                }, {
                    'label': query
                },
                {
                    "user.nickname": query
                }
            ]
        }
    }
    Post.find(search).populate('user').then(
        success => res.send(new Success("响应成功！", success)),
        error => res.send(new Fail("响应失败！", error))
    )
});
postRouter.get('/:id', (req, res) => {
    Post.findById(req.params.id).then(
        success => res.send(new Success("响应成功！", success)),
        error => res.send(new Fail("响应失败！", error))
    )
});
postRouter.post('/add', (req, res) => {
     (async (tags)=> {
         var tagList =[];
        for (let i=0;i<tags.length;i++) {
             const findItem= await Tag.findOne({'name':tags[i]})
             if(!findItem){
              const saveItem=  await new Tag({'name':tags[i]}).save()
              tagList.push(saveItem);
             }else{
              tagList.push(findItem);
             }
             if(i==tags.length-1){
                req.body.tags=tagList
                const saveItem= await new Post(req.body).save()
                return  res.send(new Success("发布成功！", saveItem))
             }
        }

    })(req.body.tags)
});
postRouter.post('/edit', (req, res) => {

});
postRouter.post('/delete', (req, res) => {
    Post.remove(req.body).then(
        success => res.send(new Success("删除成功！", success)),
        error => res.send(new Fail("删除失败！", error))
    );
});
module.exports = postRouter