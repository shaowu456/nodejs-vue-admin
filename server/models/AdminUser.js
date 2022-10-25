const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({  
  username: { type: String },
  password: { 
    type: String,
    // 查询的时候 不要被查出来 返回空  select: false,
    select: false,
    // 做一个加密 利用bcrypt
    set(val) {
      // 数字越大越复杂
      return require('bcrypt').hashSync(val, 10)
    }
  }
})

//模型导出
module.exports = mongoose.model('AdminUser', schema)