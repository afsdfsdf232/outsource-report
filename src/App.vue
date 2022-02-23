<template>
    <router-view/>
</template>
<script lang="ts">
import { getOtherInfo } from '@/api/index'
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  setup () {
    const store = useStore()
    const getOtherConfigInfo = async () => {
      const { code, data } = await getOtherInfo()
      if (code === 200) {
        // 设置默认标题
        if (!data.topTitle1) data.topTitle1 = '默认标题1'
        if (!data.topTitle2) data.topTitle2 = '默认标题2'
        if (!data.topTitle3) data.topTitle3 = '默认标题3'
        store.commit('SET_CONFIG_INFO', data)
      }
      console.log('config-data:', data)
    }
    const href: string = 'http://www.smsoftware.cn/'
    const os = () => {
      var ua = navigator.userAgent
      var isWindowsPhone = /(?:Windows Phone)/.test(ua)
      var isSymbian = /(?:SymbianOS)/.test(ua) || isWindowsPhone
      var isAndroid = /(?:Android)/.test(ua)
      var isFireFox = /(?:Firefox)/.test(ua)
      var isTablet =
          /(?:iPad|PlayBook)/.test(ua) ||
          (isAndroid && !/(?:Mobile)/.test(ua)) ||
          (isFireFox && /(?:Tablet)/.test(ua))
      var isPhone = /(?:iPhone)/.test(ua) && !isTablet
      var isPc = !isPhone && !isAndroid && !isSymbian
      if (isAndroid || isPhone) {
        window.location.href = href
      } else if (isTablet) {
        window.location.href = href
      } else if (isPc) {
        console.log('当前设备-电脑')
      }
    }
    window.onresize = () => os()
    os()
    onMounted(() => {
      getOtherConfigInfo()
    })
    return {

    }
  }
})
</script>
<style lang="scss">
html, body, div,p {
  margin: 0;
  box-sizing: border-box;
  padding: 0;
}
</style>
