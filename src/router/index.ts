import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'
import Home from '@/views/home/index.vue'
import Search from '@/views/search/index.vue'
import LayOut from '@/Layout/index.vue'
import Data from '@/views/data/index.vue'
import VentureCapital from '@/views/ventureCapital/index.vue'
import Group from '@/views/group/index.vue'
import Vip from '@/views/vip/index.vue'
import Consulting from '@/views/consulting/index.vue'
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
          title: '易索515_投资者315_一起索赔 - 易索资讯',
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
          title: '易索515_投资者315_一起索赔 - 易索资讯',
          customerTitle: 'topTitle1',
          isNav: true
        },
        component: Search
      },
      {
        path: 'data',
        name: 'Data',
        meta: {
          title: '易索515_投资者315_一起索赔 - 易索资讯',
          isNav: true,
          icon: 'data',
          width: 28,
          customerTitle: 'topTitle3'
        },
        component: Data
      }
    ]
  },
  {
    path: '/ventureCapital',
    name: 'VentureCapital',
    meta: {
      title: '易索515_投资者315_一起索赔 - 易索资讯',
      isNav: false,
      icon: 'ventureCapital',
      width: 28
    },
    component: VentureCapital
  },
  {
    path: '/group',
    name: 'Group',
    meta: {
      title: '易索515_投资者315_一起索赔 - 易索资讯',
      isNav: false,
      icon: 'group',
      width: 28
    },
    component: Group
  },
  {
    path: '/vip',
    name: 'Vip',
    meta: {
      title: '易索515_投资者315_一起索赔 - 易索资讯',
      isNav: false
    },
    component: Vip
  },
  {
    path: '/consulting',
    name: 'Consulting',
    meta: {
      title: '易索515_投资者315_一起索赔 - 易索资讯',
      isNav: false,
      icon: 'ventureCapital',
      width: 28
    },
    component: Consulting
  },
  {
    path: '/detail',
    name: 'Detail',
    meta: {
      title: '易索515_投资者315_一起索赔 - 易索资讯'
    },
    component: () =>
      import(/* webpackChunkName: "detail" */ '@/views/detail/index.vue')
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
