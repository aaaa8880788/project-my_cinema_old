module.exports = app => {
  // 导入mongoose
  const mongoose = require('mongoose')
  // 连接数据库
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-movie', {
    useNewUrlParser: true,
    // useUnifiedTopology: true
  })

  // 将所有初始化的模型都引用一遍
  // 因为如果在模型里面如果有用到模型关联，比如a模型关联引用b模型，而b模型又没有使用过，就会报错，所以这里把所有的模型都先给引用进来
  // 插件require-all的作用就是引用文件夹中所有的文件
  require('require-all')(__dirname + '/../models')
}