const { findById, where } = require("../../models/Order");
const Order = require("../../models/Order");

module.exports = (app) => {
  // 导入express模块
  const express = require("express");
  // 实例路由对象
  const router = express.Router();
  // 导入处理路径的核心模块
  const path = require("path");
  // 导入解析 formadata 格式表单数据的包
  const multer = require("multer");
  // 用这个包来生成 Token 字符串
  const jwt = require("jsonwebtoken");
  // 导入jwtSecretKey,用来加密token
  const { webJwtSecretKey } = require("../../jwtSecretKey");
  // 用这个报来解析Token
  const expressJWT = require("express-jwt");
  // 这里除了注册、登录、公共部分不用token,其他要token
  // 该处的接口解析token不运用于其他接口，如/admin/api/
  app.use(
    expressJWT({
      secret: webJwtSecretKey,
      algorithms: ["HS256"],
    }).unless({
      path: [
        "/web/api/pwdLogin", //密码登录
        "/web/api/phoneLogin", //手机登录
        /^\/admin\/api/, //管理员api
        /^\/web\/api\/public/, //公共部分
      ],
    })
  );
  // 导入日期处理模块
  const dayjs = require("dayjs");

  // 引入电影模型
  const Movie = require("../../models/Movie");
  // 引入安排电影模型
  const Plan = require("../../models/Plan");
  // 引入安排影院模型
  const Cinema = require("../../models/Cinema");
  // 引入用户模型
  const User = require("../../models/User");
  // 引入评论模型
  const Comment = require("../../models/Comment");
  // 引入电影宣传模型
  const Advertise = require("../../models/Advertise");

  // 公共接口代码（不需要登录状态）
  // 1.获取正在热映电影数据(首页、电影页)
  router.get("/isShowingMovieList", async (req, res) => {
    // 正在热映部分
    const model = await Plan.find().lean().populate("cinema").populate("hall");
    // 进行数据处理
    // 正在热映的电影的放映时间必须是今天的日期之后
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    // console.log(model);
    const movieIds = model
      .filter((item) => {
        return new Date(item.outDate) > new Date(today);
      })
      .map((item) => {
        return item.movieId;
      });
    const data = await Movie.find()
      .where({
        _id: movieIds,
      })
      .populate("comments")
      .lean();

    //获取电影的总评分/2
    data.forEach((item) => {
      // 筛选出每个电影中管理审核通过的评论
      item.comments = item.comments.filter((item1) => {
        return item1.isPass == 1;
      });
      const AllUserScore = item.comments.map((item) => {
        return item.userScore;
      });
      // 这里拿到电影的总评分/2
      let movieScoreHalf =
        Math.round(
          AllUserScore.reduce((preValue, curValue) => {
            return preValue + curValue;
          }, 0) / AllUserScore.length
        ) / 2;
      if (Number.isNaN(movieScoreHalf)) {
        movieScoreHalf = 0;
      }
      item.movieScoreHalf = movieScoreHalf;
    });
    res.send({
      status: "Ok",
      isShowingData: data,
    });
  });
  // 2.获取即将上映电影数据(首页、电影页)
  router.get("/willShowingMovieList", async (req, res) => {
    // 即将上映部分
    const now = new Date();
    const model = await Movie.find().lean().populate("comments");
    // 即将上映电影的上映日期必须要在今天之后
    const data = model.filter((item) => {
      return new Date(item.time) > now;
    });
    //获取电影的总评分/2
    data.forEach((item) => {
      // 筛选出每个电影中管理审核通过的评论
      item.comments = item.comments.filter((item1) => {
        return item1.isPass == 1;
      });
      const AllUserScore = item.comments.map((item) => {
        return item.userScore;
      });
      // 这里拿到电影的总评分/2
      let movieScoreHalf =
        Math.round(
          AllUserScore.reduce((preValue, curValue) => {
            return preValue + curValue;
          }, 0) / AllUserScore.length
        ) / 2;
      if (Number.isNaN(movieScoreHalf)) {
        movieScoreHalf = 0;
      }
      item.movieScoreHalf = movieScoreHalf;
    });
    res.send({
      status: "Ok",
      willShowingData: data,
    });
  });
  // 3.获取电影列表数据(首页、电影页)
  router.get("/movieList", async (req, res) => {
    // 电影列表部分
    const data = await Movie.find().lean().populate("comments");
    //获取电影的总评分/2
    data.forEach((item) => {
      // 筛选出每个电影中管理审核通过的评论
      item.comments = item.comments.filter((item1) => {
        return item1.isPass == 1;
      });
      const AllUserScore = item.comments.map((item) => {
        return item.userScore;
      });
      // 这里拿到电影的总评分/2
      let movieScoreHalf =
        Math.round(
          AllUserScore.reduce((preValue, curValue) => {
            return preValue + curValue;
          }, 0) / AllUserScore.length
        ) / 2;
      if (Number.isNaN(movieScoreHalf)) {
        movieScoreHalf = 0;
      }
      item.movieScoreHalf = movieScoreHalf;
    });
    res.send({
      status: "Ok",
      movieList: data,
    });
  });
  // 4.获取电影宣传列表（轮播图数据）(首页)
  router.get("/movieAdList", async (req, res) => {
    const model = await Advertise.find();
    res.send(model);
  });
  // 5.获取影院列表(影院页)
  router.get("/cinemaList", async (req, res) => {
    // 用于字符串操作
    const model = await Cinema.find();
    // 数据处理,将desc1和desc2的数据从字符串转为数组,方便展示
    let data = JSON.stringify(model);
    data = JSON.parse(data);
    data.forEach((item) => {
      item.desc1 = item.desc1.split(",");
      item.desc2 = item.desc2.split(",");
    });
    res.send({
      cinemaList: data,
      status: "Ok",
    });
  });
  // 6.根据电影id获取电影详情页电影数据(电影详情页){传入参数：电影id}
  router.get("/movieDetail/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.send({
        message: "id(电影id)为必传参数~",
      });
    }
    const model = await Movie.findById(id)
      .populate([
        {
          path: "comments",
          populate: "userId",
        },
        {
          path: "plans",
          populate: "cinema",
        },
      ])
      .lean();

    // 数据处理
    // 筛选出管理审核通过的评论
    model.comments = model.comments.filter((item) => {
      return item.isPass == 1;
    });
    // 获取电影的评分/2
    const allUserScore = model.comments.map((item2) => {
      return item2.userScore;
    });
    let movieScoreHalf =
      Math.round(
        allUserScore.reduce((pre, cur) => {
          return pre + cur;
        }, 0) / allUserScore.length
      ) / 2;

    if (Number.isNaN(movieScoreHalf)) {
      movieScoreHalf = 0;
    }
    model.movieScoreHalf = movieScoreHalf;

    // 对plans进行处理，因为这里的plans用来判断本电影是否可以购票，而plans里只有上映时间在今天之后才生效，所以要把不生效的给过滤掉
    const now = new Date();
    model.plans = model.plans.filter((item) => {
      return new Date(item.outDate) > now;
    });
    res.send({
      status: "Ok",
      movieDetailData: model,
    });
  });
  // 7.根据电影关键字获取电影数据（电影搜索页）{传入参数：电影名关键字Keyword}
  router.get("/movieSearch/:Keyword", async (req, res) => {
    const reg = `/${req.params.Keyword}/`;
    const movieList = await Movie.find({
      name: {
        $regex: eval(reg),
      },
    })
      .populate("comments")
      .lean();
    if (movieList.length != 0) {
      // 数据处理
      movieList.forEach((item) => {
        // 筛选出管理审核通过的评论
        item.PassComments = item.comments.filter((item) => {
          return item.isPass == 1;
        });
        // 获取电影的评分/2
        const allUserScore = item.PassComments.map((item2) => {
          return item2.userScore;
        });
        let movieScoreHalf =
          Math.round(
            allUserScore.reduce((pre, cur) => {
              return pre + cur;
            }, 0) / allUserScore.length
          ) / 2;

        if (Number.isNaN(movieScoreHalf)) {
          movieScoreHalf = 0;
        }
        item.movieScoreHalf = movieScoreHalf;
      });
    }
    res.send({
      movieList,
      status: "Ok",
    });
  });
  // 8.根据影院关键字获取影院数据（影院搜索页）{传入参数：影院名关键字Keyword}
  router.get("/cinemaSearch/:Keyword", async (req, res) => {
    const reg = `/${req.params.Keyword}/`;
    const cinemaList = await Cinema.find({
      name: {
        $regex: eval(reg),
      },
    }).lean();
    // 对影院数据的desc1和desc2进行处理，转为数组，方便展示
    cinemaList.forEach((item) => {
      item.desc1 = item.desc1.split(",");
      item.desc2 = item.desc2.split(",");
    });
    res.send({
      cinemaList,
      status: "Ok",
    });
  });
  // 9.根据电影id获取电影详情数据和已排片的影院列表(选择影院页){传入参数：电影id}
  router.get("/selectCinema/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "id(电影id)为必传参数~",
      });
    }
    const movieData = await Movie.findById(id)
      .populate({
        path: "comments",
        populate: "userId",
      })
      .lean();
    // 电影详情数据处理部分
    // 筛选出管理审核通过的评论
    movieData.PassComments = movieData.comments.filter((item) => {
      return item.isPass == 1;
    });
    // 获取电影的评分/2
    const allUserScore = movieData.PassComments.map((item2) => {
      return item2.userScore;
    });
    let movieScoreHalf =
      Math.round(
        allUserScore.reduce((pre, cur) => {
          return pre + cur;
        }, 0) / allUserScore.length
      ) / 2;

    if (Number.isNaN(movieScoreHalf)) {
      movieScoreHalf = 0;
    }
    movieData.movieScoreHalf = movieScoreHalf;
    // 电影详情数据处理完毕

    // 获取该电影已排片的影院列表
    let model = await Movie.findById(id)
      .populate({
        path: "plans",
        populate: "cinema",
      })
      .lean();
    model = JSON.parse(JSON.stringify(model));
    // console.log(model.plans);
    // 排片的放映时间必须是今天的日期之后
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    const planList = model.plans.filter((item) => {
      return new Date(item.outDate) > new Date(today);
    });
    // 数据处理
    // 这里要进行去重，因为这里获取到的是该电影id所对应的所有排片，而其中有同个影院不同时间段的排片，这就造成了影院重复了
    let cinemaName = [];
    const model2 = planList.filter((item) => {
      if (cinemaName.indexOf(item.cinema.name) != -1) {
        return false;
      }
      cinemaName.push(item.cinema.name);
      return true;
    });
    let cinemaList = [];
    model2.forEach((item) => {
      // 将desc1和desc2的数据从字符串转为数组,方便展示
      item.cinema.desc1 = item.cinema.desc1.split(",");
      item.cinema.desc2 = item.cinema.desc2.split(",");
      cinemaList.push(item.cinema);
    });
    res.send({
      movieData: movieData,
      cinemaList: cinemaList,
      status: "Ok",
    });
  });
  // 10.根据影院id查出影院信息以及它的排片信息(影院详情页)
  router.get("/cinemaDetail/:id", async (req, res) => {
    const { id } = req.params;
    let cinemaDetail = await Cinema.findById(id)
      .populate({
        path: "planMovieList",
        populate: [
          {
            path: "movieId",
            populate: "comments",
          },
          {
            path: "hall",
          },
        ],
      })
      .lean();
    cinemaDetail = JSON.parse(JSON.stringify(cinemaDetail));
    // 其中planMovieList为该影院的排片列表
    // 数据处理
    // 排片的放映时间必须是今天的日期之后,所有先筛选出过期的排片
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    cinemaDetail.planMovieList = cinemaDetail.planMovieList.filter((item) => {
      return new Date(item.outDate) > new Date(today);
    });
    // 先筛选出热映列表，也就是排片列表里面的电影，要去掉重复的
    let movieName = [];
    let showingMovieList = cinemaDetail.planMovieList
      .filter((item) => {
        if (movieName.indexOf(item.name) != -1) {
          return false;
        }
        movieName.push(item.name);
        return true;
      })
      .map((item) => {
        return item.movieId;
      });

    // 获取热映列表里的每个电影的评分/2
    // 筛选出管理审核通过的评论
    showingMovieList.forEach((item) => {
      item.PassComments = item.comments.filter((item1) => {
        return item1.isPass == 1;
      });
      const allUserScore = item.PassComments.map((item2) => {
        return item2.userScore;
      });
      let movieScoreHalf =
        Math.round(
          allUserScore.reduce((pre, cur) => {
            return pre + cur;
          }, 0) / allUserScore.length
        ) / 2;
      if (Number.isNaN(movieScoreHalf)) {
        movieScoreHalf = 0;
      }
      item.movieScoreHalf = movieScoreHalf;
      item.movieScore = movieScoreHalf * 2;
    });

    // 将该影院的所有排片进行区分为showingmovieList(热映的电影列表)中的具体哪一部电影,将其放入showingmovieList的plans中,要筛选出明天和后天的排片，其中0为明天的排片，1为后天的排片，其中里面的排序要按里面的放映时间从早到晚排序,
    const todayTime = new Date(today).getTime();
    const tomorrowTime = todayTime + 1 * 24 * 60 * 60 * 1000;
    const afterTomorrowTime = todayTime + 2 * 24 * 60 * 60 * 1000;
    const tomorrow = dayjs(new Date(tomorrowTime)).format("YYYY-MM-DD");
    const afterTomorrow = dayjs(new Date(afterTomorrowTime)).format(
      "YYYY-MM-DD"
    );
    showingMovieList.forEach((item) => {
      let plans = [];
      let movieList1 = [];
      let movieList2 = [];
      cinemaDetail.planMovieList.map((item1) => {
        // 为明天的排片存入movieList1
        if (item1.name == item.name && item1.outDate == tomorrow) {
          movieList1.push(item1);
        }
        // 为后天的排片存入movieList2
        if (item1.name == item.name && item1.outDate == afterTomorrow) {
          movieList2.push(item1);
        }
        return item1;
      });
      // 对movieList1和movieList2进行排序，按放映时间从早到晚
      if (movieList1.length) {
        movieList1 = movieList1.sort((item1, item2) => {
          return item1.outTime.slice(0, 2) * 1 - item2.outTime.slice(0, 2) * 1;
        });
      }
      if (movieList2.length) {
        movieList2 = movieList2.sort((item1, item2) => {
          return item1.outTime.slice(0, 2) * 1 - item2.outTime.slice(0, 2) * 1;
        });
      }
      plans.push(movieList1);
      plans.push(movieList2);
      plans = JSON.parse(JSON.stringify(plans));
      item.plans = plans;
    });
    cinemaDetail.showingMovieList = showingMovieList;
    res.send({
      cinemaData: cinemaDetail,
      status: "Ok",
    });
  });

  app.use("/web/api/public", router);

  // 非公共接口代码（需要登录状态-----除了1.用户登录模块）
  // 1.用户登录模块（注册登录页）
  // ①手机登录
  app.post("/web/api/phoneLogin", async (req, res) => {
    const { phone } = req.body;
    if (!phone) {
      return res.send({
        message: "phone(手机号)为必传参数",
      });
    }
    // 校验手机正则
    const reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
    if (!reg.test(phone)) {
      return res.send({
        message: "请输入正确的手机号",
      });
    }
    const data = await User.find({
      phone: phone,
    }).lean();
    // console.log(data);
    if (!data.length) {
      // 如果手机号不存在，注册账号
      const model = {
        name: phone,
        username: phone,
        password: phone,
        phone: phone,
        avatar: "http://localhost:3500/uploads/avatar/duck.jpg",
      };

      const registerData = await User.create(model);
      // 生成 Token 字符串
      const tokenStr = jwt.sign({ id: registerData._id }, webJwtSecretKey, {
        expiresIn: "10h", // token 有效期为 10 个小时
      });
      res.send({
        message: "登录成功！",
        status: "Ok",
        WebToken: "Bearer " + tokenStr,
        userId: registerData._id,
      });
    } else {
      // 手机号存在，登录账号
      // 生成 Token 字符串
      const tokenStr = jwt.sign({ id: data[0]._id }, webJwtSecretKey, {
        expiresIn: "10h", // token 有效期为 10 个小时
      });
      res.send({
        message: "登录成功！",
        status: "Ok",
        WebToken: "Bearer " + tokenStr,
        userId: data[0]._id,
      });
    }
  });
  // ②密码登录
  app.post("/web/api/pwdLogin", async (req, res) => {
    const { name, password } = req.body;
    if (!name || !password) {
      return res.send({
        message: "name和password为必传参数",
      });
    }
    const data = await User.find({
      name: name,
    }).lean();
    if (!data.length) {
      return res.send({
        message: "该用户不存在！",
      });
    }
    if (data[0].password !== password) {
      return res.send({
        message: "密码错误，请重新输入！",
      });
    }
    // 3.返回token
    // 生成 Token 字符串
    const tokenStr = jwt.sign({ id: data[0]._id }, webJwtSecretKey, {
      expiresIn: "10h", // token 有效期为 10 个小时
    });
    res.send({
      message: "登录成功！",
      status: "Ok",
      WebToken: "Bearer " + tokenStr,
      userId: data[0]._id,
    });
  });
  // 2.根据用户id查询用户信息（个人中心页、个人信息页）{传入参数：用户id}
  app.get("/web/api/userInfo/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "id(用户id)为必传参数~",
      });
    }
    const data = await User.findById(id).lean();
    delete data.password; //密码不发送给前台
    // console.log(data);
    res.send({
      userInfo: {
        ...data,
      },
      status: "Ok",
    });
  });
  // 3.根据用户id更新用户信息（个人信息页）{传入参数：用户id}
  app.put("/web/api/userInfo/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "id(用户id)为必传参数~",
      });
    }
    const data = await User.findByIdAndUpdate(id, req.body);
    res.send({
      message: "更新成功！",
      status: "Ok",
    });
  });
  // 4.更换用户头像（个人信息页）
  // 用户头像图片上传
  const avatarDest = path.join(__dirname, "../../uploads/avatar");
  const avatarStorage = multer.diskStorage({
    destination: avatarDest,
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + ".jpg");
    },
  });
  // 创建multer的实例对象
  const avatarUpload = multer({
    storage: avatarStorage,
  });
  app.post(
    "/web/api/upload/avatar",
    avatarUpload.single("file"),
    async (req, res) => {
      const file = req.file;
      file.url = `http://localhost:3500/uploads/avatar/${file.filename}`;
      res.send(file);
    }
  );

  // 5.根据用户id修改用户密码（个人信息页）{传入参数：用户id}
  app.post("/web/api/updateUserPwd/:id", async (req, res) => {
    const { id } = req.params;
    const { oldPwd, newPwd, confirmPwd } = req.body;
    if (!oldPwd || !newPwd || !confirmPwd) {
      return res.send({
        message: "oldPwd、newPwd、confirmPwd为必填参数，不可为空~",
      });
    }
    if (newPwd !== confirmPwd) {
      return res.send({
        message: "请保持newPwd、confirmPwd值一致~",
      });
    }
    const userInfo = await User.findById(id);
    if (!Object.keys(userInfo).length) {
      return res.send({
        message: "id不存在，请传入有效id",
      });
    }
    // console.log(userInfo.password);
    // console.log(oldPwd);
    if (userInfo.password !== oldPwd) {
      return res.send({
        message: "旧密码错误，请重新输入~",
      });
    }
    const data = await User.findByIdAndUpdate(id, {
      password: confirmPwd,
    });
    res.send({
      message: "修改密码成功",
      status: "Ok",
    });
  });

  // 6.根据用户id查询用户想看的电影（想看的电影页）{传入参数：用户id}
  app.get("/web/api/mineWishWatch/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "id(用户id)为必传参数~",
      });
    }
    const data = await User.findById(id)
      .populate({
        path: "wishWatchMovie",
        populate: "comments",
      })
      .lean();
    // 拿到用户想看的电影数据
    const movieList = data.wishWatchMovie;
    // 数据处理
    // 上面已经拿到电影数据了，但是因为展示的数据有评分，而评论有多条，有的是没通过的，评分的计算是所有通过的评论的评分相加/总数
    movieList.forEach((item) => {
      // 筛选出审核通过的评论数据
      item.comments = item.comments.filter((item1) => {
        return item1.isPass == 1;
      });
      const AllUserScore = item.comments.map((item) => {
        return item.userScore;
      });
      // 这里拿到电影的总评分/2
      let movieScoreHalf =
        Math.round(
          AllUserScore.reduce((preValue, curValue) => {
            return preValue + curValue;
          }, 0) / AllUserScore.length
        ) / 2;
      if (Number.isNaN(movieScoreHalf)) {
        movieScoreHalf = 0;
      }
      item.movieScoreHalf = movieScoreHalf;
    });
    res.send({
      movieList,
      status: "Ok",
    });
  });

  // 7.根据用户id删除其指定的想看电影（想看的电影页）{传入参数：用户id，电影id数组}
  app.put("/web/api/deleteWishWatchList/:id", async (req, res) => {
    const { id } = req.params;
    const { movieList } = req.body;
    if (!movieList.length || !id) {
      return res.send({
        message: "id(用户id)movieList(电影id数组)为必传参数~",
      });
    }
    movieList.forEach(async (item) => {
      const index = item.wishWatch.indexOf(id);
      item.wishWatch.splice(index, 1);
      await Movie.findByIdAndUpdate(item._id, item);
    });
    res.send({
      message: "更新成功~",
      status: "Ok",
    });
  });

  // 8.根据用户id查询用户看过的电影（看过的电影页）{传入参数：用户id}
  app.get("/web/api/mineWatched/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "id(用户id)为必传参数~",
      });
    }
    const model = await User.findById(id)
      .populate({
        path: "commentMovie",
        populate: {
          path: "movieId",
          populate: "comments",
        },
      })
      .lean();
    // 数据处理
    let movieList = [];
    // 先筛选出看过的电影(评论审核通过才算看过)
    let WatchedMovie = model.commentMovie.filter((item) => {
      return item.isPass == 1;
    });
    WatchedMovie.forEach((item) => {
      // 获取本地用户评分的一半
      item.movieId.localUserScoreHalf = item.userScore / 2;
      movieList.push(item.movieId);
    });

    res.send({
      movieList,
      status: "Ok",
    });
  });

  // 9.根据用户id删除其指定的看过的电影(看过的电影页){传入参数：用户id，电影id数组}
  app.put("/web/api/deleteWatchedList/:id", async (req, res) => {
    const { id } = req.params;
    const { movieList } = req.body;
    if (!movieList.length || !id) {
      return res.send({
        message: "id(用户id)与movieList(电影id数组)为必传参数~",
      });
    }
    // 获取指定电影中该用户的评论id列表
    let commentIdList = [];
    movieList.map((item) => {
      item.comments.some((item1) => {
        if (item1.userId == id) {
          commentIdList.push(item1._id);
        }
        return item1.userId == id;
      });
    });
    commentIdList.map(async (item) => {
      await Comment.findByIdAndDelete(item);
    });
    res.send({
      message: "更新成功~",
      status: "Ok",
    });
  });

  // 10.根据用户id与其指定电影id标记用户想看(电影详情页){传入参数：用户id，电影id}
  app.put("/web/api/addWishWatch/:id", async (req, res) => {
    const { id } = req.params;
    const { movieId } = req.body;
    if (!movieId || !id) {
      return res.send({
        message: "id(用户id)movieId(电影id)为必传参数~",
      });
    }
    // 先根据电影id查出电影数据
    let movieData = await Movie.findById(movieId).lean();
    // 先判断用户是否已经想看过了
    let isSupport = movieData.wishWatch.some((item) => {
      return item == id;
    });
    if (isSupport) {
      return res.send({
        message: "标记想看失败,用户本身为标记想看~",
        status: "Ok",
      });
    }
    // 在该电影数据中的wishWatch添加用户id,然后更新电影数据
    movieData.wishWatch.push(id);
    await Movie.findByIdAndUpdate(movieId, movieData);
    res.send({
      message: "标记想看成功~",
      status: "Ok",
    });
  });

  // 11.根据用户id与其指定电影id取消用户想看(电影详情页){传入参数：用户id，电影id}
  app.put("/web/api/deleteWishWatch/:id", async (req, res) => {
    const { id } = req.params;
    const { movieId } = req.body;
    if (!movieId || !id) {
      return res.send({
        message: "id(用户id)movieId(电影id)为必传参数~",
      });
    }
    // 先根据电影id查出电影数据
    let movieData = await Movie.findById(movieId).lean();
    // 先判断用户是否已经想看过了
    let isSupport = movieData.wishWatch.some((item) => {
      return item == id;
    });
    if (!isSupport) {
      return res.send({
        message: "取消想看失败,用户本身没有标记想看~",
        status: "Ok",
      });
    }
    // 在该电影数据中的wishWatch删除用户id,然后更新电影数据
    const index = movieData.wishWatch.indexOf(id);
    movieData.wishWatch.splice(index, 1);
    await Movie.findByIdAndUpdate(movieId, movieData);
    res.send({
      message: "取消想看成功~",
      status: "Ok",
    });
  });

  // 12.根据用户id与其指定评论id增加点赞用户(电影详情页){传入参数：用户id，评论id}
  app.put("/web/api/addSupportUser/:id", async (req, res) => {
    const { id } = req.params;
    const { commentId } = req.body;
    if (!commentId || !id) {
      return res.send({
        message: "id(用户id)跟commentId(评论id)为必传参数~",
      });
    }
    let commentData = await Comment.findById(commentId);
    // 先判断用户是否已经点赞过了
    let isSupport = commentData.supportUserId.some((item) => {
      return item == id;
    });
    if (isSupport) {
      return res.send({
        message: "点赞失败,该用户已经点赞过了",
      });
    }
    commentData.supportUserId.push(id);
    await Comment.findByIdAndUpdate(commentId, commentData);
    res.send({
      message: "点赞成功~",
      status: "Ok",
    });
  });

  // 13.根据用户id与其指定评论id删除点赞用户(电影详情页){传入参数：用户id，评论id}
  app.put("/web/api/deleteSupportUser/:id", async (req, res) => {
    const { id } = req.params;
    const { commentId } = req.body;
    if (!commentId || !id) {
      return res.send({
        message: "id(用户id)跟commentId(评论id)为必传参数~",
      });
    }
    let commentData = await Comment.findById(commentId);
    // 先判断用户是否已经删除点赞过了
    let isSupport = commentData.supportUserId.some((item) => {
      return item == id;
    });
    if (!isSupport) {
      return res.send({
        message: "取消点赞失败,用户没有点赞过~",
      });
    }
    // 在该评论数据中的supportUserId删除用户id,然后更新评论数据
    const index = commentData.supportUserId.indexOf(id);
    commentData.supportUserId.splice(index, 1);
    await Comment.findByIdAndUpdate(commentId, commentData);
    res.send({
      message: "取消点赞成功~",
      status: "Ok",
    });
  });

  // 14.根据电影id与用户id找到相应评论并删除该评论(电影详情页、影院选择页)
  app.delete("/web/api/deleteComment/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;
    if (!userId || !id) {
      return res.send({
        message: "id(电影id)跟userId(用户id)为必传参数~",
      });
    }
    const movieData = await Movie.findById(id).populate("comments").lean();
    let commentId;
    movieData.comments.some((item) => {
      if (item.userId == userId) {
        commentId = item._id;
      }
      return item.userId == userId;
    });
    // console.log(commentId);
    const data = await Comment.findByIdAndDelete(commentId);
    res.send({
      message: "删除评论成功~",
      status: "Ok",
    });
  });

  // 15.根据电影id与用户id获取电影数据和相应用户评论数据(电影评论页面){传入参数：电影id，用户id}
  app.get("/web/api/movieComment/:id", async (req, res) => {
    const { id } = req.params;
    const { userId } = req.query;
    if (!userId || !id) {
      return res.send({
        message: "id(电影id)跟userId(用户id)为必传参数~",
      });
    }
    const movieData = await Movie.findById(id).populate("comments").lean();
    let movieComment = movieData.comments.filter((item) => {
      return item.userId == userId;
    });
    if (movieComment.length) {
      movieComment = movieComment[0];
      // 这里返回用户评分的一半
      movieComment.userScoreHalf = movieComment.userScore / 2;
    } else {
      movieComment = {};
    }
    res.send({
      movieComment: movieComment,
      movieData: movieData,
      status: "Ok",
    });
  });

  // 16.发布评论(电影评论页面){传入参数：用户id,电影id,用户评分,用户评论}
  app.post("/web/api/commentPublish", async (req, res) => {
    const { userId, movieId, userScore, userComment } = req.body;
    let bodyData = req.body;
    if (!userId || !movieId || !userScore || !userComment) {
      return res.send({
        message: "userId、movieId、userScore、userComment为必填项",
      });
    }
    // 1.根据电影id查询出所有评论，查看该用户是否已发布过评论，如果已经发布过，就更新发布过的那个
    const movieData = await Movie.findById(movieId).populate("comments").lean();
    // console.log(movieData);
    let commentId = "";
    // 2.遍历评论，如果找到属于该用户id的评论，保存id
    movieData.comments.map((item) => {
      if (item.userId == userId) {
        commentId = item._id;
      }
      return item;
    });
    // 3.每次发布，都需要管理员审核
    bodyData.isPass = 0;
    if (!commentId) {
      // 创建一个新的发布
      const data = await Comment.create(bodyData);
    } else {
      // 更新发布
      const data = await Comment.findByIdAndUpdate(commentId, bodyData);
    }
    res.send({
      message: "提交成功，等待管理员审核！",
      status: "Ok",
    });
  });

  // 17.根据排片id获取排片信息（座位选择页）{传入参数：排片id}
  app.get("/web/api/getPlanData/:id", async (req, res) => {
    const planId = req.params.id;
    if (!planId) {
      return res.send({
        message: "planId为必填项",
      });
    }
    // 先获取该影院的订单信息orders
    let { orders } = await Plan.findById(planId).populate("orders").lean();
    // 数据处理
    // 先将该影院的所有未支付状态的订单给清除掉,防止虚订单越积越多哎
    // 将支付成功的订单的座位信息保存下来，最后赋值给排片数据
    let seatInfo = [];
    orders.map(async (item) => {
      if (item.payStatus == 0) {
        return await Order.findByIdAndDelete(item._id);
      }
      seatInfo = [...seatInfo, ...item.seatInfo];
    });

    let data = await Plan.findById(planId)
      .populate("hall")
      .populate("movieId")
      .populate("cinema")
      .lean();
    // 数据处理
    // 获取该影院该排片的座位信息
    data.seatInfo = seatInfo;
    // 获取影院该排片的日期是明天的还是后天的
    const today = dayjs(new Date()).format("YYYY-MM-DD");
    const todayTime = new Date(today).getTime();
    const tomorrowTime = todayTime + 1 * 24 * 60 * 60 * 1000;
    const afterTomorrowTime = todayTime + 2 * 24 * 60 * 60 * 1000;
    const tomorrow = dayjs(new Date(tomorrowTime)).format("YYYY-MM-DD");
    const afterTomorrow = dayjs(new Date(afterTomorrowTime)).format(
      "YYYY-MM-DD"
    );
    let showDay = "";
    if (data.outDate == tomorrow) {
      showDay = "明天";
    }
    if (data.outDate == afterTomorrow) {
      showDay = "后天";
    }
    data.showDay = showDay;
    // 将outDate的时间分隔出年月日，方便展示
    data.outDateYYYY = data.outDate.slice(0, 4);
    data.outDateMM = data.outDate.slice(5, 7);
    data.outDateDD = data.outDate.slice(8, 10);
    res.send({
      planData: data,
      status: "Ok",
    });
  });

  // 18.添加订单（座位选择页）{传入请求体参数：影院名，排片id，用户id，座位信息（座位二维坐标），购票数量，购票总价格，场次日期}
  app.post("/web/api/addOrder", async (req, res) => {
    let {
      name,
      seatInfo,
      planId,
      userId,
      ticketNum,
      totalPrice,
      orderDate,
      movieId,
      cinemaId,
      hallId,
      ticketPrice,
      orderTime,
    } = req.body;
    // console.log(req.body);
    if (!name) {
      return res.send({
        message: "请求体中name为必填项",
      });
    }
    if (!planId) {
      return res.send({
        message: "请求体中planId为必填项",
      });
    }
    if (!userId) {
      return res.send({
        message: "userId为必填项",
      });
    }
    if (!seatInfo || seatInfo.length == 0) {
      return res.send({
        message: "seatInfo为必填项",
      });
    }
    if (!ticketNum) {
      return res.send({
        message: "ticketNum为必填项",
      });
    }
    if (!ticketPrice) {
      return res.send({
        message: "ticketPrice为必填项",
      });
    }
    if (!totalPrice) {
      return res.send({
        message: "totalPrice为必填项",
      });
    }
    if (!orderDate) {
      return res.send({
        message: "orderDate为必填项",
      });
    }
    if (!orderTime) {
      return res.send({
        message: "orderTime为必填项",
      });
    }
    if (!movieId) {
      return res.send({
        message: "movieId为必填项",
      });
    }
    if (!cinemaId) {
      return res.send({
        message: "cinemaId为必填项",
      });
    }
    if (!hallId) {
      return res.send({
        message: "hallId为必填项",
      });
    }
    // console.log(totalPrice);
    // 新增一个未支付状态的订单
    const data = await Order.create(req.body);
    res.send({
      message: "添加订单成功~",
      data: data,
      status: "Ok",
    });
  });

  // 19.根据订单id获取订单信息（订单提交页面）{传入参数：订单id}
  app.get("/web/api/getOrderDataFromSubmit/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "参数id为必填项",
      });
    }
    const orderData = await Order.findById(id)
      .populate("userId")
      .populate("cinemaId")
      .populate("hallId")
      .populate("movieId")
      .lean();
    res.send({
      orderData,
      status: "Ok",
    });
  });

  // 20.根据订单id获取订单信息（订单支付页面）{传入参数：订单id}
  app.get("/web/api/getOrderDataFromPay/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "参数id为必填项",
      });
    }
    const orderData = await Order.findById(id).lean();
    // 数据处理
    // 随机生成一个唯一的订单编号
    const randomNum = "1234567890";
    const generateStringNum = (length) => {
      let stringNum = "";
      for (let i = 0; i < length; i++) {
        stringNum += randomNum[Math.floor(Math.random() * randomNum.length)];
      }
      return stringNum;
    };
    let orderNum = generateStringNum(14);
    // 这里检验随机数是否唯一
    const orderList = await Order.find().lean();
    // 在订单列表里面看是否有重复
    let checkIsOnly = (orderNum) => {
      const status = orderList.some((item) => {
        return item.orderNum == orderNum;
      });
      if (status) {
        orderNum = "";
        orderNum = generateStringNum(14);
        checkIsOnly(orderNum);
      }
    };
    checkIsOnly(orderNum);
    orderData.orderNum = orderNum;
    res.send({
      orderData,
      status: "Ok",
    });
  });

  // 21.支付订单，根据订单id更新数据（订单支付页面）{传入参数：订单id,支付类型，订单编号}
  app.put("/web/api/payOrder/:id", async (req, res) => {
    const { id } = req.params;
    const { payType, orderNum } = req.body;
    if (!id) {
      return res.send({
        message: "参数id为必填项",
      });
    }
    console.log(payType);
    console.log(orderNum);
    if (!payType || !orderNum) {
      return res.send({
        message: "请求体中payType、orderNum为必填项",
      });
    }
    // 数据处理
    // 随机生成一个唯一的取票码
    const randomNum = "1234567890";
    // 生成length位数的随机验证码
    const generateStringNum = (length) => {
      let stringNum = "";
      for (let i = 0; i < length; i++) {
        stringNum += randomNum[Math.floor(Math.random() * randomNum.length)];
      }
      return stringNum;
    };
    let ticketCode = generateStringNum(6);
    // 这里检验随机数是否唯一
    const orderList = await Order.find().lean();
    // 在订单列表里面看是否有重复
    let checkIsOnly = (ticketCode) => {
      const status = orderList.some((item) => {
        return item.ticketCode == ticketCode;
      });
      if (status) {
        ticketCode = "";
        ticketCode = generateStringNum(6);
        checkIsOnly(ticketCode);
      }
    };
    checkIsOnly(ticketCode);

    // 改变支付状态为1（已支付）
    const payStatus = 1;

    const data = await Order.findByIdAndUpdate(id, {
      payType,
      orderNum,
      payStatus,
      ticketCode,
      payStatus,
    });
    res.send({
      message: "支付成功",
      ticketCode,
      status: "Ok",
    });
  });

  // 22.根据用户id获取订单数据，（我的订单页面）{传入参数：用户id}
  app.get("/web/api/getUserOrderData/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "参数id为必填项",
      });
    }
    const orderList = await Order.find()
      .where({
        userId: id,
      })
      .populate("movieId")
      .populate("hallId")
      .lean();
    res.send({
      orderList,
      status: "Ok",
    });
  });
  // 23.根据订单id删除订单，（我的订单页面）{传入参数：订单id}
  app.delete("/web/api/deleteOrder/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
      return res.send({
        message: "参数id为必填项",
      });
    }
    const data = await Order.findByIdAndDelete(id);
    res.send({
      message: "删除订单成功",
      status: "Ok",
    });
  });
};
