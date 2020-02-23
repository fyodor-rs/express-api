const express = require('express');
const tagRouter = express.Router();
const {
    Tag
} = require('../model/schema');
const {
    Success,
    Fail
} = require('../utils/ApiResult');

tagRouter.get('/list', (req, res) => {
    Tag.find().then(
        success => res.send(new Success("查询成功！", success)),
        error => res.send(new Fail("查询失败！", error))
    )
});

module.exports= tagRouter