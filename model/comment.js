let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId
let comment = new Schema({
    postId: {
        type: ObjectId,
        ref: 'post'
    },
    content:{
        type: String
    },
    likes:{
        type: Number
    },
    floor:{
        type: Number
    },
    createTime: {
        type: Date
    },
})
module.exports = mongoose.model('comment', comment)