const multer = require('multer');
const path = require('path');
// 设置图片存储路径
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname, '../../public'));
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})
// 添加配置文件到muler对象。
var upload = multer({
    storage: storage
});
/**
 * 获取服务器地址
 */
const os = require('os')
function getIPAdress(){
	//os.networkInterfaces()方法返回被赋予网络地址的网络接口
	const interfaces = os.networkInterfaces()
	/*
		address: 被赋予的IPv4 or IPv6
		netmask: IPv4 or IPv6 子网掩码
		family: IPv4 or IPv6
		mac: 网络接口的MAC地址
		internal: 如果网络接口是loopback
				  或相似的远程不能用的接口时 值true 否则值为false
		scopeid: IPv6数字领域识别码（family为IPv6才可用）
		cidr: 以CIDR表示法分配的带有路由前缀的IPv4或IPv6地址，
			  如果netmask参数不可用 该属性为null
	*/
	for(let devName in interfaces){
		let iface = interfaces[devName]
		for(let i = 0; i < iface.length; i++){
			let alias = iface[i]
			if(alias.family === 'IPv4' && 
			   alias.address !== '127.0.0.1' &&
			   !alias.internal){
			   		return alias.address
			   }else{
                   return 'http://127.0.0.1:3333/'
               }
		}
	}
}
const myHost = getIPAdress() 


module.exports={upload,myHost}