const express = require('express');
const indexRouter = express.Router();
const BingWallpaper = require('./bingWallpaper');
const jwtAuth = require('../untils/jwtAuth');
//允许跨域
indexRouter.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    console.log('有人来了');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});
//token验证
indexRouter.use(jwtAuth);
indexRouter.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status).send(err.message);
});

//获取壁纸
indexRouter.get('/wallpapper', (req, res, next) => {
    const bw = new BingWallpaper();
    bw.getWallpapersData().then((res) => {
        console.log(bw.handleBingWallPapers(res));
    });
});
//导出路由
const userRouter = require('./user');
const postRouter = require('./post');
const tagRouter = require('./tag');
module.exports = {
    indexRouter,
    userRouter,
    postRouter,
    tagRouter
};