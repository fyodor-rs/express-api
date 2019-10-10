let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let tag = new Schema({
    name: {
        type: String
    },
    createTime: {
        type: Date,
        default:Date.now
    },
})
module.exports = mongoose.model('tag', tag)