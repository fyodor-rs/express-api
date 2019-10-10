var mongoose = require('mongoose');

//连接MongoDB数据库
mongoose.connect('mongodb://localhost/blogserver',{useNewUrlParser:true});

const db = mongoose.connection;

db.on('error', () => console.log('mongodb连接失败'));
db.once('open', () => console.log('mongodb连接成功！'));
module.exports = db