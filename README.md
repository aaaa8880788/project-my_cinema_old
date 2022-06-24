<div align=center>
    <h1>电影购票系统开发文档</h1>
</div>

---

## 项目介绍

> 项目名称：电影购票 App
>
> 开发人员：呆头鸭
>
> 更新日期：2022 年 4 月 13 日
>
> 项目演示：https://www.bilibili.com/video/BV1ki4y1Q7zY?share_source=copy_web
>
> 前台项目预览：[前台项目预览](http://47.97.37.90/tm_movie/web)
>
> 有任何疑问请联系邮箱：283313959@qq.com，并注明来意。
>
> 请勿商用！

## 部分演示

> ![](./image/后台1.gif)
>
> <img src="./image/前台1.gif" style="zoom: 50%;" />
>
> <img src="./image/前台2.gif" style="zoom:50%;" />
>
> <img src="./image/前台3.gif" style="zoom:50%;" />
>
> <img src="./image/前台4.gif" style="zoom:50%;" />
>
> <img src="./image/前台5.gif" style="zoom:50%;" />

## 功能介绍

> - 前后台数据互通
> - 前台用户登录注册购票等交互操作
> - 后台管理员操作数据
> - 全栈架构
> - UI 规范化
> - 路由切换采用动画效果

## 技术栈

前端（前台）：`Vue2.0`+`Vant`

前端（后台）：`Vue2.0`+`Element UI`

后端：`Nodejs(express)`+`mongoDB`

**Development Tool**: `Visual Studio Code`

## 前台功能列表

**用户登录部分**

- [x] 支持手机验证码/密码登陆
- [x] 手机号验证码校验
- [x] 用户名密码验证码校验

**个人信息界面**

- [x] 用户详情修改（头像、昵称、简介、性别、生日）
- [x] 用户密码修改
- [x] 用户退出登录

**我的订单界面**

- [x] 评价影片
- [x] 删除订单
- [x] 影院详情界面入口
- [x] 电影详情界面入口

**想看的电影界面**

- [x] 删除一个或多个想看的电影
- [x] 电影详情界面入口

**看过的电影界面**

- [x] 删除一个或多个看过的电影（包括删除电影评价）
- [x] 电影详情界面入口

**电影搜索界面**

- [x] 实时搜索电影列表
- [x] 电影详情界面入口

**影院搜索界面**

- [x] 实时搜索影院列表
- [x] 影院详情界面入口

**电影详情界面**

- [x] 标记、取消标记想看电影
- [x] 标记、取消标记看过电影
- [x] 参与、删除电影评论
- [x] 点赞、取消点赞评论
- [x] 影院选择界面入口

**影院选择界面**

- [x] 标记、取消标记想看电影
- [x] 标记、取消标记看过电影
- [x] 参与、删除电影评论
- [x] 影院详情界面入口

**座位选择界面**

- [x]
- [x] 锁定影院座位
- [x] 确认订单界面入口

**订单支付界面**

- [x] 微信、支付宝、云闪付支付订单获取取票码
- [x] 计时超过取消订单并座位解锁

## 后台功能列表

**管理员登录页界面**

- [x] 管理员用户名密码登录

**主界面**

- [x] 退出登录

**用户管理界面**

- [x] 正则匹配查询数据库搜索全部或指定用户名
- [x] 添加用户
- [x] 编辑用户信息
- [x] 注销用户

**电影管理界面**

- [x] 正则匹配查询数据库搜索全部或指定电影名
- [x] 添加电影
- [x] 编辑电影信息
- [x] 删除电影

**影院管理界面**

- [x] 正则匹配查询数据库搜索全部或指定影院名
- [x] 添加影院
- [x] 编辑影院信息
- [x] 删除影院

**影厅管理界面**

- [x] 正则匹配查询数据库搜索全部或指定影厅名
- [x] 添加影厅
- [x] 编辑影厅信息
- [x] 删除影厅

**电影排片界面**

- [x] 正则匹配查询数据库搜索全部或指定电影名
- [x] 安排电影排片
- [x] 编辑排片信息
- [x] 删除排片

**宣传电影界面**

- [x] 正则匹配查询数据库搜索全部或指定电影名
- [x] 添加首页轮播图数据
- [x] 编辑轮播图数据
- [x] 删除轮播图数据

**评论管理界面**

- [x] 正则匹配查询数据库搜索全部或指定电影名以查看电影相关评论
- [x] 删除评论数据

**订单管理界面**

- [x] 正则匹配查询数据库搜索全部或指定影院名以查看影院相关订单信息
- [x] 删除订单

## 插件

|           包           |  版本   |      备注      |
| :--------------------: | :-----: | :------------: |
|       **axios**        | 0.26.0  |  用于网络请求  |
|       **dayjs**        | 1.11.0  |  用于日期处理  |
|       **swiper**       |  4.5.0  |     轮播图     |
| **vue-awesome-swiper** |  3.1.3  |     轮播图     |
|        **vant**        | 2.12.44 |   ui 组件库    |
|        **less**        |  4.0.0  | css 预处理语言 |

> 前端页面插件

> |       包       |  版本  |      备注      |
> | :------------: | :----: | :------------: |
> |   **axios**    | 0.26.0 |  用于网络请求  |
> |   **dayjs**    | 1.11.0 |  用于日期处理  |
> | **element-ui** | 2.15.6 |   ui 组件库    |
> |    **less**    | 4.0.0  | css 预处理语言 |
>
> 后台管理界面插件

|        包        |  版本  |              备注               |
| :--------------: | :----: | :-----------------------------: |
|     **cors**     | 2.8.5  |            跨域处理             |
|   **express**    | 4.17.3 |            web 框架             |
|   **mongoose**   | 6.2.4  |             数据库              |
|   **mongodb**    | 4.4.1  |             数据库              |
| **require-all**  | 3.0.0  |       加载目录下所有文件        |
|   **bcryptjs**   | 2.4.3  |            密码加密             |
| **jsonwebtoken** | 8.5.1  |      用于生成 Token 字符串      |
|    **multer**    | 1.4.2  | 解析 formadata 格式表单数据的包 |
| **express-jwt**  | 6.1.1  |      用于解析 Token 字符串      |
|  **inflection**  | 1.13.2 |        讲大写英文转小写         |
|    **dayjs**     | 1.11.0 |          用于日期处理           |

> 后端接口插件

## 前端路由

|           路由            |     参数      | 类型 |      备注      |
| :-----------------------: | :-----------: | :--: | :------------: |
|           /home           |       /       |      |      首页      |
|       /movieSearch        |       /       |      |   电影搜索页   |
|          /movie           |       /       |      |     电影页     |
|          /cinema          |       /       |      |     影院页     |
|       /cinemaSearch       |       /       |      |   影院搜索页   |
|           /mine           |       /       |      |   个人中心页   |
|         /mineInfo         |       /       |      |  个人信息页面  |
|        /mineOrder         |       /       |      |  我的订单页面  |
|      /mineWishWatch       |       /       |      | 想看的电影页面 |
|       /mineWatched        |       /       |      | 看过的电影页面 |
|     /movieDetail/:id      |      id       | Str  |  电影详情页面  |
|     /selectCinema/:id     |      id       | Str  |  选择影院页面  |
| /cinemaDetail?movieId=xxx | movieId(可选) | Str  |  影院详情页面  |
|     /movieComment/:id     |      id       | Str  |  电影评价页面  |
|  /seatSelect?planId=xxx   |    planId     | Str  |  座位选择页面  |
| /orderSubmit?orderId=xxx  |    orderId    |      |  订单提交页面  |
|   /orderPay?orderId=xxx   |    orderId    |      |  订单支付页面  |
|          /login           |       /       |      |    登录页面    |

## Schema

### Administrator(管理员)

|   字段   |  类型  |  备注  |
| :------: | :----: | :----: |
|   \_id   | String |   id   |
|   name   | String | 用户名 |
| password | String |  密码  |

### Advertise(广告)

|  字段   |              类型              |     备注     |
| :-----: | :----------------------------: | :----------: |
|  \_id   |             String             |      id      |
|  name   |             String             |    电影名    |
| movieId | mongoose.Schema.Types.ObjectId |   电影 id    |
| adImage |             String             | 电影宣传图片 |

### Cinema(影院)

|  字段   |  类型  |   备注   |
| :-----: | :----: | :------: |
|  \_id   | String |    id    |
|  name   | String |  影院名  |
|  phone  | String | 联系方式 |
| address | String | 影院地址 |
|  desc1  | String | 影院特色 |
|  desc2  | String | 体验特色 |
| demand  | String |   门槛   |

### Hall(影厅)

|  字段  |              类型              |  备注   |
| :----: | :----------------------------: | :-----: |
|  \_id  |             String             |   id    |
|  name  |             String             | 影厅名  |
| cinema | mongoose.Schema.Types.ObjectId | 影院 id |

### Comment(评论)

|     字段      |              类型              |        备注        |
| :-----------: | :----------------------------: | :----------------: |
|     \_id      |             String             |         id         |
|    userId     | mongoose.Schema.Types.ObjectId |      用户 id       |
|    movieId    | mongoose.Schema.Types.ObjectId |      电影 id       |
|     name      |             String             |       电影名       |
|   userScore   |             Number             |      用户评分      |
|  userComment  |             String             |      用户评论      |
| supportUserId | mongoose.Schema.Types.ObjectId |    点赞用户 id     |
|    isPass     |             Number             | 管理员是否授权展示 |

### Movie(电影)

|   字段    |              类型              |        备注        |
| :-------: | :----------------------------: | :----------------: |
|   \_id    |             String             |         id         |
|   name    |             String             |       电影名       |
|   image   |             String             |      电影海报      |
| director  |             String             |      电影导演      |
| performer |             String             |        演员        |
| duration  |             String             |        片长        |
| language  |             String             |        语言        |
|   type    |             String             |      电影类型      |
|  vision   |             String             | 视觉类型（2D、3D） |
|   time    |             String             |      上映时间      |
|  summary  |             String             |        简介        |
| wishWatch | mongoose.Schema.Types.ObjectId |    想看用户 id     |

### Order(订单)

|    字段     |              类型              |     备注     |
| :---------: | :----------------------------: | :----------: |
|    \_id     |             String             |      id      |
|    name     |             String             |    影院名    |
|  orderNum   |             Number             |   订单编号   |
|   movieId   | mongoose.Schema.Types.ObjectId |   电影 id    |
|   planId    | mongoose.Schema.Types.ObjectId |   排片 id    |
|  cinemaId   | mongoose.Schema.Types.ObjectId |   影院 id    |
|   hallId    | mongoose.Schema.Types.ObjectId |   影厅 id    |
|   userId    | mongoose.Schema.Types.ObjectId |   用户 id    |
|  seatInfo   |             Array              |   座位信息   |
|   payType   |             Number             |   支付类型   |
|  ticketNum  |             Number             |   购票数量   |
| totalPrice  |             Number             |  购票总价格  |
| ticketPrice |             Number             |  购票单价格  |
| ticketCode  |             Number             |    取票码    |
|  orderDate  |             String             |   场次日期   |
|  orderTime  |             String             |   场次时间   |
|  payStatus  |             Number             | 订单支付状态 |

### Plan(排片)

|   字段    |              类型              |   备注   |
| :-------: | :----------------------------: | :------: |
|   \_id    |             String             |    id    |
|   name    |             String             |  电影名  |
|  movieId  | mongoose.Schema.Types.ObjectId | 电影 id  |
|  cinema   | mongoose.Schema.Types.ObjectId | 影院 id  |
|   hall    | mongoose.Schema.Types.ObjectId | 影厅 id  |
|  inDate   |             String             | 上映日期 |
|  outDate  |             String             | 放映日期 |
|  outTime  |             String             | 放映时间 |
| leaveTime |             String             | 散场时间 |
|   sale    |             String             |   售价   |

### User(用户)

|   字段   |  类型  |  备注  |
| :------: | :----: | :----: |
|   \_id   | String |   id   |
|   name   | String | 用户名 |
| username | String |  昵称  |
| password | String |  密码  |
|  avatar  | String |  头像  |
|  phone   | String | 手机号 |
|   sex    | String |  性别  |
|   sign   | String |  签名  |
| birthday | String |  生日  |

## API DOC

> baseURL: http://localhost:3500

### 后台部分

#### 01.添加用户

地址：`/admin/api/rest/users`

请求头: **Authorization**

请求方式：**POST**

请求体:

|   字段   |  类型  |  说明  | 必需 |
| :------: | :----: | :----: | :--: |
|   name   | String | 用户名 |  是  |
| username | String |  昵称  |  否  |
| password | String |  密码  |  是  |
|  avatar  | String |  头像  |  否  |
|  phone   | String | 手机号 |  是  |
|   sex    | String |  性别  |  否  |
|   sign   | String |  签名  |  否  |
| birthday | String |  生日  |  否  |

#### 02.查询用户列表

地址：`/admin/api/rest/users?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 03.根据用户 Id 删除用户

地址：`/admin/api/rest/users/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

#### 04.根据用户 Id 更新用户信息

地址：`/admin/api/rest/users/:id`

请求头: **Authorization**

请求方式：**put**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|   字段   |  类型  |  说明  | 必需 |
| :------: | :----: | :----: | :--: |
|   name   | String | 用户名 |  是  |
| username | String |  昵称  |  否  |
| password | String |  密码  |  是  |
|  avatar  | String |  头像  |  否  |
|  phone   | String | 手机号 |  是  |
|   sex    | String |  性别  |  否  |
|   sign   | String |  签名  |  否  |
| birthday | String |  生日  |  否  |

#### 05.根据用户名查询用户列表(模糊查询)

地址：`/admin/api/rest/users/:name?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明  | 必需 |
| :--: | :----: | :----: | :--: |
| name | String | 用户名 |  是  |

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 06.根据用户 id 查询用户信息

地址：`/admin/api/rest/users/ById/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 Id |  是  |

#### 07.添加电影

地址：`/admin/api/rest/movies`

请求头: **Authorization**

请求方式：**POST**

请求体:

|   字段    |  类型  |        说明        | 必需 |
| :-------: | :----: | :----------------: | :--: |
|   name    | String |       电影名       |  是  |
|   image   | String |      电影海报      |  是  |
| director  | String |      电影导演      |  是  |
| performer | String |        演员        |  是  |
| duration  | String |        片长        |  是  |
| language  | String |        语言        |  是  |
|   type    | String |      电影类型      |  是  |
|  vision   | String | 视觉类型（2D、3D） |  是  |
|   time    | String |      上映时间      |  是  |
|  summary  | String |        简介        |  是  |

#### 08.查询电影列表

地址：`/admin/api/rest/movies?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 09.根据电影 Id 删除电影

地址：`/admin/api/rest/movies/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 电影 id |  是  |

#### 10.根据电影 Id 更新电影信息

地址：`/admin/api/rest/movies/:id`

请求头: **Authorization**

请求方式：**put**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 电影 id |  是  |

请求体:

|   字段    |  类型  |        说明        | 必需 |
| :-------: | :----: | :----------------: | :--: |
|   name    | String |       电影名       |  是  |
|   image   | String |      电影海报      |  是  |
| director  | String |      电影导演      |  是  |
| performer | String |        演员        |  是  |
| duration  | String |        片长        |  是  |
| language  | String |        语言        |  是  |
|   type    | String |      电影类型      |  是  |
|  vision   | String | 视觉类型（2D、3D） |  是  |
|   time    | String |      上映时间      |  是  |
|  summary  | String |        简介        |  是  |

#### 11.根据电影名查询电影列表(模糊查询)

地址：`/admin/api/rest/movies/:name?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明  | 必需 |
| :--: | :----: | :----: | :--: |
| name | String | 电影名 |  是  |

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 12.根据电影 id 查询电影信息

地址：`/admin/api/rest/movies/ById/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 电影 Id |  是  |

#### 13.添加影院

地址：`/admin/api/rest/cinemas`

请求头: **Authorization**

请求方式：**POST**

请求体:

|  字段   |  类型  |   说明   | 必需 |
| :-----: | :----: | :------: | :--: |
|  name   | String |  影院名  |  是  |
|  phone  | String | 联系方式 |  是  |
| address | String | 影院地址 |  是  |
|  desc1  | String | 影院特色 |  是  |
|  desc2  | String | 体验特色 |  是  |
| demand  | String |   门槛   |  是  |

#### 14.查询影院列表

地址：`/admin/api/rest/cinemas?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 15.根据影院 Id 删除影院

地址：`/admin/api/rest/cinemas/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 影院 id |  是  |

#### 16.根据影院 Id 更新影院信息

地址：`/admin/api/rest/cinemas/:id`

请求头: **Authorization**

请求方式：**put**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 影院 id |  是  |

请求体:

|  字段   |  类型  |   说明   | 必需 |
| :-----: | :----: | :------: | :--: |
|  name   | String |  影院名  |  是  |
|  phone  | String | 联系方式 |  是  |
| address | String | 影院地址 |  是  |
|  desc1  | String | 影院特色 |  是  |
|  desc2  | String | 体验特色 |  是  |
| demand  | String |   门槛   |  是  |

#### 17.根据影院查询影院列表(模糊查询)

地址：`/admin/api/rest/cinemas/:name?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明  | 必需 |
| :--: | :----: | :----: | :--: |
| name | String | 影院名 |  是  |

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 18.根据影院 id 查询影院信息

地址：`/admin/api/rest/cinemas/ById/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 影院 Id |  是  |

#### 19.添加影厅

地址：`/admin/api/rest/halls`

请求头: **Authorization**

请求方式：**POST**

请求体:

|  字段  |  类型  |  说明   | 必需 |
| :----: | :----: | :-----: | :--: |
|  \_id  | String |   id    |  是  |
|  name  | String | 影厅名  |  是  |
| cinema | String | 影院 id |  是  |

#### 20.查询影厅列表

地址：`/admin/api/rest/halls?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 21.根据影厅 Id 删除影厅

地址：`/admin/api/rest/halls/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 影厅 id |  是  |

#### 22.根据影厅 Id 更新影厅信息

地址：`/admin/api/rest/halls/:id`

请求头: **Authorization**

请求方式：**put**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 影厅 id |  是  |

请求体:

|  字段  |  类型  |  说明   | 必需 |
| :----: | :----: | :-----: | :--: |
|  \_id  | String |   id    |  是  |
|  name  | String | 影厅名  |  是  |
| cinema | String | 影院 id |  是  |

#### 23.根据影厅名查询影厅列表(模糊查询)

地址：`/admin/api/rest/halls/:name?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明  | 必需 |
| :--: | :----: | :----: | :--: |
| name | String | 影厅名 |  是  |

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 24.根据影厅 id 查询影厅信息

地址：`/admin/api/rest/halls/ById/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 影厅 Id |  是  |

#### 25.添加排片

地址：`/admin/api/rest/plans`

请求头: **Authorization**

请求方式：**POST**

请求体:

|   字段    |  类型  |   说明   | 必需 |
| :-------: | :----: | :------: | :--: |
|   name    | String |  电影名  |  是  |
|  movieId  | String | 电影 id  |  是  |
|  cinema   | String | 影院 id  |  是  |
|   hall    | String | 影厅 id  |  是  |
|  inDate   | String | 上映日期 |  是  |
|  outDate  | String | 放映日期 |  是  |
|  outTime  | String | 放映时间 |  是  |
| leaveTime | String | 散场时间 |  是  |
|   sale    | String |   售价   |  是  |

#### 26.查询排片列表

地址：`/admin/api/rest/plans?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 27.根据排片 Id 删除排片

地址：`/admin/api/rest/plans/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 排片 id |  是  |

#### 28.根据排片 Id 更新排片信息

地址：`/admin/api/rest/plans/:id`

请求头: **Authorization**

请求方式：**put**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 排片 id |  是  |

请求体:

|   字段    |  类型  |   说明   | 必需 |
| :-------: | :----: | :------: | :--: |
|   name    | String |  电影名  |  是  |
|  movieId  | String | 电影 id  |  是  |
|  cinema   | String | 影院 id  |  是  |
|   hall    | String | 影厅 id  |  是  |
|  inDate   | String | 上映日期 |  是  |
|  outDate  | String | 放映日期 |  是  |
|  outTime  | String | 放映时间 |  是  |
| leaveTime | String | 散场时间 |  是  |
|   sale    | String |   售价   |  是  |

#### 29.根据电影名查询排片列表(模糊查询)

地址：`/admin/api/rest/plans/:name?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明  | 必需 |
| :--: | :----: | :----: | :--: |
| name | String | 电影名 |  是  |

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 30.根据排片 id 查询排片信息

地址：`/admin/api/rest/plans/ById/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 排片 Id |  是  |

#### 31.添加宣传

地址：`/admin/api/rest/advertises`

请求头: **Authorization**

请求方式：**POST**

请求体:

|  字段   |  类型  |     说明     | 必需 |
| :-----: | :----: | :----------: | :--: |
|  \_id   | String |      id      |  是  |
|  name   | String |    电影名    |  是  |
| movieId | String |   电影 id    |  是  |
| adImage | String | 电影宣传图片 |  是  |

#### 32.查询宣传列表

地址：`/admin/api/rest/advertises?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 33.根据宣传 Id 删除宣传

地址：`/admin/api/rest/advertises/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 宣传 id |  是  |

#### 34.根据宣传 Id 更新宣传信息

地址：`/admin/api/rest/advertises/:id`

请求头: **Authorization**

请求方式：**put**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 宣传 id |  是  |

请求体:

|  字段   |  类型  |     说明     | 必需 |
| :-----: | :----: | :----------: | :--: |
|  \_id   | String |      id      |  是  |
|  name   | String |    电影名    |  是  |
| movieId | String |   电影 id    |  是  |
| adImage | String | 电影宣传图片 |  是  |

#### 35.根据电影名查询宣传列表(模糊查询)

地址：`/admin/api/rest/advertises/:name?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明  | 必需 |
| :--: | :----: | :----: | :--: |
| name | String | 电影名 |  是  |

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 36.根据宣传 id 查询宣传信息

地址：`/admin/api/rest/advertises/ById/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 宣传 Id |  是  |

#### 37.查询评论列表

地址：`/admin/api/rest/comments?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 38.根据评论 Id 删除评论

地址：`/admin/api/rest/comments/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 评论 id |  是  |

#### 39.根据电影名查询评论列表(模糊查询)

地址：`/admin/api/rest/users/:name?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明  | 必需 |
| :--: | :----: | :----: | :--: |
| name | String | 电影名 |  是  |

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 40.查询订单列表

地址：`/admin/api/rest/orders?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 41.根据订单 Id 删除订单

地址：`/admin/api/rest/orders/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 订单 id |  是  |

#### 42.根据影院名查询订单列表(模糊查询)

地址：`/admin/api/rest/users/:name?pageSize=xxx&currentPage=xxx&total=xxx`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明  | 必需 |
| :--: | :----: | :----: | :--: |
| name | String | 影院名 |  是  |

query 参数:

|    字段     |  类型  |       说明       | 必需 |
| :---------: | :----: | :--------------: | :--: |
|  pageSize   | String | 每页显示条目个数 |  是  |
| currentPage | String |     当前页数     |  是  |
|    total    | String |     总条目数     |  是  |

#### 43.管理员注册

地址：`/admin/api/register`

请求头: **无**

请求方式：**POST**

请求体:

|   字段   |  类型  |  说明  | 必需 |
| :------: | :----: | :----: | :--: |
|   name   | String | 用户名 |  是  |
| password | String |  密码  |  是  |

#### 44.管理员登录

地址：`/admin/api/login`

请求头: **无**

请求方式：**POST**

请求体:

|   字段   |  类型  |  说明  | 必需 |
| :------: | :----: | :----: | :--: |
|   name   | String | 用户名 |  是  |
| password | String |  密码  |  是  |

#### 45.用户头像上传

地址：`/admin/api/upload/avatar`

请求头: **Authorization**

请求方式：**POST**

请求体(Form-data):

| 字段 |  类型  |   说明   | 必需 |
| :--: | :----: | :------: | :--: |
| file | String | 图片文件 |  是  |

#### 46.电影海报上传

地址：`/admin/api/upload/image`

请求头: **Authorization**

请求方式：**POST**

请求体(Form-data):

| 字段 |  类型  |   说明   | 必需 |
| :--: | :----: | :------: | :--: |
| file | String | 图片文件 |  是  |

#### 47.电影宣传图片上传

地址：`/admin/api/upload/adImage`

请求头: **Authorization**

请求方式：**POST**

请求体(Form-data):

| 字段 |  类型  |   说明   | 必需 |
| :--: | :----: | :------: | :--: |
| file | String | 图片文件 |  是  |

### 前台部分

#### 公共接口部分(无需 token)

##### 1.获取正在热映电影数据(首页、电影页)

地址：`/web/api/isShowingMovieList`

请求头: **无**

请求方式：**GET**

##### 2.获取即将上映电影数据(首页、电影页)

地址：`/web/api/willShowingMovieList`

请求头: **无**

请求方式：**GET**

##### 3.获取电影列表数据(首页、电影页)

地址：`/web/api/movieList`

请求头: **无**

请求方式：**GET**

##### 4.获取电影宣传列表（轮播图数据）(首页)

地址：`/web/api/movieAdList`

请求头: **无**

请求方式：**GET**

##### 5.获取影院列表(影院页)

地址：`/web/api/cinemaList`

请求头: **无**

请求方式：**GET**

##### 6.根据电影 id 获取电影详情页电影数据(电影详情页){传入参数：电影 id}

地址：`/web/api/movieDetail/:id`

请求头: **无**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 电影 id |  是  |

##### 7.根据电影关键字获取电影数据（电影搜索页）{传入参数：电影名关键字 Keyword}

地址：`/web/api/movieSearch/:Keyword`

请求头: **无**

请求方式：**GET**

URL 参数:

|  字段   |  类型  |     说明     | 必需 |
| :-----: | :----: | :----------: | :--: |
| Keyword | String | 电影名关键字 |  是  |

##### 8.根据影院关键字获取影院数据（影院搜索页）{传入参数：影院名关键字 Keyword}

地址：`/web/api/willShowingMovieList`

请求头: **无**

请求方式：**GET**

URL 参数:

|  字段   |  类型  |     说明     | 必需 |
| :-----: | :----: | :----------: | :--: |
| Keyword | String | 影院名关键字 |  是  |

##### 9.根据电影 id 获取电影详情数据和已排片的影院列表(选择影院页){传入参数：电影 id}

地址：`/web/api/selectCinema/:id`

请求头: **无**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 电影 id |  是  |

##### 10.根据影院 id 查出影院信息以及它的排片信息(影院详情页)

地址：`/web/api/cinemaDetail/:id`

请求头: **无**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 影院 id |  是  |

##### 11.用户手机登录

地址：`/web/api/phoneLogin`

请求头: **无**

请求方式：**POST**

请求体:

| 字段  |  类型  |  说明  | 必需 |
| :---: | :----: | :----: | :--: |
| phone | Number | 手机号 |  是  |

##### 12.用户用户名密码登录

地址：`/web/api/phoneLogin`

请求头: **无**

请求方式：**POST**

请求体:

|   字段   |  类型  |  说明  | 必需 |
| :------: | :----: | :----: | :--: |
|   name   | String | 用户名 |  是  |
| password | String |  密码  |  是  |

#### 非公共接口代码(需 token)

##### 1.根据用户 id 查询用户信息（个人中心页、个人信息页）

地址：`/web/api/userInfo/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

##### 2.根据用户 id 更新用户信息（个人信息页）

地址：`/web/api/userInfo/:id`

请求头: **Authorization**

请求方式：**PUT**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|   字段   |  类型  | 备注 | 必需 |
| :------: | :----: | :--: | :--: |
| username | String | 昵称 |  否  |
|  avatar  | String | 头像 |  否  |
|   sex    | String | 性别 |  否  |
|   sign   | String | 简介 |  否  |
| birthday | String | 生日 |  否  |

##### 3.更换用户头像（个人信息页）

地址：`/web/api/upload/avatar`

请求头: **Authorization**

请求方式：**POST**

请求体(Form-data):

| 字段 |  类型  |   说明   | 必需 |
| :--: | :----: | :------: | :--: |
| file | String | 图片文件 |  是  |

##### 4.根据用户 id 修改用户密码（个人信息页）

地址：`/web/api/updateUserPwd/:id`

请求头: **Authorization**

请求方式：**POST**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|    字段    |  类型  |   备注   | 必需 |
| :--------: | :----: | :------: | :--: |
|   oldPwd   | String |  旧密码  |  是  |
|   newPwd   | String |  新密码  |  是  |
| confirmPwd | String | 确认密码 |  是  |

##### 5.根据用户 id 查询用户想看的电影（想看的电影页）

地址：`/web/api/mineWishWatch/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

##### 6.根据用户 id 删除其指定的想看电影（想看的电影页）

地址：`/web/api/deleteWishWatchList/:id`

请求头: **Authorization**

请求方式：**PUT**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|   字段    | 类型  |     备注     | 必需 |
| :-------: | :---: | :----------: | :--: |
| movieList | Array | 电影 id 列表 |  是  |

##### 7.根据用户 id 查询用户看过的电影（看过的电影页）

地址：`/web/api/mineWatched/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

##### 8.根据用户 id 删除其指定的看过的电影(看过的电影页)

地址：`/web/api/deleteWatchedList/:id`

请求头: **Authorization**

请求方式：**PUT**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|   字段    | 类型  |     备注     | 必需 |
| :-------: | :---: | :----------: | :--: |
| movieList | Array | 电影 id 列表 |  是  |

##### 9.根据用户 id 与其指定电影 id 标记用户想看(电影详情页)

地址：`/web/api/addWishWatch/:id`

请求头: **Authorization**

请求方式：**PUT**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|  字段   |  类型  |  备注   | 必需 |
| :-----: | :----: | :-----: | :--: |
| movieId | String | 电影 id |  是  |

##### 10.根据用户 id 与其指定电影 id 取消用户想看(电影详情页)

地址：`/web/api/deleteWishWatch/:id`

请求头: **Authorization**

请求方式：**PUT**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|  字段   |  类型  |  备注   | 必需 |
| :-----: | :----: | :-----: | :--: |
| movieId | String | 电影 id |  是  |

##### 11.根据用户 id 与其指定评论 id 增加点赞用户(电影详情页)

地址：`/web/api/addSupportUser/:id`

请求头: **Authorization**

请求方式：**PUT**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|   字段    |  类型  |  备注   | 必需 |
| :-------: | :----: | :-----: | :--: |
| commentId | String | 评论 id |  是  |

##### 12.根据用户 id 与其指定评论 id 删除点赞用户(电影详情页)

地址：`/web/api/deleteSupportUser/:id`

请求头: **Authorization**

请求方式：**PUT**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

请求体:

|   字段    |  类型  |  备注   | 必需 |
| :-------: | :----: | :-----: | :--: |
| commentId | String | 评论 id |  是  |

##### 13.根据电影 id 与用户 id 找到相应评论并删除该评论

地址：`/web/api/deleteComment/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 电影 id |  是  |

请求体:

|  字段  |  类型  |  备注   | 必需 |
| :----: | :----: | :-----: | :--: |
| userId | String | 用户 id |  是  |

##### 14.根据电影 id 与用户 id 获取电影数据和相应用户评论数据

地址：`/web/api/movieComment/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 电影 id |  是  |

请求体:

|  字段  |  类型  |  备注   | 必需 |
| :----: | :----: | :-----: | :--: |
| userId | String | 用户 id |  是  |

##### 15.发布评论(电影评论页面)

地址：`/web/api/commentPublish`

请求头: **Authorization**

请求方式：**POST**

请求体:

|    字段     |  类型  |   备注   | 必需 |
| :---------: | :----: | :------: | :--: |
|   userId    | String | 用户 id  |  是  |
|   movieId   | String | 电影 id  |  是  |
|  userScore  | String | 用户评分 |  是  |
| userComment | String | 用户评论 |  是  |

##### 16.根据排片 id 获取排片信息（座位选择页）

地址：`/web/api/getPlanData/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 排片 id |  是  |

##### 17.添加订单（座位选择页）

地址：`/web/api/addOrder`

请求头: **Authorization**

请求方式：**POST**

请求体:

|    字段     |  类型  |    说明    | 必需 |
| :---------: | :----: | :--------: | :--: |
|    name     | String |   影院名   |  是  |
|   movieId   | String |  电影 id   |  是  |
|   planId    | String |  排片 id   |  是  |
|  cinemaId   | String |  影院 id   |  是  |
|   hallId    | String |  影厅 id   |  是  |
|   userId    | String |  用户 id   |  是  |
|  seatInfo   | Array  |  座位信息  |  是  |
|  ticketNum  | Number |  购票数量  |  是  |
| totalPrice  | Number | 购票总价格 |  是  |
| ticketPrice | Number | 购票单价格 |  是  |
|  orderDate  | String |  场次日期  |  是  |
|  orderTime  | String |  场次时间  |  是  |

##### 18.根据订单 id 获取订单信息（订单提交页面）

地址：`/web/api/getOrderDataFromSubmit/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 订单 id |  是  |

##### 19.根据订单 id 获取订单信息（订单支付页面）

地址：`/web/api/getOrderDataFromPay/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 订单 id |  是  |

##### 20.支付订单，根据订单 id 更新数据（订单支付页面）

地址：`/web/api/payOrder/:id`

请求头: **Authorization**

请求方式：**PUT**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 订单 id |  是  |

请求体:

|   字段   |  类型  |   备注   | 必需 |
| :------: | :----: | :------: | :--: |
| payType  | Number | 支付类型 |  是  |
| orderNum | Number | 订单编号 |  是  |

##### 21.根据用户 id 获取订单数据，（我的订单页面）

地址：`/web/api/getUserOrderData/:id`

请求头: **Authorization**

请求方式：**GET**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 用户 id |  是  |

##### 22.根据用户 id 获取订单数据，（我的订单页面）

地址：`/web/api/deleteOrder/:id`

请求头: **Authorization**

请求方式：**DELETE**

URL 参数:

| 字段 |  类型  |  说明   | 必需 |
| :--: | :----: | :-----: | :--: |
|  id  | String | 订单 id |  是  |
