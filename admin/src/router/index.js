import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'
// import Home from '../views/Home.vue'
// import Main from '../views/Main.vue'
import MainTest from '../views/Main.vue'
import Login from '../views/Login.vue'
import UploadImgs from '../components/UploadImgs.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { isPublic: true } },
  { path: '/upload', name: 'upload', component: UploadImgs, meta: { isPublic: true } },
  {
    path: '/',
    name: 'test',
    component: MainTest,
    redirect: '/goods/list',
    children: [
      { path: '/categories/create', component: () => import('../views/category/CategoryEdit.vue') },
      // props true 可以直接路由跳转过去的 id 带到目标组件的 props里
      { path: '/categories/edit/:id', component: () => import('../views/category/CategoryEdit.vue'), props: true },
      { path: '/categories/list', component: () => import('../views/category/TestList.vue') },

      { path: '/personal/create', component: () => import('../views/personal/PersonalEdit.vue') },
      { path: '/personal/edit/:id', component: () => import('../views/personal/PersonalEdit.vue'), props: true },
      { path: '/personal/list', component: () => import('../views/personal/PersonalList.vue') },
      
      { path: '/items/create', component: () => import('../views/item/ItemEdit.vue') },
      { path: '/items/edit/:id', component: () => import('../views/item/ItemEdit.vue'), props: true },
      { path: '/items/list', component: () => import('../views/item/ItemList.vue') },
      
      { path: '/customers/create', component: () => import('../views/custom/CustomerEdit.vue') },
      { path: '/customers/edit/:id', component: () => import('../views/custom/CustomerEdit.vue'), props: true },
      { path: '/customers/list', component: () => import('../views/custom/CustomerList.vue') },

      { path: '/goods/list', component: () => import('../views/goods/GoodsList.vue') },
      { path: '/goods/create', component: () => import('../views/goods/GoodsEdit.vue') },
      { path: '/goods/edit/:id', component: () => import('../views/goods/GoodsEdit.vue'), props: true },
      { path: '/goods/output', component: () => import('../views/goods/Output.vue') },
      
      { path: '/admin_users/create', component: () => import('../views/admin_user/AdminUserEdit.vue') },
      { path: '/admin_users/edit/:id', component: () => import('../views/admin_user/AdminUserEdit.vue'), props: true },
      { path: '/admin_users/list', component: () => import('../views/admin_user/AdminUserList.vue') },
    ]
  }
]

const router = new VueRouter({
  routes
})
// 切换路由之前要 做的事情
router.beforeEach((to, from ,next) => {
  console.log('~~to,from~', to, from)
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  // 不写，就什么操作都不做，不会跳转，
  next()
})
export default router
