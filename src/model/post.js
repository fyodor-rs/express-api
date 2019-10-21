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