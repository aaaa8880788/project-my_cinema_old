// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  name: { type: String },       //电影名
  // 电影id
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },     //影院      
  hall: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },        //影厅
  inDate: { type: String },      //上映日期
  outDate: { type: String },     //放映日期
  outTime: { type: String },     //放映时间
  leaveTime: { type: String },     //散场时间
  sale: { type: String },        //售价
})

// 调用关联的子分类
schema.virtual('orders', {
  localField: '_id',
  ref: 'Order',
  foreignField: 'planId',
  justOne: false
})

module.exports = mongoose.model('Plan', schema)