// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  name: { type: String },         //影院名，方便搜索
  orderNum: { type: Number },  //订单编号
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },   //电影id
  planId: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' },   //排片id
  cinemaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' },   //影院id
  hallId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hall' },   //影厅id
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },    //用户id
  seatInfo: [{ type: Array }],     //座位信息
  payType: { type: Number },       //支付类型   1为微信   2为支付宝  3为云闪付
  ticketNum: { type: Number },     //购票数量
  totalPrice: { type: Number },     //购票总价格
  ticketPrice: { type: Number },     //购票单价格
  ticketCode: { type: Number },     //取票码
  orderDate: { type: String },     //场次日期
  orderTime: { type: String },     //场次时间
  payStatus: { type: Number, default: 0 },     //订单支付状态（ 0为未支付，1为已支付）
})

module.exports = mongoose.model('Order', schema)