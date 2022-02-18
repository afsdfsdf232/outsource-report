<template>
  <div class="popover-container">
    <div class="popover-item" v-for="item in list" :key="item.title">
      <el-popover :width="230" placement="left" popper-class="popper-class" trigger="hover">
        <template #reference>
          <div class="show-content">
            <img :src="item.icon" alt="" />
            <p class="title">{{ item.title }}</p>
          </div>
        </template>
        <div class="hidden-img" style="width: 200px">
          <img style="width: 200px" :src="item.url" alt="" />
        </div>
      </el-popover>
    </div>
    <div class="popover-item" @click="backTop">
      <div class="show-content white-bg">
        <img :src="topImg" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { backTop as goTop } from '@/utils/common'
const topImg: string =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA4CAYAAAChbZtkAAAAAXNSR0IArs4c6QAAApJJREFUaEPtmj9oFFEQxmf2dhcxcGCjiAhqsLAK3J8ERURstBUxgliJCFZ2Ft4SN94eFjYWClpZWchZCZYpNGoQbw9sRQJKEIJWIhr3vb1PDEq4Sy67ye175+Xelffmzcxvvpm5Kx7TkH1YJy8ALnnxXYup8TawH+qM/S+WVuBiRXggVJlZgulEs+rM6obWBlz2xKmY6BkB1h9IJl7cZtuFV9P8WSe0FuCyjwOxkA0i7GiDY54bte3jdZ8jXdDKgYs+tkOK1wQaWwuKybof1uwrWwfYix4BdH49oBxbF3UtMaUKF73oKkB3ktRj5iUwjjarbphk2+u5MuByRRxrMc0AsNMkyUyfyHaKoc9f09hv1kYJ8OEAe6KfMgRh18YS45nRMftkfZLjjd1Lb5058Fkf7ryULwBMpE9jxdJivt0InGubuZvmTubAhUr0gIgupwnezYbJmgxrdr0XH919Z+i1NCXPtOLWk55dMn93cvahN9O80LOvDgeZKlzyo3FIutSZJIjyBDrX+T0zfyPC41X2sH6NjORuzl7nL/81cLfkxj3slxDza5x/aNbcg1lDrecvU4UN8N8KGIVXWsG0tOp5NjOsosJmhs0Mq+irtX2aGVZRazPDZoZV9JWZ4eUKmKWlornM0jJLS0VfmaVllpayvjJLyywtZc21yrH546Gi1maGt/oMT9xAXkgxx8z59g7C8zBwL6joqm4+tcywTqCkWAY4qUKDfm4UHnQFk/I3CidVaNDPh09h34f1NJa3GB0PPwddyo78QfSuGbj3uFjDbvwQWp/w9qOWzLwQBs5eA9yP6uuIObwKH/Gxc0mIRR1V7msMpo/NwN23/LNUmJKnLVD78/y+Zpd9cLTwPqw5L38D8a+QSOjj0WMAAAAASUVORK5CYII='
export default defineComponent({
  setup() {
    const list = [
      {
        title: '索赔报名',
        url: require('../assets/images/qrcode-1.png'),
        icon: require('../assets/images/zxbm-icon.png')
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAAyCAYAAAATIfj2AAAAAXNSR0IArs4c6QAABHtJREFUaEPtmmnIpWMYx3//sWQba/aYSMj+QaR8kAZjmCyDmSKTGiJZPjDJ8AUlSzJhioh8QmMbMdaksUVI2UpRCiVKGDuX/qf7fXvfc577Wc55noM615fz4Vz3fV3/+7rva/mfIzqUiNgMuA04DfgMuETSux2aRF1tHhFzgbXAMTNs/ACcKOn1rux2AigitgfWAUcUOL4BWCTp5S5AtQ4oInYBngcOLnH4F+B0Sc+2DapVQBExD3gR2KeGo78DZ0l6soZubZXWAEXEfsALwB61rcOfwNmSHmmwplS1FFBEbGWDwK4VBr3PhcBOQzj2F3An8H3F2p+AxyQ5W2YlCygiNgXeBg4ZwsmulvwBHCXpnZyBMkBHA+u78myEfVdLungYQAtS6h3BdidLH5S0bAIoIiYR6uSCDW46uXK9M5lcuTHdN+B/c+VcNN8CtgQOKzmfoQGtAG4a08F/BCyW9Em67ouAx4GNCuyXzlSFnUJEuBLfAd0NgDMcfQU4VdKsXi4iHgKWZA7Ufd1CSQOdzACgiLgCuGVMkXkYWCbpt357EXE7cFmJH4WD4ixAEXEtcN2YwNwKrJAUBWC2Ad4HPF+ViQfFUyR5bOnJNKCIuBG4qiaYv4H7UvN6gMmP9JjrLPfayyX5Sg9IROwAPOWuus5mwK/p/T3TAxQRBuXwXlpzA6vZoVVT+hFxEOBxevcaJ+qBzg++CMzeqSHet4EvVvX0e6aktQZ0PXBNww3mSvLDnJaI2BN4Dtg/s9d3iRx5IwPmcODpIYdEb+m0f5wBfQs4zE1knqQv+hek62Knjuz7zlPmAkmfZsCcBDhBuAaNImsM6L2KQlZk4AngDEken2dJRGwBrDH/lr7w1HuypG8yYC4AVmdqTlNwqwzIoTbttF3D1WZrlkryo+wHtXFKGubnlkj6OQPmBmBlQ7s59dd6tcnfRsShibHZseHmr6Z3MUBwpGQzJxPFTYB7gXMb2supv5TS94aZaduP2ZxaVabq3/SD9D6+rONcRGwNPArMr6NfQ8cp3hmuV5z7C+tegNH6s4k4QZww1YvlFkbEboDrhW9EG2I+7xxJznA9KWp9HCFHKpd+c444Lfvxv5l5LwemGtOEiCwDfT+wXJIL9bTkmlO/JbcTTU/Sj9/h71XtKYkI/wLhYrptG2EB7ko/zQy0TWW8nNPuLMdqOmN69+pk1KfntOxm18RlG7JO0sLcRmWARmV9DMYnWDTTjALsAUnn/RuARnG6bO0EUO90/sOszyRCkwh19foz+w595Y5PA9uY/a00NzSgnYHPgc0rTYxX4XxJ7tQLpeo3VkfJTFBVB+7i6RF8WDEn8FXFYhdqd+krZzaj/Wva/BXc9JfBN5Uf00xlwnFkaQ1Qql2ePj2F1hV36P6rjMf0VqRVQAnUlcDNNbz7usfSSB/W0K2t0jqgBMoUrrm+nDjZzK/6z0FtFDMUOwGUQF2URoh+Gx+nyNQa2ZuC6gxQArUcuBuYkxzzHybMz5kL7EQ6BZRAHespFjDJeE8/49o2qn8AcWGdvq49oiUAAAAASUVORK5CYII=',
        title: '公众号',
        url: require('../assets/images/qrcode-2.png')
      },
      {
        icon: 'data:image/png;base64,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',
        title: '小程序',
        url: require('../assets/images/qrcode-3.png')
      },
      {
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAyCAYAAAAayliMAAAAAXNSR0IArs4c6QAABNZJREFUaEPVmkmIXUUUhr/feZ6I4IS4UKNRF8YhilEkjhEVjBEjJroIiWg2QSQOG0WMCBLcKFESMJqIrSDGETSJ4rBQnANiEgUn1KiItnGejvxN3eb1za37hu7Oe+9sHt11T9X5b51b9Z+/SoyBRcQuwDnAycAhwMHp9yDgL+A74Nv0+xWwDnhJ0p+jHV6ddhARewIXADPS7x5t9vUL8ALwNLBa0s9t+g893jaAiNgVWAjcBOzVyaAVPj8AdwL3tTsrLQOIiO2A2cDilB5jFPuIbr4AbgMelvRvKwO0BCAinNdPpBxvpd/RPvMqcJkkfzu11hRARJwEPAUc2KyzMW7/0t+XpLfr+q0FEBGXAw8Czvtu2B/AfEkrc4NnAUTE1cCKbkRdGjOAWZIer4qlEkBETAFeAXbuAQAOwTNxpqQ3y/FsBSAinOvOO29CvWTeCKdI+rwxqBEAImIH4DXglF6KvCGW94ATJf1X/K8M4Brg/h4NvghrnqTlWwGIiN2AT7qwXLb7vjYDh0v61Y7DMxARt6Rdtt0Ou/H87ZJuHQYQEfsCnwJ7dyOaDsb8zYuMpMGhGYiIucBwXnXQYTdc5khaVQAwVbi4G1GMYswnJc1Qosems92iC51i+B2YYAB+856BfrSZBnBPKlD6EcBiAxgAzDrrzBzknVTrnttium0BXgS+T3XE5BbfkGuAt4B9vOs24WMrDOBlE6VM52aCcyWZUg9ZRBwBPO/NpCagD7woSHKFVfgtAO5tAsLsd4EkL5Me66hUSE3K+K01gA+B3APLJc0rO0fE1MSZqvo16EmSNlT41c224zhe0t+NfhFxDLAecElbtg0G4CmekEF4iaTVlVFG/Jimudy8SdLEjM8c17uZse6WtCjj9xHg2SjboAHkAvHDMyW5Fh5hEeH9YxCwtFK2jZKqBnNKXAmsygC4S9LNGQC5LNlsAJ6e4zKdrpR0VQWAs4C1GR9TXafQxgq/R11dZfzeT1R5hBoREf7WnI7bV/itN4DnkjCV6ZfrJC0tGiPC34t9Dss5AObtF0r6usFvPvBAjY+bvKQvkvSP/4gIK3zeo07I+K0zAPN/1wF15iXUVZo7PBuwlNjMnJrPpGXUBdJpzRxSu2fu9UQsLVfWEcwBA3DeWRXrR7vDALxZeOPoR5tasFGLSFbf+smcovsXALxDeqfsJ3tM0qwCgD/MNf0UPXCFpIECgH/NX3L7Qa9h+xg42gp2Y1HfT3XBbEmP+K2WdSHTZh8T9bKZFx1biFtlANPS+VUvA7hI0rNFgFXa6BLg+h5FsETSDY2xVQHYMSnTp/YYCGu20wqelJ0BN6QjJROyXJ2wrbFZTpws6ZvywHUHHL2yKn0GnCdpU9Vba3bE1O1VyXvT9Ko3X5tCRWNEuHpyFdUNc8F0abMD8LoUcuFuPm95Y1vaT8CNwDJJFghqrbwPWKU+H7gWOL2Z8zi0W7VYKMnHSS1ZwYWs9SwDzujk+kFLI+Uf8gGeTyCXSnqj3b4audBOgFW36UnosrJQpcW0O0bV8y7cLSY8lK4VmNt3ZHXfwO6ARaUjkwp3aMMVmgOA/VqYLSvIXrt9xcYM0rX1u2a+ktw2amt61SA3QkRY5vBtFV+z8elmYZZVfJVmiyTfFRpX6xjAuEbVRuf/A/KFjvbjpTNCAAAAAElFTkSuQmCC',
        title: '联系客服',
        url: require('../assets/images/qrcode-4.png')
      }
    ]
    const backTop = () => {
      goTop(5)
    }
    return {
      list,
      topImg,
      backTop
    }
  }
})
</script>

<style lang="scss" scoped>
.popover-container {
  position: fixed;
  top: 50%;
  right: 0;
  z-index: 9999;
  .popover-item {
    margin-top: 10px;
  }
  .popper-clas {
    border: 1px solid red;
  }
  .show-content {
    width: 56px;
    height: 56px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #327bfa;
    border-radius: 2px 0 0 2px;
    z-index: 100;
    cursor: pointer;
    img {
      width: 26px;
    }
    p {
      width: 56px;
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #fff;
    }
  }
  .white-bg {
    background-color: #fff !important;
  }
}
</style>
