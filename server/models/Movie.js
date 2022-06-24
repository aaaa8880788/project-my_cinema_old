// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  name: { type: String },         //电影名
  image: { type: String },         //海报
  director: { type: String },     //导演
  performer: { type: String },    //演员
  duration: { type: String },     //片长
  language: { type: String },     //语言
  type: [{ type: String }],         //类型
  vision: { type: String },       //视觉类型（2D、3D）              
  time: { type: String },         //上映时间
  summary: { type: String },      //简介
  wishWatch: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],   //想看用户id
})

// 调用关联的子分类
schema.virtual('comments', {
  localField: '_id',
  ref: 'Comment',
  foreignField: 'movieId',
  justOne: false
})

schema.virtual('plans', {
  localField: '_id',
  ref: 'Plan',
  foreignField: 'movieId',
  justOne: false
})

module.exports = mongoose.model('Movie', schema)