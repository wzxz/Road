import {
  // 创建路由
  createRouter,
  // 路由模块，它相当于 hash 模式
  createWebHistory,
} from "vue-router";
// import Test from '@/view/Test'

const routes = [
  {
    path: "/",
    component: () => import("@/view/Main.vue"),
    redirect:'/home',
    children: [
      {
        path: "home",
        component:()=>import('@/view/Home.vue')
      },
    ],
  },
  {
    path: "/test",
    component: () => import("@/view/Test.vue"),
  },
];

// 创建路由
const router = createRouter({
  // 路由模式
  history: createWebHistory(),
  // 路由地址
  routes,
});

export default router;
