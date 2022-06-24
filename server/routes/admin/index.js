module.exports = (app) => {
  // 导入express模块
  const express = require("express");
  // 实例路由对象
  const router = express.Router();

  // 导入处理路径的核心模块
  const path = require("path");

  // 引入管理员模型
  const Administrator = require("../../models/Administrator");

  // 导入解析 formadata 格式表单数据的包
  const multer = require("multer");

  // 导入密码处理模块(加密)
  const bcrypt = require("bcryptjs");

  // 用这个包来生成 Token 字符串
  const jwt = require("jsonwebtoken");

  // 导入jwtSecretKey,用来加密token
  const { jwtSecretKey } = require("../../jwtSecretKey");

  // 用这个报来解析Token
  const expressJWT = require("express-jwt");

  // 这里除了注册、登录、不用解析token,其他要token
  // 该处的接口解析token不运用于其他接口，如/web/api/
  app.use(
    expressJWT({
      secret: jwtSecretKey,
      algorithms: ["HS256"],
    }).unless({
      path: ["/admin/api/login", "/admin/api/register", /^\/web\/api/],
    })
  );

  // 定义路由规则,这里是通用接口部分,curd
  // 1.添加用户
  router.post("/", async (req, res) => {
    const data = req.body;
    // 如果是添加用户接口
    if (req.Model.modelName === "User") {
      // 查看用户是否上传头像,如果没有,用默认头像
      if (!data.avatar) {
        data.avatar = "http://localhost:3500/uploads/avatar/duck.jpg";
      }
      // 查看用户名是否唯一
      const UserName = await req.Model.findOne({ name: data.name });
      if (UserName) {
        return res.send({
          message: "用户名已存在，请重新输入用户名",
        });
      }
      // 查看手机号是否唯一
      const UserPhone = await req.Model.findOne({ phone: data.phone });
      if (UserPhone) {
        return res.send({
          message: "手机号已存在，请重新输入手机号",
        });
      }
    }
    const model = await req.Model.create(req.body);
    res.send({
      message: "操作成功",
      status: "Ok",
    });
  });

  // 2.查看用户列表
  router.get("/", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Hall") {
      queryOptions.populate = "cinema";
    }
    if (req.Model.modelName === "Cinema") {
      queryOptions.populate = "children";
    }
    if (req.Model.modelName === "Plan") {
      // 这里这样调出来的是hall表，然后hall表里面的cinema
      // queryOptions.populate = {
      //   path: 'hall',
      //   populate: "cinema"
      // }
      queryOptions.populate = [
        {
          path: "hall",
        },
        {
          path: "cinema",
        },
        {
          path: "movieId",
        },
      ];
    }
    if (req.Model.modelName == "Comment") {
      queryOptions.populate = [{ path: "movieId" }, { path: "userId" }];
    }
    if (req.Model.modelName === "Advertise") {
      queryOptions.populate = "movieId";
    }
    if (req.Model.modelName == "Order") {
      queryOptions.populate = [{ path: "movieId" }, { path: "userId" }];
    }
    // 接受参数：
    // 1.页面包含数据总数
    // 2.当前页面数
    const { pageSize, currentPage } = req.query;
    // 查询所有数据
    let allData = await req.Model.find().setOptions(queryOptions).lean();
    allData = allData.reverse();
    // 总页面数
    const total = allData.length;
    // 如果没传参数
    if (!pageSize && !currentPage) {
      return res.send({
        allData,
        total,
        status: "Ok",
      });
    }
    if (!pageSize || !currentPage) {
      return res.send({
        message: "pageSize和currentPage要么都填要么都不填",
      });
    }
    // 根据要求截取数据
    const data = allData.slice(
      pageSize * (currentPage - 1),
      pageSize * currentPage
    );
    res.send({
      data,
      total,
      status: "Ok",
    });
  });

  // 3.根据id删除详情
  router.delete("/:id", async (req, res) => {
    const data = await req.Model.findByIdAndDelete(req.params.id);
    // console.log(data);
    if (!data) {
      res.send({
        message: "数据不存在,无法删除!",
      });
    } else {
      res.send({
        message: "删除成功！",
        status: "Ok",
      });
    }
  });

  // 4.根据id更新详情
  router.put("/:id", async (req, res) => {
    const data = await req.Model.findByIdAndUpdate(req.params.id, req.body);
    // console.log(data);
    res.send({
      message: "更新成功！",
      status: "Ok",
    });
  });

  // 这个是为了搜索功能
  // 5.根据name获取数据
  router.get("/:name", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Hall") {
      queryOptions.populate = "cinema";
    }
    if (req.Model.modelName === "Cinema") {
      queryOptions.populate = "children";
    }
    if (req.Model.modelName === "Plan") {
      queryOptions.populate = [
        {
          path: "hall",
        },
        {
          path: "cinema",
        },
        {
          path: "movieId",
        },
      ];
    }
    if (req.Model.modelName === "Comment") {
      queryOptions.populate = [
        {
          path: "movieId",
        },
        {
          path: "userId",
        },
      ];
    }
    if (req.Model.modelName === "Advertise") {
      queryOptions.populate = "movieId";
    }
    if (req.Model.modelName == "Order") {
      queryOptions.populate = [{ path: "movieId" }, { path: "userId" }];
    }
    const { pageSize, currentPage } = req.query;
    const reg = `/${req.params.name}/`;
    // 根据要求找出所有数据
    // 这里用正则表达式模型查询,将包含name的都查出来
    // console.log(reg);
    const allData = await req.Model.find({
      name: {
        $regex: eval(reg),
      },
    })
      .setOptions(queryOptions)
      .lean();
    // console.log(allData);
    const total = allData.length;

    // 如果没传参数
    if (!pageSize && !currentPage) {
      return res.send({
        allData,
        total,
        status: "Ok",
      });
    }
    if (!pageSize || !currentPage) {
      return res.send({
        message: "pageSize和currentPage要么都填要么都不填",
      });
    }
    // 根据要求截取数据
    const data = allData.slice(
      pageSize * (currentPage - 1),
      pageSize * currentPage
    );
    res.send({
      data,
      total,
      status: "Ok",
    });
  });

  // 6.根据id获取数据
  router.get("/ById/:id", async (req, res) => {
    const queryOptions = {};
    if (req.Model.modelName === "Hall") {
      queryOptions.populate = "cinema";
    }
    if (req.Model.modelName === "Cinema") {
      queryOptions.populate = "children";
    }
    const model = await req.Model.findById(req.params.id)
      .setOptions(queryOptions)
      .lean();
    res.send(model);
  });

  app.use(
    "/admin/api/rest/:resource",
    (req, res, next) => {
      // 这里的原因是获取将请求的url->users(复数)User(首字母大写单数)
      const modelName = require("inflection").classify(req.params.resource);
      // console.log(modelName);
      req.Model = require(`../../models/${modelName}`);
      // console.log(req.Model);
      next();
    },
    router
  );

  // 1.管理员注册模块
  // 默认管理账号密码admin
  app.post("/admin/api/register", async (req, res) => {
    const data = req.body;
    if (!data.name || !data.password) {
      return res.send({
        message: "账号和密码不可为空!",
      });
    }
    const reg = /^[A-Za-z]+$/;
    if (!reg.test(data.name) || !reg.test(data.password)) {
      return res.send({
        message: "账号和密码只能由小写字母组成!",
      });
    }
    // 根据用户名查找用户
    const user = await Administrator.findOne({ name: data.name });
    if (user) {
      return res.send({
        message: "用户已存在，请重新输入用户名",
      });
    }
    // console.log(data);
    // 进行密码加密
    data.password = bcrypt.hashSync(data.password, 10);
    // console.log(data);
    const userInfo = await Administrator.create(data);
    // console.log(model);
    res.send({
      status: "Ok",
      message: "注册成功！",
    });
  });

  // 2.管理员登录模块
  // 登录模块
  app.post("/admin/api/login", async (req, res) => {
    const { name, password } = req.body;

    // 1.根据用户名找用户
    const user = await Administrator.findOne({ name });
    // console.log(name);
    if (!user) {
      // 如果查询到结果为空，说明该用户不存在
      return res.send({
        message: "用户不存在！",
      });
    }

    // 2.校验密码
    const isValid = bcrypt.compareSync(password, user.password);

    if (!isValid) {
      return res.send({
        message: "用户名或密码错误！",
      });
    }

    // 3.返回token
    // 生成 Token 字符串
    const tokenStr = jwt.sign({ id: user._id }, jwtSecretKey, {
      expiresIn: "10h", // token 有效期为 10 个小时
    });
    res.send({
      message: "登录成功！",
      status: "Ok",
      token: "Bearer " + tokenStr,
    });
  });

  // 3.用户头像上传
  // 定义上传图片路由，它不属于通用CRUD接口,用传统定义路由方法

  // 上传地址
  const avatarDest = path.join(__dirname, "../../uploads/avatar");
  //将图片放到服务器
  const avatarStorage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: avatarDest,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + ".jpg");
    },
  });
  // 创建multer的实例对象
  const avatarUpload = multer({
    storage: avatarStorage,
  });
  // upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
  // 将文件类型的数据，解析并挂载到 req.file 属性中
  // 将文本类型的数据，解析并挂载到 req.body 属性中
  app.post(
    "/admin/api/upload/avatar",
    avatarUpload.single("file"),
    async (req, res) => {
      // if(!req.file){
      //   return res.send('请上传base64格式的图片')
      // }
      console.log(req.file);
      const file = req.file;
      file.url = `http://localhost:3500/uploads/avatar/${file.filename}`;
      res.send(file);
    }
  );

  // 4.电影海报上传
  const imageDest = path.join(__dirname, "../../uploads/image");
  const imageStorage = multer.diskStorage({
    // 如果你提供的 destination 是一个函数，你需要负责创建文件夹
    destination: imageDest,
    //给上传文件重命名，获取添加后缀名
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + ".jpg");
    },
  });
  // 创建multer的实例对象
  const imageUpload = multer({
    storage: imageStorage,
  });
  // upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
  // 将文件类型的数据，解析并挂载到 req.file 属性中
  // 将文本类型的数据，解析并挂载到 req.body 属性中
  app.post(
    "/admin/api/upload/image",
    imageUpload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3500/uploads/image/${file.filename}`;
      res.send(file);
    }
  );

  // 4.电影宣传图片上传
  const adImageDest = path.join(__dirname, "../../uploads/adImage");
  const adImageStorage = multer.diskStorage({
    destination: adImageDest,
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + ".jpg");
    },
  });
  // 创建multer的实例对象
  const adImageUpload = multer({
    storage: adImageStorage,
  });
  app.post(
    "/admin/api/upload/adImage",
    adImageUpload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3500/uploads/adImage/${file.filename}`;
      res.send(file);
    }
  );
};
