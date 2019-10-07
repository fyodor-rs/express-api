let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId
let post = new Schema({
    user: {
        type: ObjectId,
        required:true,
        ref: 'user'
    },
    img: {
        type: String,
        default: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
    },
    title: {
        type: String
    },
    rawContent: {
        type: String
    },
    htmlContent:{
        type: String
    },
    describe: {
        type: String
    },
    likes: {
        type: String
    },
    views: {
        type: String
    },
    label: {
        type: Array
    },
    category: {
        type: String
    },
    createTime: {
        type: Date,
        default:Date.now
    },
    updateTime: {
        type: Date,
    },
})
module.exports = mongoose.model('post', post)