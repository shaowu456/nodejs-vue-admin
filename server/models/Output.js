// 建立 出库 模型
const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({
  // 商品名称
  name: { type: String },
  // 出库数量
  num: { type: String },
  // 出库总价
  price: { type: String },
  // 出库后剩余库存
  leftCount: { type: Number },
  // 出库时间
  time: { type: Date },
  // 出库来源
  source: { type: String },
  // mongoose.SchemaTypes.ObjectId 表示他是数据库里的ObjectId，特指mdb的；  ref 表示其关联的模型，方便回溯查找
  refGood: { type: mongoose.SchemaTypes.ObjectId, ref: 'Goods' }
})

//模型导出
module.exports = mongoose.model('Outputs', schema)