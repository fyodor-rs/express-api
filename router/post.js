const express = require('express');
const postRouter = express.Router();
const {
    Post
} = require('../model/schema');
const {Success,Fail} = require('../untils/ApiResult');

postRouter.get('/list', (req, res) => {
    Post.find().populate('user').then(
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
    new Post(req.body).save().then(
        success => res.send(new Success("发布成功！", success)),
        error => res.send(new Fail("发布失败！", error))
    )
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