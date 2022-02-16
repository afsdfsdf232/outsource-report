<template>
  <div class="main-container">
    <div id="nav">
      <my-header :routers="routers" />
    </div>
    <div class="main">
      <router-view />
    </div>
    <my-footer />
  </div>
  <my-popover/>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'
import Header from '@/Layout/header.vue'
import Footer from '@/Layout/footer.vue'
import Popover from '@/components/Popover.vue'
const filterRouters = (routers: Array<RouteRecordRaw>) =>
  routers.filter((route: RouteRecordRaw) => route.meta?.isNav)
export default defineComponent({
  name: 'Main',
  components: {
    'my-header': Header,
    'my-footer': Footer,
    'my-popover': Popover
  },
  setup() {
    const router = useRouter()
    const routers = computed(() => filterRouters(router.options.routes[0].children as Array<RouteRecordRaw>))
    return {
      routers
    }
  }
})
</script>

<style lang="scss" scoped>
.main-container {
  .main {
    margin-top: 34px;
    min-height: 410px;
  }
}
</style>
