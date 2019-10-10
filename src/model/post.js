let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId
let post = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'user'
    },
    img: {
        type: String,
        default: 'https://www.bing.com/th?id=OHR.ClavijoLandscape_ZH-CN1525245124_320x240.jpg&rf=LaDigue_1920x1080.jpg&pid=hp'
    },
    title: {
        type: String
    },
    rawContent: {
        type: String
    },
    htmlContent: {
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
    tags: [{
        type: ObjectId,
        ref: 'tag'
    }],
    category: {
        type: String
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
    },
})
module.exports = mongoose.model('post', post)