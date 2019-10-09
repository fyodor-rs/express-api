// module.exports = (m, s, d,status) => {
//     return {
//         message: m,
//         success: s,
//         data: d,
//         status:status
//     }
// }

class Success{
    constructor(message,data,status){
      this.success=true
      this.message=message
      this.data=data
      this.status=status
    }
}
class Fail{
    constructor(message,data,status){
      this.success=false
      this.message=message
      this.data=data
      this.status=status
    }
}

module.exports={Success,Fail}