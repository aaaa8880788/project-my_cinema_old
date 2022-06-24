// 导入mongoose
const mongoose = require('mongoose')
// 实例化模型
const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },        //用户id
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' },        //电影id
  name: { type: String },      //电影名,方便搜索功能
  userScore: { type: Number },        //用户评分
  userComment: { type: String },    //用户评论
  supportUserId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  //点赞用户id   
  isPass: {
    type: Number,
    default: 0
  },           //管理员是否授权展示
},
  {
    // 设置时间戳
    timestamps: true
  })

module.exports = mongoose.model('Comment', schema)