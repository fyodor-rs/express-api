let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId
let post = new Schema({
    userId: {
        type: ObjectId,
        ref: 'user'
    },
    comments: {
        type: ObjectId,
        ref: 'comment'
    },
    img:{
        type: String,
        default:''
    },
    title: { 
        type: String
    },
    text: { 
        type: String
    },
    createTime: { 
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
})
module.exports = mongoose.model('post', post)