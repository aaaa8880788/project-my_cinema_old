// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  name: { type: String },     //电影名
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },
  adImage: { type: String },  //电影宣传图片
})

module.exports = mongoose.model('Advertise', schema)