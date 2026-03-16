// 路由鉴权文件
import router from '@/router'
import setting from './setting'
import nprogress from 'nprogress' // 进度条文件
import 'nprogress/nprogress.css'
import pinia from './store'
import useUserStore from './store/modules/user'
import { asyncRoute } from './router/routes'

// 取消进度条显示
nprogress.configure({ showSpinner: false })
// 非组件使用pinia，需要先引用
const userStore = useUserStore(pinia)

// 全局前置守卫
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title + ` | ${setting.title}`
  nprogress.start()
  const token = userStore.token
  const username = userStore.username
  if (token) {
    // 已登陆，再次前往/login路由，重定向到/
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 其他已登陆场景
      // 有用户信息直接放行
      if (username) {
        next()
      } else {
        // 接口获取用户信息
        try {
          await userStore.userInfo()
          // 添加异步路由
          asyncRoute.forEach((route) => {
            router.addRoute(route)
          })
          next({ ...to, replace: true })
        } catch (error) {
          // 登录超时，退出登录后重定向到首页
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 未登录且前往页面是登录页，直接放行
    if (to.path == '/login') {
      next()
    } else {
      // 未登录且前往其他页面，重定向到登录页面
      next({ path: '/login', query: { redirect: to.path } })
    }
  }
})

// 全局后置守卫
router.afterEach((route) => {
  nprogress.done()
})
