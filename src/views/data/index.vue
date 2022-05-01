<template>
  <div class="search-container" style="min-width: 1000px">
    <div class="search">
      <div class="search-detail">
        <div style="display: flex; align-items: center">
          <div class="search-logo">
            <img src="../../assets/images/search-logo.png" alt="" />
          </div>
          <div class="search-input" style="margin-left: 10px">
            <el-input
              v-model="inputValue"
              size="large"
              class="input"
              clearable
              placeholder="搜索关键词、行业、公司等…（多个关键词可用空格分开）"
            >
              <template #append>
                <el-button @click="search('input')" :icon="Search"></el-button>
              </template>
            </el-input>
          </div>
        </div>
        <div class="search-hot" v-if="hotWordsList.length > 0">
          <span class="tip">热门搜索：</span>
          <span
            class="hover"
            @click="search('hot', item.hotWord)"
            v-for="item in hotWordsList"
            :key="item.hotWord"
            >{{ item.hotWord }}</span
          >
        </div>
      </div>
    </div>
    <div class="filter-detail" v-if="false">
      <div class="filter-content">
        <div class="filter-item">
          <div class="filter-label">
            <span>
              <img :src="TYPE_ICON" alt="" />
              数据类型
            </span>
          </div>
          <div class="filter-options">
            <n-checkbox-group v-model:value="dataTypes">
              <n-space item-style="display: flex;" align="center">
                <n-checkbox value="1" label="产业概述" />
                <n-checkbox value="2" label="市场容量" />
                <n-checkbox value="3" label="产业链" />
                <n-checkbox value="4" label="竞争格局" />
                <n-checkbox value="5" label="技术变革" />
                <n-checkbox value="6" label="政策法规" />
                <n-checkbox value="7" label="商业模式" />
                <n-checkbox value="8" label="行业数据" />
              </n-space>
            </n-checkbox-group>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-label">
            <span>
              <img :src="CLASS_ICON" alt="" />
              行业分类
            </span>
          </div>
          <div class="filter-options">
            <n-checkbox-group v-model:value="industryClassification">
              <n-space item-style="display: flex;" align="center">
                <n-checkbox value="1" label="科技传媒" />
                <n-checkbox value="2" label="大消费" />
                <n-checkbox value="3" label="健康医疗" />
                <n-checkbox value="4" label="金融地产" />
                <n-checkbox value="5" label="能源矿产" />
                <n-checkbox value="6" label="工业制造" />
                <n-checkbox value="7" label="交通物流" />
                <n-checkbox value="8" label="公共服务" />
                <n-checkbox value="9" label="农林牧渔" />
                <n-checkbox value="10" label="综合其他" />
              </n-space>
            </n-checkbox-group>
          </div>
        </div>
        <div class="filter-item">
          <div class="filter-label">
            <span>
              <img :src="GD_ICON" alt="" />
              更多筛选
            </span>
          </div>
          <div class="filter-options time">
            <span>发布时间：</span>
            <n-date-picker
              style="margin-right: 10px"
              v-model:value="filterTime"
              type="daterange"
              clearable
            />
            <n-button ghost size="small"> 近三天 </n-button>
            <n-button ghost size="small" style="margin: 0 10px">
              近一周
            </n-button>
            <n-button ghost size="small"> 近一个月 </n-button>
          </div>
        </div>
      </div>
    </div>
    <div class="content-list" v-loading="loading">
      <img v-if="url" :src="url" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { Search } from '@element-plus/icons-vue'
import { defineComponent, ref, reactive, onMounted, Ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { icons } from '../search/common'
import { searchTyps } from '../home/common'
import { getDataImage, getHotWordsList } from '@/api/index'
export default defineComponent({
  name: 'search',
  setup() {
    const store = useStore()
    const router = useRouter()
    const page = ref(2)
    const url: Ref<string> = ref('')
    const reportPage = ref('')
    const filterTime = ref('')
    const dataTypes = reactive([])
    const featureLabels = reactive([])
    const industryClassification = reactive([])
    const loading: Ref<boolean> = ref(false)
    // 热门词语列表
    const hotWordsList = ref([])
    const getImg = async () => {
      loading.value = true
      const { code, data } = await getDataImage()
      if (code === 200) {
        url.value = data.url
      }
      loading.value = false
    }
    // 获取热门词列表
    const getHotWords = async () => {
      try {
        const { code, data } = await getHotWordsList()
        if (code === 200) {
          hotWordsList.value = data
        }
      } catch (err) {
        throw Error(err as string)
      }
    }
    // 输入框搜索内容
    const inputValue: Ref<string> = ref('')
    onMounted(() => {
      getImg()
      getHotWords()
    })
    const search = (type: searchTyps, query?: string): void => {
      let params = query
      if (type === 'input') params = inputValue.value
      router.push({
        name: 'Search',
        query: {
          query: params
        }
      })
    }
    watch(
      () => store.state.configInfo,
      (val) => {
        if (val.topTitle1) document.title = val.topTitle3
      },
      {
        immediate: true,
        deep: true
      }
    )
    return {
      ...icons,
      page,
      dataTypes,
      featureLabels,
      industryClassification,
      filterTime,
      reportPage,
      url,
      hotWordsList,
      inputValue,
      search,
      loading,
      Search
    }
  }
})
</script>

<style lang="scss" scoped>
.search-container {
  background-color: #f5f7f9;
  .search {
    display: flex;
    justify-content: space-between;
    background-color: #0e273e;
  }
  .search-detail {
    margin: 0 auto;
    width: 100%;
    max-width: 1200px;
    height: 68px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .search-logo {
      cursor: pointer;
      width: 222px;
      height: 40px;
      img {
        width: 222px;
        height: 40px;
      }
    }
    .search-input {
      width: 455px;
      .search-btn {
        display: inline-flex;
        align-items: center;
        width: 40px;
        height: 40px;
        border-radius: 0 4px 4px 0;
        background-color: #fff;
        cursor: pointer;
        .search-icon {
          display: inline-block;
          width: 28px;
          height: 28px;
          background: url(data:image/png;base64,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)
            no-repeat 50%;
          background-size: 28px 28px;
        }
      }
    }
    .search-hot {
      margin-left: 20px;
      text-align: center;
      color: #fff;
      .tip {
        font-size: 14px;
        margin-right: 0;
        cursor: inherit;
      }
      span {
        font-size: 14px;
        margin-right: 20px;
        cursor: pointer;
      }
    }
  }
  .content-list {
    margin: 20px 0;
    text-align: center;
  }
  .filter-detail {
    margin: 20px auto;
    width: 1200px;
    max-width: 1200px;
    background: #fff;
    border-radius: 2px;
    .filter-content {
      padding: 20px;
      .filter-item {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #eaf1fe;
        border-left: 1px solid rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        color: #202a33;
        &:first-child {
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }
        .filter-label {
          width: 120px;
          text-align: center;
          img {
            width: 20px;
            margin-right: 5px;
            vertical-align: middle;
          }
        }
        .filter-options {
          position: relative;
          padding: 8px 15px;
          flex: 1;
          border: 1px solid rgba(0, 0, 0, 0.1);
          border-bottom: none;
          border-top: none;
          background: #fff;
        }
      }
    }
    .time {
      display: flex;
      align-items: center;
    }
  }
  .flexr0c {
    align-items: center;
  }
  .flexr0c,
  .flexras {
    display: flex;
    flex-direction: row;
  }
  .overflowtxt {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .flexrcc {
    justify-content: center;
  }
  .middle-icon {
    margin: 0 8px 0 10px;
  }
  .hover:hover {
    color: #327bfa !important;
  }
}
</style>
