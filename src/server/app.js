const express = require('express');
const app = express();
const db = require('./db.js');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
app.use(bodyParser.urlencoded({
    limit: '50000kb',
    extended: false
}));
app.use(bodyParser.json({limit: '50000kb'}));
app.use(express.static('public'))
const {
    indexRouter,
    userRouter,
    postRouter,
    tagRouter
} = require('../router/index');
app.use(indexRouter);
app.use( userRouter);
app.use('/post',postRouter)
app.use('/tag',tagRouter)
app.listen(3333, () => console.log('监听成功！3333'));