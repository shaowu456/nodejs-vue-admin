// 建立 目录 模型
const mongoose = require('mongoose')

// 创建模型 构建其属性
const schema = new mongoose.Schema({
  name: { type: String },
  avatar: { type: String },
  phone: { type: String },
  sex: { type: String },
  age: { type: String },
  birthday: { type: String },
  address: { type: String },
  title: { type: String },
  histoyNakedR: { type: String },
  histoyNakedL: { type: String },
  wearGtypeR: { type: String },
  wearGtypeL: { type: String },
  visionR: { type: String },
  visionL: { type: String },
  correctVisionR: { type: String },
  correctVisionL: { type: String },
  eyePressR: { type: String },
  eyePressL: { type: String },
  eyePositionR: { type: String },
  eyePositionL: { type: String },
  threedEyeR: { type: String },
  threedEyeL: { type: String },
  colorFeelR: { type: String },
  colorFeelL: { type: String },
  eyeCheckR: { type: String },
  eyeCheckL: { type: String },
  skills: [{
    iconLists: [
      {
        name: {type: String}, 
        url: {type: String} 
      }
    ],
    icon: { type: String },
    name: { type: String },
    description: { type: String },
    createDate: { type: String },
    delay:{ type: String },
    cost:{ type: String },
    tips: { type: String },
    pcODqj: { type: String },
    pcODzj: { type: String },
    pcODzx: { type: String },
    pcODtj: { type: String },
    pcOSqj: { type: String },
    pcOSzj: { type: String },
    pcOSzx: { type: String },
    obODqj: { type: String },
    obODzj: { type: String },
    obODzx: { type: String },
    obODtj: { type: String },
    obODadd: { type: String },
    obOSqj: { type: String },
    obOSzj: { type: String },
    obOSzx: { type: String },
    obOStj: { type: String },
    obZDYqj: { type: String },
    obZDYzx: { type: String },
    obZDYadd: { type: String }
  }],
  usageTips: { type: String },
  battleTips: { type: String },
  teamTips: { type: String }
})

//模型导出
module.exports = mongoose.model('Customer', schema)