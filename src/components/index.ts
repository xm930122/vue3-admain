// 注册全局组件
import type { App } from 'vue'
import * as components from './components'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const install = function (app: App) {
  Object.entries(components).forEach(([key, value]) => {
    app.component(key, value)
  })
  // 引入element-plus全局图标（便于路由菜单图标展示）
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}

export default install
export * from './components'
