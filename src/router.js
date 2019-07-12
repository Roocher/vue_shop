import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
import Welcome from './components/Welcome.vue'
import Users from './components/user/Users.vue'
import Rights from './components/rights/Rights.vue'
import Roles from './components/rights/Roles.vue'
import Cate from './components/Goods/Cate.vue'
import Params from './components/Goods/Params.vue'


Vue.use(Router)

const router = new Router({
    routes: [
        { path: '/', redirect: '/login' },
        { path: '/login', component: Login },
        {
            path: '/home',
            component: Home,
            redirect: '/welcome',
            children: [{
                    path: '/welcome',
                    component: Welcome
                },
                {
                    path: '/users',
                    component: Users
                },
                {
                    path: '/rights',
                    component: Rights
                },
                {
                    path: '/roles',
                    component: Roles
                },
                {
                    path: '/categories',
                    component: Cate
                },
                {
                    path: '/params',
                    component: Params
                }
            ]
        }
    ]
})

//挂载路由导航守卫,to表示将要访问的路径，from表示从哪个路径跳转过来，next是一个函数表示下一个要做的操作
router.beforeEach((to, from, next) => {
    if (to.path === '/login')
        return next();

    //获取token
    const tokenStr = window.sessionStorage.getItem('token')

    if (!tokenStr)
        return next('/login')

    next();

})

export default router