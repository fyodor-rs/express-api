const express = require('express');
const userRouter = express.Router();
const {
    User,
    Post
} = require('../model/schema');
const utility = require('utility');
const constant = require('../untils/constant');
const jwt = require('jsonwebtoken');
const {
    Success,
    Fail
} = require('../untils/ApiResult');


userRouter.get('/currentUser', (req, res) => {
    if (!req.query.nickname) {
        res.error(new Fail("登录超时!", null, 401));
    }
    User.findOne({
        nickname: req.query.nickname,
    }).select('nickname phone email avatar role').then(
        success => res.send(new Success("响应成功！", success)),
        error => res.send(new Fail("响应失败！", error))
    )
})

userRouter.get('/users', (req, res) => {
    User.find().select('nickname phone email avatar role').then(
        success => res.send(new Success("响应成功！", success)),
        error => res.send(new Fail("响应失败！", error))
    )
})

userRouter.get('/users/:text', (req, res) => {
    var search = {}
    if (req.params.text) {
        const query = new RegExp(req.params.text, 'i')
        search = {
            "$or": [{
                    'nickname': query
                }, {
                    'role': query
                }, {
                    'email': query
                },
                {
                    "phone": query
                }
            ]
        }
    }
    User.find(search).populate('user').then(
        success => res.send(new Success("响应成功！", success)),
        error => res.send(new Fail("响应失败！", error))
    )
});
userRouter.post('/register', (req, res) => {
    const body = req.body;
    body.password = utility.md5(body.password)
    User.find({
            email: body.email
        }).then(data => {
            return new Promise((resolve, reject) => {
                if (data.length) {
                    res.send(new Fail("邮箱已经注册过了!", null))
                } else {
                    resolve();
                }
            })
        })
        .then(() => {
            return User.find({
                nickname: body.nickname
            })
        })
        .then((data) => {
            if (data.length) {
                res.send(new Fail("昵称已存在！", null))
                return
            }
            return User.find({
                phone: body.phone
            })
        })
        .then(data => {
            if (data.length) {
                res.send(new Fail("手机号已存在！", null))
                return
            }

            return User.find()
           
        }).then((data,err)=>{
            if(!data.length){
              Object.assign(body,{'role':'admin'});
            }
            new User(body).save()
                .then(
                    success => res.send(new Success("注册成功！", success)),
                    error => res.send(new Fail("注册失败，请稍后重试！", error))
            )
        })
        .catch(error => {
            res.send(new Fail("未知异常！", error))
        })
});

userRouter.post('/login', (req, res) => {
    const body = req.body;
    User.findOne({
        "$or": [{
                email: body.email
            },
            {
                phone: body.phone
            },
            {
                nickname: body.nickname
            }
        ],
        password: utility.md5(body.password)
    }).then(
        data => {
            if (data) {
                var token = jwt.sign(data.toJSON(), constant.secretKey, {
                    expiresIn: 60 * 60 // 授权时效1小时
                })
                res.send(Object.assign(new Success('登录成功！', data), {
                    token: token,
                }))
            } else {
                res.send(new Error('用户名或密码错误！', data))
            }
        },
        error => res.send(new Error('登录失败！', error))
    )
})

userRouter.post('/user/delete', (req, res) => {
    User.findById(req.body._id).then((user,err)=>{
        if(err){
            res.send(new Error('用户不存在！', error))
            return
        }
        return Post.find({user:user._id})
    }).then((posts,err)=>{
        if(err){
            res.send(new Error('操作失败！', error))
            return
        }
        if(posts&&posts.length){
           return Post.remove({_id:{$in:posts.map(post=>{return post._id})}})
        }
        return new Promise((resolve,reject)=>{resolve()})
    }).then((data,err)=>{
        if(err){
           res.send(new Error('操作失败！', error))
           return
        }
        return User.deleteOne(req.body)
    }).then(
        success => res.send(new Success("删除成功！", success)),
        error => res.send(new Fail("删除失败！", error))
    ).catch(error => {
        res.send(new Fail("未知异常！", error))
    })

});

module.exports = userRouter