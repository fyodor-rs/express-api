const express = require('express');
const app = express();
const db = require('./db.js');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
const {
    indexRouter,
    userRouter,
    postRouter
} = require('../router/index');
app.use(indexRouter);
app.use( userRouter);
app.use('/post',postRouter)
app.listen(3333, () => console.log('监听成功！3333'));