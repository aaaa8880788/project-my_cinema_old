// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  name: { type: String },
  cinema: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },
})

module.exports = mongoose.model('Hall', schema)