// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  username: { type: String },    //昵称
  name: { type: String },
  password: { type: String },
  avatar: { type: String },
  phone: { type: String },
  sex: { type: String },
  sign: { type: String },
  birthday: { type: String },

})

// 调用关联的子分类
schema.virtual('wishWatchMovie', {
  localField: '_id',
  ref: 'Movie',
  foreignField: 'wishWatch',
  justOne: false
})
// 调用关联的子分类
schema.virtual('commentMovie', {
  localField: '_id',
  ref: 'Comment',
  foreignField: 'userId',
  justOne: false
})


module.exports = mongoose.model('User', schema)