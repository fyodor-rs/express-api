var mongoose = require('mongoose');

//连接MongoDB数据库
mongoose.connect('mongodb://blog:123456@localhost/blogserver',{useNewUrlParser:true, useUnifiedTopology: true});

const db = mongoose.connection;

db.on('error', () => console.log('mongodb连接失败'));
db.once('open', () => console.log('mongodb连接成功！'));
module.exports = db

//安装mongodb后没有权限
//先切换到admin数据库，创建超级管理员，角色为root，然后登陆（db.auth("","")）
//再次创建新的用户和角色，分配权限给指定数据库（blogserver：默认创建），
//在上方代码配置新创建的用户。
//每一个数据库只能有一个管理员。。