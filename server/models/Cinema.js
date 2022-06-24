// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  name: { type: String },
  phone: { type: String },
  address: { type: String },
  desc1: { type: String },  //影院特色
  desc2: { type: String },  //体验特色
  demand: { type: String }   //门槛
})

// 调用关联的子分类
schema.virtual('children', {
  localField: '_id',
  ref: 'Hall',
  foreignField: 'cinema',
  justOne: false
})

// 调用关联的子分类
schema.virtual('planMovieList', {
  localField: '_id',
  ref: 'Plan',
  foreignField: 'cinema',
  justOne: false
})

module.exports = mongoose.model('Cinema', schema)