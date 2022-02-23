<template>
  <div class="header-content">
    <div class="content">
      <div class="header-nav">
        <router-link
          class="router-link"
          v-for="(route, index) in routers"
          :key="route.path"
          :to="route.path"
        >
          <img class="img" :style="{width: route.meta.width + 'px'}" :src="icons[route.meta.icon]" alt="" v-if="route.meta && route.meta.icon && route.meta.before" />
          <span>{{ headerInfo['topTitle'+(index+1)] || "配置标题"+(index+1) }}</span>
          <img class="img" :style="{width: route.meta.width + 'px'}" :src="icons[route.meta.icon]" alt="" v-if="route.meta && route.meta.icon && !route.meta.before" />
        </router-link>
      </div>
      <!-- <div class="user-login"><span>登录</span>|<span>注册</span></div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
const icons = {
  home: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAAAXNSR0IArs4c6QAAA0lJREFUSA3tVl2ITVEUXuvcfa6fScILChme/JTmzA/zgyTRzJRCFA8SGTVl4oHce82puWMSEcnPpDzR1GTywpOXKT+5P4onXigeZKJkuMw9+5xlbTqnfXPn3nNdT7Ifzl5n/XzfXuvsvfYB+NcHVpLgepvEuCt7gWA/x0kEOpdJRs9XghGacI1Ns/NSDhPRBgD8igjI8nSehsEUe7M25sIQG2GcmmxalpdO6icZ4mhNjVgspolaRHxIQDtIOo+aY7QoDFbZDOvisoNTucXAMxCNK7Agcjh7EB0Fbl0jE964Fwm8Lib/YCBsT/eZo6WISxJacecYAZxCApcM6n7aFx0sBsaLOgBAl9gPwaCebF/0cjE/pStKyJtj6rh0rhPBbkAcY6Bt2X7zwWQgSt+YcNa4HtzmSszj10FcaHb7ldDjfiNssWn+NynvAFEDG58aYG5N9+NbPWgy2epnspwcYdLVXOIHU4TY9sjGMd2/YNPU2/lGJksrMs59KDrHbA1LpkCzMXxXa4p1vFCuDrVOSCdj2VSnEwYZ1ifkLna6wd8sysoT2aR5WnesVLbi+UNAeIHjpIG4J50UIwojyJDJzvCBnjAAO6slU8DZZPQKT3xm4bMH1KN0agSEQoh20xSrMklx75ep+qfaaDNMsZSxO3y0oKRK0TpAs3Jf5E1h0smUHc34Tn8yNyRouUvyLE4T+9S39TGCDJUil5Mr+Dxt8RxUpahqeOC08ebbTN9cSwcqIIx4xc+lHlCtLCoFsOK0BMHZ6PFVEYmY99M2vqoEoyDDcoHc6o7yLn/hEVwFD655Ur60Ys7xcnG6PTShlaCV3OrU0cmAYezkRt3F3/std5UBK5Fv0kFLyaFLiuQ0c1PAiIFHUn3isQJtiMlPLnhD4GEbvz4pReTbQmfI28lUQW5ETPjBFIHvSlbdydeVm8MTlkMKaS8sqSE+gudwhaC9LpHP6xgeqbJxLkUG/260sH/QvpQLebhJ+UfQe6+HFHQaZaiL54fYb6fupMsCzdpUEl8rXUPMWesCjep2Xeb/nbvcKjv5qgpW+huhCqi3aQVKOVcPVrIhxNgTG5/7em742HjSqedbYaavC2YhPqR64ZlOFtj+C3+zAj8AeMg+un+v/UEAAAAASUVORK5CYII=',
  data: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAYCAYAAACvKj4oAAAAAXNSR0IArs4c6QAABOtJREFUWEfdmH9MVWUYx7/Pec8lUNEoLcFKpCT7tSnQdKZZ05YJWqJr4MwCMXM4y5nRBg1Y+UdQM5AGTZRSENJlswR/JC2FtDKsVQQaBlNTCH9gV5C455ynvRzuhQv3XlDRJu9fZ3vP8z7v5/l9DsHDmpjCd9k027NgCifwvUwUAOYhnmSu+x7RJWI+zaDjIC62qJYd36fQKXd6ydXGYykc0GqzpQIUw2Bx3S99DQoIpAOc522xJH+bQqe7H9UDMCxJm8PM+Qz2vQa9N1yUQFYiWvjjO+oXXZU7AYa+1baCmdaCWbnhN+wPhUQGEa+seNsr036cA1B6zgB/ftPCOYjIUEBz7Z5sBzRzTqu+2cLSfWEhq7dFHSdzsh0wNLFtPQNx3QVuHQQkRAjcM7wzkhlAcyvjaD1jy0ED9U2dUlOCCS89rsDHq2ftYgb2VRrILzeQOk8gcITL+tZ+mLWVkbHbQNVpqQ0QCpAeLRAyhrCpzMDG/UavAU1AbsUaryUkW4Fm0+pcVcvZIYSUSBWazjjTBBABtw+BA+BCMyMqS8NZq6lv3YsCk8cquNzGaP7X+Q4SsLTSQHapgaJ4Ff5+7gGlfPJnOkorTcA5IYTkSLX92TAYcz/QcOq8Z0ZZXVWLGkghSW3xYGS5ej1qkoLVEQINFxmz0jXHKw8EED5eKqAKQuYeHZ+UmRb9KFYgLEhB4SEd7xV7trL0ilyLpylYOl2gpoGx4ENTh95NdPMygQdHKahr5HbPbyrTkbGndy+CsJxCEm0lAD9zJYDy3aLlKsaOJKRs1/DlEdPSVwJo1xf3hIJlMwT+qDejofsKugPYtsKCphbGm0U6cmJVnLvEmJWmQeuVkXZRaGLbUQaCPQGetTJe3mAq9/UmTL2fEPekQOM/ptXPN5vSdsCvfzew9Ttn7Zda4ciprrp6A3z1aQWLpgpsP2xgzQ4dJatV3DmMsKpAwzdVpmHdLQKOUUiSzepu/LKHqKsDbBpjYbaGmobOXTugO4VvFGqOvOqLB2UYS6DhvoRXNmo4/CfjtZkKXpgicKDawMp83SMg5FjXF0CZ9Pt+M6012Bt45G7CCF9Co5WRuFVHRa1ziB5vYPxy0tm61suMzeWGw9t9AZRVOWORChlBM9M0yEI1zh8oiLdAN8y6YC9wLkklYF9CtHuRkYelRQtMf0jBkVoDSzaYluzvHHw3SmDGwwpkta7uaBlSz6T7CESErL068g64T0QzRK+yyNhLt7Tk5FQNmt6/gEN9gL0JKiyq+3Zy4qzZMjxk4a6rahO3DQbSFwiMH62g9m/G/ExTSX968PmJChJmi/bwXLzeGSLAj5AdY/bFuFwNP9W5KTayTXhq9JFhChKfE7DpjJp6006DbgFGd5ls0nbq+LSjYnZt9C1tPe3660nGqgLnwhA7TUH8UwLHzjCiO/qglMyNE5gQqGDLQR3vl/QMw8J4FcH+hPxyHWt399x3NHp5mLtRbZSfnE5UJyA5ScjLnzjHKDpkoPjnTuuFjye8Hi4w1Md1WFX9xViUo8HoYvDQMYScGIFtPxhI29l5UWmsR4MI8zNcTy0REwip81Tk7deR9ZUrwI5RTQL+38O232DgQkcvtftdIUDmYVOL+wwbOQyov9hzX34bOg3b8pUB/blkt8GA/uC1Qw7oXxZ2yAH906lryg6E34b/AdhOrvdKTnNDAAAAAElFTkSuQmCC',
  ventureCapital: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAAYCAYAAACvKj4oAAAAAXNSR0IArs4c6QAABX9JREFUWEfdWHtQVFUY/527yyLyRuWxgrogBiKajxEacjS1ECkUGjJHzTG1sZFsbJoGq+lhM07NNJlW5qSTqaBFloIDmpCCjoqW5abAkogsyLrBgiy7Iiy79zTn5F131V1WTWfk/LV3z3e+7/c73/NeAjcrSZ0XCYI5ANIppTGEECWl1M/dmQe9RwgxU0p1hJCLAIpBUXhq3MLLruySO22kaHYre3vFD4lIl1BQ2YMGfT/6CYiNCmSbl5fw/vG4+bpbdd1GMFm9M4MS5FEK//sx/LDPEgIToVhYOW5RkaNtJ4LJ5/JXiVRcDwrhYQP8X+wRiAIRVlcmLtgo6bMTZJ4TCfY+suRuMhIFikzJk5wgyzmrxap51MLSZWEhMMkV8jiWk5zg5HP5WyCKy9yFyVMBUVgTmYxyYyPWNZ9yEh0oyLEjNh1lHQ3Y/I+a76X4D8VLoQnwEeS3qRUpxWFjI3a0VmGjagYURMCr9aWgNySZvvWq6Yjw8sV7Tcdx9lqLXceysLHICI7ByvoyNFlMriELwtbTiQuWE94KgIa+quUnw6diWmAUV/iu9hhKjVq78gm+Yfg65mk09nQiu/a/HP9cNR1P+CvRK9rQQ21OQBiRwx1afNx8GuVjXoS3IMPSuoM432XgcpkhsciNTOK/K006vH7psP18SfzzGOTlgzcbynGs02V3AKuuAEaQpL/yVlJKv+wrySXATK7d2o15tUXotFn4sUl+4fgqeiaae0zIqi3k/22KnomJfuH4waDBZ7rfXarfGpOKRN8h+OLKH8hrreZyn46YhikBkWCetlIRM6sK+CUpFX7YGzeXy6RX/wSD9bpb2ISQHEawhFKa5inBHtHGb7y4/SLWXj553wRzwsdjUWgCjhgbkas9CgEEpQnZUBAZTpp0mBoYhZz6Mvxm1uOZoBH4aNiTThfpDjch5ACZrN5ZC2CUpwR3tdZgTshI+Mq88Fp9GU6b9W49yIAXGJiJm8tks+BC91X+B/MU81hLbxeeq/kZo30GYVtsGs6Y9Sjt0PJQ3d5yHpv0Z/GGchLmDY5D8dV6rG060Rdktv8386DJk/FLCtENujMQQbFaOQnNFjPm1+7nIeYqRF2hyG2owJHOJgTIFDg0OhuEEE5wVpAKKyPG4xu9Goc6GrAnbg6qugx4ue4gvh05CwkDB2Pd5UoUttf1SZCNdfdE8HuDBttjZ2OUTzDyW6txwqRzSbCh24iq621OYMw2C75rOc9zma3do55F9IAgrNEexdyQWCT5R+CVul+g7mpFcXwWguUDeM7tj8+ClyDDC7VF0PZ0ekbwbkOUeXCXoQaJAwdjS0wq9+ZmvZrf+r0UGYYyd2gSMgfFosCgQUbISA58RlUBLzBro1KQGqziYbo4dAw6rN1Ird7TJ7kbAjxE76rISASZgrcjk3k+dotWDBDk90wwLUiFD4algHnWT6bAKdMVrLr0K8fI9DM70l6FsQlvaSs8IsiLzN22CUeCgTJv/PhYBgLl3twgy8kszT7+29M2wWRZQ98Xn2kHvenKn9jeWsWfoxT+PA+ltVF3BvmGGk8J5njc6B2LDAtRabGQeicymT86NvoNqulI9lfymzdae5wAsUbPCgebUqRVFJeJMIUvf1x8oQSa6+32Pdb7WA+8054rpvZGzwQ8GdWWh43F0tBErKgvdRqd2Pl1w6ZgRtBwFLZdsI9xs4OjsTpiIgJuePdWIDVdbbwyshxma0noGKwIf5xPM2yqcVyLhoxGTsQEaLrasLjugEfegzSqMWlPh+1gmTeu2py9IVljN6yzmD0z7kKKhaq+95p9JnUUGyL3QZu1234h7gyxd0OnYZsJ9+vXJek2+vULr51kf/5kIZHs1x+dHJO3P3w2/BdHc9YDp9Vn1gAAAABJRU5ErkJggg=='
}
export default defineComponent({
  props: {
    routers: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const store = useStore()
    const headerInfo = computed(() => store.state.configInfo)
    return {
      icons,
      headerInfo
    }
  }
})
</script>
<style lang="scss" scoped>
.header-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  margin: 0 auto;
  min-width: 1050px;
  height: 34px;
  line-height: 34px;
  font-size: 12px;
  color: #202a33;
  background-color: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 100;
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    max-width: 1200px;
  }
  .router-link {
    display: inline-flex;
    align-items: center;
    font-size: 14px;
    margin-right: 40px;
    text-decoration: none;
    color: #202a33;
    cursor: pointer;
    .img {
      margin:0 5px;
    }
  }
  .router-link-active {
    color: #327bfa;
    font-weight: 700;
  }
  .user-login {
    font-size: 14px;
    cursor: pointer;
    color: #327bfa;
  }
}
</style>
