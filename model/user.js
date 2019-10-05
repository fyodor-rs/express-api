let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let User = mongoose.model('user', new Schema({
    prefix: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    nickname: {
        type: String,
        required: true,
        trim: true
    },
    name: {
        type: String,
        trim: true,
        default: 'admin'
    },
    avatar: {
        type: String,
        trim: true,
        default: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
    }
}))
module.exports = User