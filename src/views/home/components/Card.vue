<template>
  <div class="card-contaoner">
    <div class="card-title">
      <img
        src="../../../assets/images/hot-card.png"
        v-if="type === 'hot'"
        alt=""
      />
      <img
        src="../../../assets/images/week-card.png"
        v-if="type === 'week'"
        alt=""
      />
      <img
        src="../../../assets/images/month-card.png"
        v-if="type === 'month'"
        alt=""
      />
    </div>
    <div class="card-list">
      <div
        @click="handelClick(item.articleId)"
        class="card-item"
        :class="{ bborder: index !== cardList.length - 1 }"
        v-for="(item, index) in cardList"
        :key="item.articleId"
      >
        <div class="no" :class="['icon-' + (index + 1)]">
          {{ index + 1 > 3 ? index + 1 : '' }}
        </div>
        <div class="info">
          <div class="info-title">{{ item.title }}</div>
          <div class="info-desc flexr0c">
            <span class="time">{{ item.time }}</span>
            <div class="resource">
              <div data-index="0" class="overflowtxt">{{ item.author }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { CardProps } from '../common'

export default defineComponent({
  props: {
    type: {
      type: String,
      default: 'hot'
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const router = useRouter()
    const cardList: Ref<Array<CardProps>> = ref([])
    watch(() => props.list,
      newval => {
        cardList.value = newval as Array<CardProps>
      },
      {
        immediate: true,
        deep: true
      }
    )
    const handelClick = (articleId: string) => router.push({ name: 'Detail', query: { articleId } })
    return {
      cardList,
      handelClick
    }
  }
})
</script>

<style lang="scss" scoped>
.card-contaoner {
  width: 370px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  border-radius: 4px;
  border: 1px solid #ebeef5;
  background-color: #fff;
  overflow: hidden;
  color: #303133;
  transition: 0.3s;
  .card-title {
    height: 100px;
    img {
      width: 100%;
      height: 100px;
    }
  }
  .card-list {
    overflow-y: auto;
    .bborder {
      border-bottom: 1px solid #eef2f6;
    }
    .card-item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin: 14px 20px;
      font-size: 16px;
      color: #202a33;
      overflow: hidden;
      cursor: pointer;
      .no {
        flex: none;
        width: 26px;
        height: 26px;
        margin-right: 12px;
        font-size: 16px;
        color: #327bfa;
        text-align: center;
        line-height: 26px;
      }
      .icon-1 {
        background: url(data:image/png;base64,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)
          no-repeat 50%;
        background-size: 26px 26px;
      }
      .icon-2 {
        background: url(data:image/png;base64,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)
          no-repeat 50%;
        background-size: 26px 26px;
      }
      .icon-3 {
        background: url(data:image/png;base64,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)
          no-repeat 50%;
        background-size: 26px 26px;
      }
      .info {
        flex: 1;
        max-width: 290px;
        .info-title {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          &:hover {
            color: #327bfa;
          }
        }
        .info-desc {
          padding: 14px 0;
          font-size: 12px;
          display: flex;
          flex-direction: row;
          align-items: center;
          color: #a8b4bf;
          .resource {
            &:hover {
              color: #327bfa;
            }
          }
        }
      }
    }
  }
}
</style>
