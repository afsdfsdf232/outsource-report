<template>
  <div class="home" style="min-width:1200px">
    <div class="header-container">
      <div class="search-title">
        <img src="./../../assets/images/logo.png" alt="" />
      </div>
      <p class="sub-title">
        信披研究，个股风险，违规线索，投资维权，政策法规，投资者咨询
      </p>
      <div class="search-container">
        <div class="search-input">
        <input
          class="input"
          type="text"
          v-model.trim="inputValue"
          placeholder="搜索关键词、行业、公司等…（多个关键词可用空格分开）"
        />
        <span class="search-btn" @click="search('input')">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            viewBox="0 0 32 32"
          >
            <path
              d="M29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29zM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9z"
              fill="currentColor"
            ></path>
          </svg>
        </span>
        </div>
      </div>
      <p class="search-hot" v-if="hotWordsList.length>0">
        <span>热门搜索：</span>
        <span class="hover" @click="search('hot', item.hotWord)" v-for="item in hotWordsList" :key="item.hotWord">{{item.hotWord}}</span>
      </p>
    </div>
    <div class="card-box" v-loading="loading">
      <div class="content bg-white">
        <card type="hot" :list="hotCardList"/>
        <card type="week" :list="weekCardList"/>
        <card type="month" :list="monthCardList"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { getHomeArticleList, getHotWordsList } from '@/api/index'
import Card from './components/Card.vue'
import { CardProps, HotWordsProps, searchTyps } from './common'

export default defineComponent({
  name: 'Home',
  components: {
    card: Card
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    // 输入框搜索内容
    const inputValue: Ref<string> = ref('')
    // 卡片列表加载
    const loading: Ref<boolean> = ref(false)
    // 热门关注列表
    const hotCardList: Ref<Array<CardProps>> = ref([])
    // 周排行榜列表
    const weekCardList: Ref<Array<CardProps>> = ref([])
    // 月排行榜列表
    const monthCardList: Ref<Array<CardProps>> = ref([])
    // 热门搜索词列表
    const hotWordsList: Ref<Array<HotWordsProps>> = ref([])

    const getArticleList = async () => {
      loading.value = true
      try {
        const { code, data } = await getHomeArticleList()
        console.log('code:', code)
        if (code === 200) {
          const { hotList, weekList, monthList } = data
          hotCardList.value = hotList
          weekCardList.value = weekList
          monthCardList.value = monthList
          console.log(hotCardList, weekCardList, monthCardList, '--list')
        }
        console.log('list:', data)
      } catch (err) {
        console.log('err:', err)
      }
      loading.value = false
    }
    const getHotWords = async () => {
      try {
        const { code, data } = await getHotWordsList()
        if (code === 200) {
          hotWordsList.value = data
        }
      } catch (err) {
        console.log(err)
      }
    }
    const search = (type: searchTyps, query?: string):void => {
      let params = query
      if (type === 'input') params = inputValue.value
      router.push({
        name: 'Search',
        query: {
          query: params
        }
      })
    }
    onMounted(() => {
      getArticleList()
      getHotWords()
    })
    // 设置标题
    watch(() => store.state.configInfo, val => {
      if (val.topTitle1) document.title = val.topTitle1
    }, {
      immediate: true,
      deep: true
    })
    return {
      hotCardList,
      weekCardList,
      monthCardList,
      hotWordsList,
      inputValue,
      search,
      loading
    }
  }
})
</script>
<style lang="scss" scoped>
.home {
  .header-container {
    width: 100%;
    height: 400px;
    padding-top: 70px;
    background-image: url("../../assets/images/search-bg.png");
    background-repeat: no-repeat;
    background-size: cover;
    .search-title {
      height: 60px;
      text-align: center;
      img {
        height: 60px;
      }
    }
    .sub-title {
      margin: 26px 0;
      color: #fff;
      font-weight: 700;
      line-height: 33px;
      letter-spacing: 3px;
      text-align: center;
    }
    .search-container {
      width: 100%;
      display: flex;
      justify-content: center;
    }
    .search-input {
      margin: auto 0;
      display: flex;
      align-items: center;
      .input {
        width: 700px;
        height: 50px;
        box-sizing: border-box;
        padding: 0 15px;
        border-radius: 4px 0 0 4px;
        font-size: 14px;
        line-height: 14px;
        border: none;
        border-color: #a8b4bf;
        &:focus{
          border: none;
          outline: none
        }
      }
      .search-btn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        border-radius: 0 4px 4px 0;
        width: 80px;
        height: 50px;
        color: #fff;
        cursor: pointer;
        background-color: #327bfa;
        svg {
          width: 32px;
          height: 32px;
        }
      }
    }
    .search-hot {
      padding-top: 26px;
      text-align: center;
      color: #fff;
      .hover:hover {
        color: #327bfa;
      }
      span {
        margin-right: 30px;
        cursor: pointer;
      }
    }
  }
  .card-box {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .content {
    width: 100%;
    max-width: 1200px;
    padding: 60px 0;
    display: flex;
    justify-content: space-between;
  }
  .bg-white {
    background-color: #fff;
  }
}
</style>
