const expressJwt = require("express-jwt");
const constant = require('./constant');
const jwtAuth = expressJwt({
    secret: constant.secretKey
}).unless({
    path: ["/login", '/register','/post/list']
});
module.exports = jwtAuth;