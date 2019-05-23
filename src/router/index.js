import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import ShoppingMall from '@/components/pages/ShoppingMall'
import Register from '@/components/pages/Register'
import Login from '@/components/pages/Login'
import Goods from '@/components/pages/Goods'
import CategoryList from '@/components/pages/CategoryList'
import Cart from '@/components/pages/Cart'
import Main from '@/components/pages/Main'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/main', name: 'Main', component: Main,
      children: [
        {path: '/', name: 'ShoppingMall', component: ShoppingMall},
        // 商品分类列表页面
        {path: '/categoryList', name: 'CategoryList', component: CategoryList},
        // 购物车页面
        {path: '/cart', name: 'Cart', component: Cart}
      ]
    },

    // {path: '/main', name: 'Main', component: Main},
    // {path: '/', name: 'ShoppingMall', component: ShoppingMall},
    // // 商品分类列表页面
    // {path: '/categoryList', name: 'CategoryList', component: CategoryList},
    // // 购物车页面
    // {path: '/cart', name: 'Cart', component: Cart},
    // 注册页面路由
    {path: '/register', name: 'Register', component: Register},
    // 登陆界面路由
    {path: '/login', name: 'Login', component: Login},
    // 商品详情页面
    {path: '/goods', name: 'Goods', component: Goods}
  ]
})
