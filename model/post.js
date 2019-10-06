let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId
let post = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    commentId: {
        type: ObjectId,
        ref: 'comment'
    },
    img: {
        type: String,
        default: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    desc: {
        type: String
    },
    likes: {
        type: String
    },
    views: {
        type: String
    },
    label: {
        type: String
    },
    category: {
        type: String
    },
    createTime: {
        type: Date
    },
    updateTime: {
        type: Date
    },
})
module.exports = mongoose.model('post', post)