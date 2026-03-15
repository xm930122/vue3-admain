// 关于layout组件的store模块
import { defineStore } from 'pinia'

const useLayOutSettingStore = defineStore('SettingStore', {
  state: () => {
    return {
      isCollapse: false,
      refsh: false,
    }
  },
})

export default useLayOutSettingStore
