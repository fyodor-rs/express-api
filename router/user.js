const express = require('express');
const userRouter = express.Router();
const {
    User
} = require('../model/schema');
const utility = require('utility');
const constant = require('../untils/constant');
const jwt = require('jsonwebtoken');
const ApiResult = require('../untils/ApiResult');


userRouter.get('/currentUser', (req, res) => {
    if (!req.query.nickname) {
        res.error(ApiResult("登录超时!", false, null,401));
    }
    User.findOne({
        nickname: req.query.nickname,
    }).select('nickname phone email avatar').then((data) => {
        res.send(ApiResult("响应成功！", true, data));
    })
})

userRouter.get('/users', (req, res) => {
    User.find().select('nickname phone email avatar').then((data) => {
        res.send(ApiResult("响应成功！", true, data));
    })
})

userRouter.post('/register', (req, res) => {
    const body = req.body;
    body.password = utility.md5(body.password)
    User.find({
            email: body.email
        }).then(data => {
            return new Promise((resolve, reject) => {
                if (data.length) {
                    res.send(ApiResult("邮箱已经注册过了!", false, null))
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
                res.send(ApiResult("昵称已存在！", false, null))
                return
            }
            return User.find({
                phone: body.phone
            })
        })
        .then(data => {
            if (data.length) {
                res.send(ApiResult("手机号已存在！", false, null))
                return
            }
            new User(body).save()
                .then(
                    success => res.send(ApiResult("注册成功！", true, success)),
                    error => res.send(ApiResult("注册失败，请稍后重试！", false, error))
                )
        })
        .catch(error => {
            res.send(ApiResult("未知异常！", false, error))
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
                res.send(Object.assign(new ApiResult('登录成功！', true, data), {
                    token: token,
                }))
            } else {
                res.send(new ApiResult('用户名或密码错误！', false, data))
            }
        },
        error => res.send(new ApiResult('登录失败！', false, error))
    )
})

module.exports = userRouter