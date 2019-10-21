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
const posts = require('../untils/defaultPosts');

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
    const request = Object.keys(req.query) != 0 ? Post.find(req.query) : Post.find()
    request.populate('tags').populate('user').then(
        success => {
            return res.send(new Success("响应成功！", success.length?success:posts))
        },
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
    Post.find(search).populate('user').populate('tags').then(
        success => {
            return res.send(new Success("响应成功！", success.length?success:posts))
        },
        error => res.send(new Fail("响应失败！", error))
    )
});
postRouter.get('/:id', (req, res) => {
    Post.findById(req.params.id).populate({
        path: 'tags',
        select: 'name',
        select: 'name -_id'
    }).select('img title rawContent htmlContent describe likes views tags category ').then(
        success => res.send(new Success("响应成功！", success)),
        error => res.send(new Fail("响应失败！", error))
    )
});
postRouter.post('/add', (req, res) => {
    const handleData = async (tags) => {
        var tagList = [];
        for (let i = 0; i < tags.length; i++) {
            const findItem = await Tag.findOne({
                name: tags[i]
            })
            if (!findItem) {
                const saveItem = await new Tag({
                    name: tags[i]
                }).save()
                tagList.push(saveItem);
            } else {
                tagList.push(findItem);
            }
            if (i == tags.length - 1) {
                req.body.tags = tagList
                return await new Post(req.body).save()
            }
        }
    }
    handleData(req.body.tags).then(
        success => res.send(new Success("发布成功！", success)),
        error => res.send(new Fail("发布失败！", error))
    )
});
postRouter.post('/edit', (req, res) => {
    const {
        _id,
        tags,
        ...body
    } = req.body
    const handleData = async (tags) => {
        var tagList = [];
        for (let i = 0; i < tags.length; i++) {
            const findItem = await Tag.findOne({
                name: tags[i]
            })
            if (!findItem) {
                const saveItem = await new Tag({
                    name: tags[i]
                }).save()
                tagList.push(saveItem);
            } else {
                tagList.push(findItem);
            }
            if (i == tags.length - 1) {
                body.tags = tagList
                return await Post.findByIdAndUpdate(_id,
                    body, {
                        "new": true,
                        'fields': 'img title rawContent htmlContent describe likes views tags category '
                    }
                ).populate('tags')
            }
        }
    }
    handleData(tags).then(
        success => res.send(new Success("更新成功！", success)),
        error => res.send(new Fail("更新失败！", error))
    )
});
postRouter.post('/delete', (req, res) => {
    Post.remove(req.body).then(
        success => res.send(new Success("删除成功！", success)),
        error => res.send(new Fail("删除失败！", error))
    );
});
module.exports = postRouter