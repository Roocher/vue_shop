<template>
  <div>
    <h3>用户列表组件</h3>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 展示用户列表的表格 -->
    <el-table :data= "userlist" border stripe>
        <el-table-column type= "index"></el-table-column>
        <el-table-column label = "用户名" prop = "username"></el-table-column>
        <el-table-column label = "邮箱" prop = "email"></el-table-column>
        <el-table-column label = "手机号码" prop = "mobile"></el-table-column>
        <el-table-column label = "角色" prop = "role_name"></el-table-column>
        <el-table-column label = "状态" prop = "mg_state">
            <template slot-scope="scope">
                <el-switch :model = "scope.row.mg_state"></el-switch>
            </template>
        </el-table-column>
        <el-table-column label = "操作"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return {
            // 声明一个query对象用来保存查询用户列表时需要传递的参数
            queryInfo :{
                query:'',
                pagenum:1,
                pagesize:2
            },
            userlist:[],
            // 用来保存总条数
            total:0
        }
    },
    created(){
        this.getUserList();
    },
    methods:{
        async getUserList(){
            // 发送请求获取用户数据
            const {data:res} = await this.$http.get("Users",{params:this.queryInfo});
        
            //判断是否获取是否成功
            if(res.meta.status !== 200){
                return this.$message.error(res.meta.msg);
            }
            console.log(res);
            this.userlist = res.data.users;
            this.total = res.data.total;
        }
    }
}
</script>

<style lang="less" scoped>
</style>

