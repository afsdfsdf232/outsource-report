import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import LayOut from '@/Layout/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'LayOut',
    redirect: '/home',
    component: LayOut,
    children: [
      {
        path: 'home',
        name: 'Home',
        meta: {
          title: '回到首页',
          icon: 'home',
          before: true,
          isNav: true,
          width: 16,
          customerTitle: 'topTitle1'
        },
        component: Home
      },
      {
        path: 'search',
        name: 'Search',
        meta: {
          title: '易所咨询',
          customerTitle: 'topTitle1',
          isNav: true
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/search/index.vue')
      },
      {
        path: 'data',
        name: 'Data',
        meta: {
          title: '合作律师',
          isNav: true,
          icon: 'data',
          width: 28,
          customerTitle: 'topTitle3'
        },
        component: () => import(/* webpackChunkName: "about" */ '@/views/data/index.vue')
      }
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   meta: {
  //     title: '回到首页',
  //     icon: 'home',
  //     before: true,
  //     isNav: true,
  //     width: 16
  //   },
  //   component: Home
  // },
  // {
  //   path: '/search',
  //   name: 'Search',
  //   meta: {
  //     title: '高级搜索',
  //     isNav: true
  //   },
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/search/index.vue')
  // },
  // {
  //   path: '/data',
  //   name: 'Data',
  //   meta: {
  //     title: '洞见数据',
  //     isNav: true,
  //     icon: 'data',
  //     width: 28
  //   },
  //   component: () => import(/* webpackChunkName: "about" */ '@/views/data/index.vue')
  // },
  {
    path: '/ventureCapital',
    name: 'VentureCapital',
    meta: {
      title: '创投信息',
      isNav: false,
      icon: 'ventureCapital',
      width: 28
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/ventureCapital/index.vue')
  },
  {
    path: '/group',
    name: 'Group',
    meta: {
      title: '洞见圈社群',
      isNav: false,
      icon: 'group',
      width: 28
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/group/index.vue')
  },
  {
    path: '/vip',
    name: 'Vip',
    meta: {
      title: 'VIP权益',
      isNav: false
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/vip/index.vue')
  },
  {
    path: '/consulting',
    name: 'Consulting',
    meta: {
      title: '咨询研究',
      isNav: false,
      icon: 'ventureCapital',
      width: 28
    },
    component: () => import(/* webpackChunkName: "about" */ '@/views/consulting/index.vue')
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {
      title: '预览详情'
    },
    component: () => import('@/views/detail/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title as string
  }
})
export default router
