// 建立 目录 模型
const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({
  name: { type: String },
  nameCode: { type: String },
  // 进价
  originPrice: { type: String },
  // 零售价
  salesPrice: { type: String },
  // 会员价
  MembershipPrice: { type: String },
  // 库存
  count: { type: Number },
  // 来源
  source: { type: String },
  // mongoose.SchemaTypes.ObjectId 表示他是数据库里的ObjectId，特指mdb的；  ref 表示其关联的模型，方便回溯查找
  class: { type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }
})

//模型导出
module.exports = mongoose.model('Goods', schema)