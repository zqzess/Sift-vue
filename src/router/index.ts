/**
 * ========================
 * Created with WebStorm.
 * @Author zqzess
 * @Date 2023/02/25 19:57
 * @File wlsys/index.ts
 * @Version :
 * @Desc :
 * @GitHUb Https://github.com/zqzess
 * ========================
 **/
import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import FileList from '../components/FileList.vue'
import MonacoEditor from "@/components/MonacoEditor.vue";
import NotFound from '../views/NotFound.vue'
import EditModule from '../components/EditModule.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'FileList',
          component: FileList,
          meta: {
            title: '主页',
          }
        },
        {
          path: '/edit',
          name: 'Edit',
          component: EditModule,
          meta: {
            title: '编辑',
          }
        },
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        title: '登陆'
      }
    },
    {
      path: '/:catchAll(.*)',
      component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFound.vue'),
      meta: {
        title: 'notFound',
      },
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Sift`;
  const role = localStorage.getItem('username');
  if (!role && to.path !== '/login' && to.path !== '/regist') {
    next('/login');
  }
  else
  {
    next()
  }
});
export default router
