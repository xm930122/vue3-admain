<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px" :class="{ isCollapse: isCollapse ? true : false }">
      <el-scrollbar>
        <el-menu
          :default-active="$route.path"
          active-text-color="#fff"
          background-color="#001529"
          text-color="#959ea6"
          :collapse="isCollapse"
          :router="true"
        >
          <Logo />
          <Menu :menuList="menuRoutes" />
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container class="container">
      <TabBar style="width: 100%" />
      <el-main
        :style="{
          left: !isCollapse ? '200px' : '56px',
          width: isCollapse ? 'calc(100% - 56px)' : 'calc(100% - 200px)',
        }"
      >
        <el-scrollbar>
          <Main />
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import TabBar from './tabbar/index.vue'
import Main from './main/index.vue'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'

const userStore = useUserStore()
const $route = useRoute()
const LayOutSettingStore = useLayOutSettingStore()
//  使用storeToRefs转换countStore，随后解构 保证响应式
let { menuRoutes } = storeToRefs(userStore)
let { isCollapse } = storeToRefs(LayOutSettingStore)
</script>

<style lang="scss" scoped>
.layout-container-demo {
  height: 100%;
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  position: absolute;
  padding: 20px;
  left: 200px;
  top: 60px;
  transition: all 0.3s;
  width: calc(100% - $base-menu-width);
  height: calc(100vh - 60px);
}

.el-aside {
  background-color: #001529 !important;
  transition: all 0.3s;
}
.el-header {
  background-color: #fff !important;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 3px 3px 0px;
  z-index: 999;
}
.isCollapse {
  width: 56px;
}

@media screen and (max-width: 768px) {
  .el-aside {
    position: fixed;
    left: -200px;
    top: 0;
    bottom: 0;
    z-index: 1000;

    &.isCollapse {
      left: 0;
    }
  }

  .el-main {
    left: 0 !important;
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    align-items: center !important;
  }

  .container {
    margin-left: 0;
  }
}
</style>
