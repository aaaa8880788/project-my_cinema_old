import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')

  },
  {
    path: '/',
    name: 'main',
    redirect: '/userManage',
    component: Main,
    children: [
      {
        path: '/userManage',
        component: () => import('@/views/child/UserManage.vue')
      },
      {
        path: '/movieManage',
        component: () => import('@/views/child/MovieManage.vue')
      },
      {
        path: '/cinemaManage',
        component: () => import('@/views/child/CinemaManage.vue')
      },
      {
        path: '/hallManage',
        component: () => import('@/views/child/HallManage.vue')
      },
      {
        path: '/moviePlan',
        component: () => import('@/views/child/MoviePlan.vue')
      },
      {
        path: '/movieAdvertise',
        component: () => import('@/views/child/MovieAdvertise.vue')
      },
      {
        path: '/commentManage',
        component: () => import('@/views/child/CommentManage.vue')
      },
      {
        path: '/orderManage',
        component: () => import('@/views/child/OrderManage.vue')
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
// to  将要访问的路径
// from  代表从那个路径跳转而来
// next  是一个函数代表放行
// next的两种方式
// 1. next()  直接放行
// 2. next('/XXXXX')  强制跳转
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const tokenStr = window.localStorage.getItem('token')
  if (!tokenStr || tokenStr === 'undefined') {
    next('/login')
  } else {
    next()
  }
})

export default router
