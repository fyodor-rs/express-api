let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId
let reply = new Schema({
    commentId: {
        type: ObjectId,
        ref: 'comment'
    },
    from_id:{
        type:ObjectId,
        ref:'user'
    },
    to_id:{
        type:ObjectId,
        ref:'user'
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
module.exports = mongoose.model('reply', reply)