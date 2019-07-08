<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
     <div>
        <img src="../assets/heima.png" alt="">
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout"> 退出 </el-button>
    </el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>
</template>

<script>
export default {
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
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
