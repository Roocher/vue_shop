<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout"> 退出 </el-button>
    </el-header>
    <!-- 页面主题部分 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggle">|||</div>
        <!-- 导航菜单 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级导航 -->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menulist"
            :key="item.id"
          >
            <!-- 一级导航的模板 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- 文本 -->
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级导航 -->
            <el-menu-item
              :index="'/' + subItem.path"
              v-for="subItem in item.children"
              :key="subItem.id"
              @click="saveNavState('/' + subItem.path)"
            >
              <!-- 二级导航模板 -->
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span> {{ subItem.authName }} </span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 主体部分路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menulist: [],
      // 字体图标
      iconsObj: {
        '125': 'iconfont icon-user',
        '103': 'iconfont icon-tijikongjian',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath:''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = sessionStorage.getItem("activePath")
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      // 发送请求获取菜单列表
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200)
        return this.$message.console.error(res.meta.msg)

      // 获取列表成功
      // console.log(res.data)
      this.menulist = res.data
    },
    toggle() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState( path ){
      // 将data中保存的activePath修改为path
      this.activePath = path;
      // 将path保存到sessionStorage中
      sessionStorage.setItem("activePath",path);
    } 
  }
}
</script>

<style lang='less' scoped>
// 将顶级容器设置为高度100%，占满全屏
.home-container {
  height: 100%;
}
// 设置头部区域的样式
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
// 设置侧边栏样式
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
// 设置主体样式
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  text-align: center;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>
