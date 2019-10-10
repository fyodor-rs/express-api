var crypto = require('crypto');
module.exports = {
    MD5_SUFFIX: 'AlanLemon', //固定长度的盐值salt
    md5: function (pwd) {
        var md5 = crypto.createHash('md5');
        return md5.update(pwd).digest('hex');
    },
    secretKey: 'alan_lemon_jwttoken'
};