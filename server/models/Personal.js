const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({  
  name: { type: String },
  icon: { type: String },
  iconLists: [
    {
      name: {type: String}, 
      url: {type: String} 
    }
  ],
  fakeIconLists: [
    {
      name: {type: String}, 
      url: {type: String} 
    }
  ],
  remark: { type: String },
  // 出库时间
  time: { type: Date },
  // 来源
  source: { type: String },
})

//模型导出
module.exports = mongoose.model('Personal', schema)