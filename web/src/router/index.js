import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    redirect: '/home'
  },

  // 首页
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home/Home.vue'),
    meta: {
      showTabBar: true,
      index: 1
    }
  },
  // 电影搜索页
  {
    path: '/movieSearch',
    name: 'movieSearch',
    component: () => import('../views/MovieSearch/MovieSearch.vue'),
    meta: {
      index: 3
    }
  },

  // 电影页
  {
    path: '/movie',
    name: 'movie',
    component: () => import('../views/Movie/Movie.vue'),
    meta: {
      showTabBar: true,
      index: 2
    }
  },

  // 影院页
  {
    path: '/cinema',
    name: 'cinema',
    component: () => import('../views/Cinema/Cinema.vue'),
    meta: {
      showTabBar: true,
      index: 3
    }
  },
  // 影院搜索页
  {
    path: '/cinemaSearch',
    name: 'cinemaSearch',
    component: () => import('../views/CinemaSearch/CinemaSearch.vue'),
    meta: {
      index: 4
    }
  },

  // 个人中心页
  {
    path: '/mine',
    name: 'mine',
    component: () => import('../views/Mine/Mine.vue'),
    meta: {
      showTabBar: true,
      index: 4
    },
  },
  // 个人信息页面
  {
    path: '/mineInfo',
    name: 'mineInfo',
    component: () => import('../views/MineInfo/MineInfo.vue'),
    meta: {
      index: 5
    }
  },
  // 我的订单页面
  {
    path: '/mineOrder',
    name: 'mineOrder',
    component: () => import('../views/MineOrder/MineOrder.vue'),
    meta: {
      index: 5
    }
  },

  // 想看的电影页面
  {
    path: '/mineWishWatch',
    name: 'mineWishWatch',
    component: () => import('../views/MineWishWatch/MineWishWatch.vue'),
    meta: {
      index: 5
    }
  },
  // 看过的电影页面
  {
    path: '/mineWatched',
    name: 'mineWatched',
    component: () => import('../views/MineWatched/MineWatched.vue'),
    meta: {
      index: 5
    }
  },

  // 电影详情页面
  {
    path: '/movieDetail/:id',
    name: 'movieDetail',
    component: () => import('../views/MovieDetail/MovieDetail.vue'),
    props: true,
    meta: {
      index: 10
    }
  },
  // 选择影院页面
  {
    path: '/selectCinema/:id',
    name: 'selectCinema',
    component: () => import('../views/SelectCinema/SelectCinema.vue'),
    props: true,
    meta: {
      index: 11
    }
  },
  // 影院详情页面
  {
    path: '/cinemaDetail',
    name: 'cinemaDetail',
    component: () => import('../views/CinemaDetail/CinemaDetail.vue'),
    meta: {
      index: 12
    }
  },
  // 电影评价页面
  {
    path: '/movieComment/:id',
    name: 'movieComment',
    component: () => import('../views/MovieComment/MovieComment.vue'),
    props: true,
    meta: {
      index: 12
    }
  },
  // 座位选择页面
  {
    path: '/seatSelect',
    name: 'seatSelect',
    component: () => import('../views/SeatSelect/SeatSelect.vue'),
    meta: {
      index: 13
    }
  },
  // 订单提交页面
  {
    path: '/orderSubmit',
    name: 'orderSubmit',
    component: () => import('../views/OrderSubmit/OrderSubmit.vue'),
    meta: {
      index: 14
    }
  },
  // 订单支付页面
  {
    path: '/orderPay',
    name: 'orderPay',
    component: () => import('../views/OrderPay/OrderPay.vue'),
    meta: {
      index: 15
    }
  },
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login/Login.vue'),
    meta: {
      index: 50
    }
  },
]

const router = new VueRouter({
  routes
})

export default router
