const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({  
  name: { type: String },
  icon: { type: String }
})

//模型导出
module.exports = mongoose.model('Item', schema)