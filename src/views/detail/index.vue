<template>
<div style="min-width:1200px">
  <div class="search-container" v-loading="loading">
    <div class="search">
      <div class="search-detail">
        <div class="search-logo">
          <img src="../../assets/images/pdf-logo.png" alt="" />
          <div class="search-tps">
            <p class="title">【{{detail.belong}}】{{detail.title}}</p>
            <p class="info">
              <span class="left1">{{detail.time}}</span> <span>{{detail.belong}}{{detail.size}}M·{{detail.pages}}页</span>
            </p>
          </div>
        </div>
        <el-button type="primary" @click="downBtn">
          <span class="item">下载</span>
          <img class="item img" v-if="detail.pdf" :src="PDF" alt="">
          <img class="item img" v-if="detail.ppt" :src="PPT" alt="">
          <img class="item img" v-if="detail.word" :src="WORD" alt="">
        </el-button>
      </div>
    </div>
    <div class="pdf-content" v-if="detail.pdf">
      <iframe id="pdfPlayer" frameborder="0" width="100%" :src="detail.pdf"></iframe>
    </div>
  </div>
    <el-dialog v-model="uploadModel">
      <div class="dialog-header">
        <p class="title">{{detail.title}}</p>
        <div class="sub-title">
          <div class="state state1" v-show="detail.industry"> {{detail.industry}} </div>
          <div class="state state1"> {{detail.pages || 0}}页·{{detail.size || 0}}M </div>
          <div class="date" v-show="detail.time">{{detail.time}}</div>
          <div class="org" v-show="detail.belong">{{detail.belong}}</div>
          <div class="author" v-show="detail.author">{{detail.author}}</div>
        </div>
      </div>
      <div class="down-list">
        <div v-if="detail.pdf" class="pdf" @click="downLoad('pdf')">
          <img class="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAALyklEQVR4Xu2deWwX1RbHv7dlERdAREUEEgVFEkGJGBdcMEpEY/IwUQOiQfqr/UfUKlWJG3XFuCCKoEUoxIWHqH9IosaqcUeNEgMagWgUq6CgKFJXhN6XL/P6HvQ38/vNzJ35zdyZc5Om0d5zzp1zPszc5cwZBWniAQMPKANZERUPQAASCIw8IAAZuU+EBSBhwMgDApCR+0RYABIGjDwQOUC6sbELWltPhVLnQuvBUKofgG5Go7RVeNiwDZg2bbxSStt6CeXGHRlAetmyarzyymQAM6D1oHKGc/H3M84AlPockyYdnVWIIgFIFwp9ACyF1mNzAYbfiyRAhx4KbNyYWYiMAdL19b3R1rYCWg/z69fc9OsAiBecUYjMASoUWuTO4/FPYneAMgqREUC6UJgArf+dmztK0AvtDFAGITIFaC20HhrUr7np7wZQxiAKDZCuqxuOHTtW5waGMBfqBVCGIAoPUKEwFVrPCePX3MiUAigjEIUHqKZmJoDpuYEhzIWWAygDEJkA1ASgLoxfcyPjByDLIRKA4qTZL0AWQyQApQUgSyESgNIEkIUQCUBpA8gyiASgNAJkEUQCUFoBsgQiASjNAFkAkQCUdoBSDpEAZANAKYZIALIFoJRCJADZBFAKIRKAbAMoZRAJQDYClCKIBCBbAUoJRAKQzQClACIByHaAEoZIAMoCQAlCJABlBaCEIBKAsgRQAhAJQHECNGYMMGBAnBbcdVfwNWoBKM7wnngiMGRInBa8dVcIIgEozvAOHw4cc0ycFkrrrgBEAlCc4e3bFxg3Lk4L5XXHDJEAVD4EZj3OPx/YZx8zHabSMUIkAJkGp5z84YcDJ59crlf8f48JIgEo7tApBZx5JtCPpSITbjFAJABVIqbdujlzoZ49K2GtohNrAahSISVEp52WuTuRAFQpgGiHj7PDDnOW9hmZWAtAlQRod1tc4h9yiAPSXns5cFW6bdq0XDU0/MvEbOhR65oaKe9i4vk0yCq1Ui1cOMpkKAKQifdslxWAbI9gwuMXgBIOgO3mBSDbI5jw+AWgiALADb7jjweGDXNWRL//DqxZA6xYAWzfHpGRFKoRgCIICnN2Lr7YfV/m55+Bpibgyy8jMJRCFQKQYVAIz+WXl1byxx/A3XcD339vaCyF4gKQQVAOOgi4/Xaga9fySlavBh56qHw/23oIQAYRu+QSgGV4/bbbbgNaW/32tqOfABQyTrzr8I7Svbt/BcuXAy+84L+/DT0FoJBR4lcE+fgK0jiRnsmvO2SoCUAhgzlyJDB1ajDhX38Frr02mEzaewtAISN09tnARRcFE9baWbHxd1aaABQykuecA1xwQXDh2loBqJPX8nkaf9JJAGEI0trby+8ZBdGXhr5yBwoZBR5ZNDQEE5Y5kKu/8nkHYibgnXcGA0hWYQLQ/zzA9FHuAwXJS373XWDRomDQpb23PMIMIlRXB5xwgn8FTzwBvPWW//429BSADKLk5yB1d/W33gps2GBgMIWiApBBUPj4mj0bqKoqr+SXX4JPustrTb6HAGQYg/p6gCVYyrWWFuCZZ8r1su/vApBhzPwu57li+/prQ2MpFBeAIghKYyMwcKC3op9+Am64IQJDKVQhAEUQlHK70i+/DDz3XASGUqhCAIogKNXVwL33Ar17uyt78EHgs88iMJRCFQJQBEHhKoybinvv7a6Mez/cA8piE4AiiOpRRwHXXeet6O+/gWnTgD//jMBYylQIQBEEZMIEYOzY0oqWLAFefz0CYylTIQBFEJB77gEOPLC0Ir7Sc8st2coF4hULQIYADRoEzJjhT8njjwMffOCvry29BCDDSLEE73nn+VPy44/ATTcBO3f6629DLwHIMEp33VVcs3DrVqcYptsZ2VNPAW+8YWg0ReICkEEwuPvMXejO7aWXABbEPOus4r8xK/HmmwG+7pyFJgAZRPHCC90/Q8B3v5i2wd/77Vds4MMPgfnzDQynSFQAChkMZiTedx+w//57KmhrA665xlltMdmMSWdu7bHHgI8+Cmk8RWICUMhgeJ3Cv/MOsHjx/5VedZX713Z++815/DFPyOYmAIWMXqHg/v0KHmmwEkdH4/kYiyrsu2+xoe++cx5zf/0VchApEBOAQgSBZ16zZhWXdeHEmAlmnZfpxx4LXHmlu6GvvnKyGlnRzMYmAIWIGldXEycWC5Y6NPWacFPLpk3A3Ll25ksLQCEAuuMOoH//YkH+//Xr3RVy0n311d7przxwffpp4L33QgwoQREBKKDzhw4Frr++WIiPIm4qlmqsKcQVGnV4tVWrnNQPAnfwwQCroB1wANCrl/PTo4fziPznH+exx0k451LcNti4sfK73AJQQIB4FxkxolhowQLg/ffLK2MFV74SzQ+mRN24hcA9prffrtzjUAAKEEWvolK8CzDn2e8ZF+8i3B9yAzHAcDy7sojDm28Czz8f/wpPAAoQMVbjYP5z57Z0KfDqqwEUwTknYx4Rv0QYV2MyP1NN4txrEoB8Ro/5PizV2/mAlGdb06fvWUyc8xfOXTjR5g/nMNyx5g/3hVhXkWdllWhxF3QQgHxG0WvjkKfra9cCgwcD/Dgu5zas3OGn9K9P08bd4nylWgDyEZ4BA5ykMbf0DC6/g1Rq9WEu8i7z5gErV0audpdCAciHXzlBPvJIHx0j6MLEe56TlUuRDWLqkUeATz4JIuG/rwDk4St+YpsHpnzvnd8njaJxdcRvZ2zZAjA7kb/535zkdvzuOBfj8cekSUCfPmaWmRXA4xVCGUcTgHbzKie+o0cDxx3nzGPCNq5+uLH3ww/Oz+bNAP8fISFEfhsn2uPHOyu1Ll38Su3Zr3N2QDgt3lICEIAhQ5xA8Y4TtG3bBqxbB3Anmj/cFY76dJ0rN5YVPv30YPOtb75xcpbifB8t1wDxXzgPOfm9iyBfPOZj4cUXgY8/Br79Nihy4fuzHhG/ScYi53yZ0euuRGB4pvbss8COHeHt+ZHMLUBcWV1xhbNfE7R9+qmTgpFk45EId8Y5V+OEm6Dwzsd5Fd/D51lZJVouARo1CuC+TtjNvCwXSwgKXe4AOuUUYPJkf2Xp3JzJ3J0bbwzq5uz2zxVAXJIzR9lPTUOvkGftvS5TtHMDEF/0Y8KXW26yXyfy7sP32/2euvvVa3O/3AB06aXAmDFmoYrzSMBsZMlJ5wIgTpYfftjsgPOLL5zUCGl7eiAXAJV6K8IPEDww5Ttc3FGWlkOAglTQcAOELwrySEBasQdycQfyU0HMCw7u6DY3CzpeHsgFQF7vcZXDgm+YzpkT7AC0nM6s/T0XAHmlo5YKJuF59NE9U1WzFvworicXANFRU6YA3IX205ggz+9aZOnjuH6uO0yf3ADEtFO+1HfEEd5u4kbhk08Ca9aEcWU+ZXIDEMPL9Idx45zKYR2Fn3iKzT0evozH9IwgCV/5RCaHy3i3QPft6+QAsZ5hpVIfsghcru5AWQxg0tckACUdAcvtC0CWBzDp4QtASUfAcvsCkOUBTHr4AlDSEbDcvgBkeQCTHr4AlHQELLcvAFkewKSHnzBAMwFMT9oHYt/IA6+p5uYyn2ssrV+FNa8LhanQek5YeZFLgQeUWqwWLpxiMpLwANXWjkB7+yoT4yKbsAeqqmrUggWLTEYRGiAa1YXCOmhdoepNJpcpsi4e2I4ePfqruXO3mHjHDKDa2olob19iMgCRTcwDD6jm5gZT62YAaa1QKLQAcPm8n+nQRD5GD6xHz54j1ezZW01tGAG06zFWX98bbW0roHWICk+mwxf5EB7Yiq5dR6umps9DyBaJGAP037kQiwEuhdZGS8IoLkh0lPCAUutQXT1ezZ+/Nio/RQLQLoiWLatGS8tlaG/nh9gHRjVA0ROJB7ZBqQfQvfssNW9epBU7IwOo4zJ1Y2MXtLaeCqXOhdaDoVQ/ABUq7R6Js7OgZCe03gylWlFV9Rp69WpR998fy1fxIgcoC96Xa/DvAQHIv6+kp4sHBCDBwsgDApCR+0RYABIGjDwgABm5T4QFIGHAyAP/AQ0VGNwjWUGSAAAAAElFTkSuQmCC" alt="">
          <p class="title">下载PDF</p>
        </div>
        <div v-if="detail.word" class="word" @click="downLoad('word')">
          <img class="img" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJAAAACQCAYAAADnRuK4AAAKCElEQVR4Xu2dO3AbxxnHvwVAAnyABEkQBF+SaMq2FNnUaMYzYSbjLm7cxGVS5VGkcpnCnUtXTuMqVVIlrlNqXHtITxIlFClLHhEwSfH9fokESGAzHxQ6FEMSe7f32MX9t2Gzj//9v999e0fs7glCgQMaDgiNtmgKBwgAAQItBwCQln1oDIDAgJYDAEjLPjQGQGBAywHPAZJSJiZn5t4nefqhJDEqSOZJUrOWSksbd6bTi3du5T4SQkhLL6GubM8AklLGJ6cLv5JEn5KUN+qOHIEKfdkeEiL25Fa+451GhcgTgGZmFrr3q+UvpZQfRIAL5UtkgFpaUnR8XG5YiLQBelQsZkoHla+lpLvKzkak4hlAfLmNCpE2QBOPZx8i81x+R5wHqFEh0gJoYvr5L2SV/hqRhOL4Mi8C1IgQ6QE0NftUknzbsbMRaXAZQI0GkWuA/v7t7LsnJ3IqIiy4usyrAGokiFwDNDlV+LhK1S9cORuRRtcB1CgQuQZoYnr2M1mVn0SEBVeXWQ+gRoDIPUBTz/8oiX7nytmINFIByHaIAJCPMKsCZDNEAMgQgGyFCAAZBJCNEAEgwwCyDSIAZCBANkEEgAwFyBaIAJDBANkAEQAyHCDTIQJAFgBkMkQAyBKATIUIAFkEkIkQASDLADINIgBkIUAmQQSALAXIFIgAkMUAmQARALIcoLAhAkANAFCYEAGgBgEoLIgAUAMBFAZEAMhHgHLZHmptSfk4wuVdB7mNGgD5GN5sdxe1t7X6OMLVXQcFEQDyMbyZzg7KdKR9HOH6roOACAD5GN5kczP19/X6OEL9rv2GCADVj4FWjaGBPCXica0+dBv7CREA0o1Onfb8DMTPQmEXvyACQAFENp/LUiqZDGCk4J+JAFAAYY3FYtSf66WmpkQAowULEQAKKKQMUS7b3XCZCAAFBNDZMPxMxK/3jfJgDYACBuhsOH7F5xNcGSTOTq4DoaG/VCr/7e5I3881unCvewLHu+j4bkRbQfSP8bHb7+mIcQ0+ANKx3Yy2AMiMOFirAgBZGzozhAMgM+JgrQoAZG3ozBAOgMyIg7UqAJC1oTNDOAAyIw7WqgBA1obODOEAyIw4WKsCAFkbOjOEAyAiSsRj1JpKUjwmqHxaocOjkhnRuaCiJdlEyeYmklLScemESienoeuMNEBNiTiNDPZSV7qVhPjfT3onpxVaWN2ita290APEAjrbW2hkoJdSyabX9By8PKbC4jq9PC6HpjOyAHV1tNHoUO+1a2p2D47ou/kVqlSqoQWIAe/r7rhyfM5GL9a2aXFtOxSNkQQo2ZygsTeHKR6L1TWdIfq2uFS3nh8V8j2ddGsgq9Q1Z6IwMmYkAfrRGwPU0daiFBiuxFloa/dQub4XFRny+28O1xaKqZTTSoUePZ2nSjXYbBk5gPhB9P5bN1Ri8kOd7b1Deja34qiNbuWhvi4aynU76ub5wipt7Bw4aqNbOXIAZTPtdHu4z5Fv5ZNT+ufTOUdtdCu/fTNP/JzmpCxv7NDc8qaTJtp1IweQk+eKM3erUtI30wVts5108M7oILW3OjuVY317n2ZfrDkZRrsuAFKwkN90JgHQpU4BIACk4MDVVQCQgn3IQADoBwfcPAMBIAAEgBQyrZsqmMIUXEMGQgZCBlK4UdxUQQZScA0ZCBkIGUjhRnFTBRlIwTVkIGQgZCCFG8VNFWQgBdeQgZCBkIEUbhQ3VZCBFFxzmoFaU821RfpNiVht4fv+4THxOmsnBb/GK7gVxgFTfv6UkWlvJV4IdnEZBgO4tXdICytbdFw+UXCGCAAp2NQoAPG2IF67nM1c/02LalXS8uYOLa5uE68xuq4AoIgAxCscb/ZnibcIqRae1uaWN65dZw2AFNy0OQMlmxK1PWWZtPtPMe0evKTvlzboqPT/0xoAamCA+DlqON+ttC2ong08la1s7NKLtS3iKe6sAKB6zhGRbRmI367eGOx1vFZZwQrihfu8IH5z99WuCgCk4JpNAC2t79BAb+a1LdAKl+i4yt7hERUXN2q7ZrGovo59tgDkmALNBvzaz1Obys7Z80NhV4am8SrN3fwfSKVfE+oAoACiAIC8NRk/ZXjrZ6i9IQMFYD8ykLcmIwN562eovSEDBWB/kBmI36bOn3zm9+UBIL8dJqIgAGJwVjf3aHF9m/qzGerPdgYCEgBqAID4vMLCizU6OHdQJ59JdGugt3bWoZ8FAPnp7n/79isD8e9YnHGW1rfpqpUaPZ38y30PNfv05WUAZClAvOKwsLh26a/qFy8pFhM0lOuifDZDsXMnw3px6QDICxfr9OFlBuLTW+dXN2vPO07Lq2ktS53t7peDXBwTADmNgov6ue6O2i/quoXPTSwurVP5xNla54vj8rR2o7+HeH2Rblnd3KXi0oZuN47aR+7/QOnWFN0bHXRk0vnKvDieF4GdLbtw3dG5hjyVDea6am9sPMW5LbzKcXlj121zV+0iBxC79ODOTVd3PE8RHKRTnw4eTzW/mtbcrHLkfx3867t5KpWD/fxBJAHi3RN3RvqV7zjeSVFcXCc+dDyI0t3RVntb4+9iqJbVrb2axqBLJAFikzlAPGVcV/iuXtncrW3HqbeLwuvAOZnW9l8e05PCUu0jLEGXyALERvMDLE8Zl+2o2Ds4ormVzdC/3MPTGj9kc1a6WBgYnlb5mSxowM+0RBogNiEej9WC05ZKkoiJ2meU9g+PXvtPctB39WXj8Wt/Jt1G/JfLUalc2xYU9iefIg+QCXDYrAEA2Rw9A7QDIAOCYLMEAGRz9AzQDoAMCILNEgCQzdEzQDsAMiAINksAQDZHzwDtAMiAINgsAQDZHD0DtAMgA4JgswQAZHP0DNAOgAwIgs0SAJDN0TNAOwAyIAg2SwBANkfPAO0AyIAg2CwBANkcPQO0AyADgmCzhHABmp79TFblJzYbCO3iq5+MjX6g44PrrZSTU4WPq1T9QmdwtA3XAUHiz+Njo7/RUeEaoInHhTEpq//WGRxtw3VAkPjt+Njon3RUuAaIB52Ymn0mSb6lIwBtw3FACCqLRGrgx3eHNnUUaAE0OT37y2pV/kVHANqG44AQ9Pn4u7d/rzu6FkBSSjHxuPCQSP5MVwjaB+eAIPF9Mh178GBkZEd3VC2AePBHxWKmdFD5Wkq6qysG7f13QJDYoXjip+P3bj7xYjRtgFjEzMxC9361/KWUUuuV0IsLQh9XOyBIPEtQ7KP3xkaeeuWTJwCxGCll/Jvp4q8lVT+Vkoa9Eoh+9B0QgvZIis/T8fQf7t3LvfqomUfFM4DO9EgpE5Mzc++TPP1QkhgVJPMkqdkjvehGwQEpBJ/dtyaI5gXJr1K97Q/v5/OHCk0dV/EcIMcK0MBqBwCQ1eELXzwACj8GVisAQFaHL3zxACj8GFitAABZHb7wxQOg8GNgtYL/AJDErOuEab06AAAAAElFTkSuQmCC" alt="">
          <p class="title">下载WORD</p>
        </div>
        <div v-if="detail.ppt" class="ppt" @click="downLoad('ppt')">
          <img  class="img" src="data:image/png;base64,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" alt="">
          <p class="title">下载PPT</p>
        </div>
      </div>
  </el-dialog>
</div>
</template>

<script lang="ts">
import { ElMessage } from 'element-plus'
import { getArticleDetail, getFileStream } from '@/api/index'
import { defineComponent, onMounted, ref, Ref } from 'vue'
import { useRoute } from 'vue-router'
import { icons } from '../search/common'
import { getFileName, downloadFile, DownLoadTypes, FileTyps } from '@/utils/common'
export default defineComponent({
  name: 'detail',
  setup() {
    const loading: Ref<boolean> = ref(false)
    const uploadModel: Ref<boolean> = ref(false)
    const route = useRoute()
    const id: Ref<string> = ref('')
    const detail: Ref<any> = ref({})
    const url: Ref<string> = ref('')
    const getDetail = async (id: string) => {
      loading.value = true
      const { code, data } = await getArticleDetail(id)
      if (code === 200) {
        detail.value = data
        url.value = window.location.origin + '/pdf/web/viewer.html?file=' + data.pdf
      }
      loading.value = false
    }
    const downBtn = () => {
      uploadModel.value = true
    }
    const downLoad = async (type: FileTyps) => {
      uploadModel.value = false
      loading.value = true
      try {
        const data = await getFileStream(id.value, DownLoadTypes[type])
        await downloadFile(data, getFileName(detail.value[type]))
      } catch (err) {
        console.log(err)
        ElMessage.error('下载失败，请稍后再试！')
      }
      loading.value = false
    }
    onMounted(() => {
      id.value = route.query.articleId as string
      getDetail(id.value)
    })
    return {
      ...icons,
      url,
      detail,
      loading,
      uploadModel,
      downBtn,
      downLoad
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
    .img {
      width: 20px;
      height: 20px;
    }
    .item {
      margin-right: 8px;
    }
    .search-logo {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #fff;
      .search-tps {
        margin-left: 57px;
        padding-top: 4px;
        margin-bottom: 8px;
        .title {
          font-size: 14px;
        }
        .info {
          margin-right: 20px;
          color: #a8b4bf;
          font-size: 12px;
          .left1 {
            margin-right: 20px;
          }
        }
      }
      img {
        width: 107px;
        height: 40px;
      }
    }
  }
  #pdfPlayer {
    height: calc(100vh - 74px);
  }
}
.dialog-header {
  width: 100%;
  height: 100px;
  background-color: #eaf1fe;
  padding: 20px 24px;
  .title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    height: 24px;
    font-size: 16px;
    font-family: PingFangSC-Medium,PingFang SC;
    font-weight: 500;
    color: #202a33;
    line-height: 24px;
  }
  .sub-title {
    margin-top: 8px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .state1 {
    margin-right: 20px;
    font-size: 12px;
    padding: 5px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #d7403d;
    background-color: #fff1f0;
  }
  .date, .org, .author {
    margin-right: 20px;
    font-size: 12px;
    font-family: PingFangSC-Regular,PingFang SC;
    font-weight: 400;
    color: #a8b4bf;
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
.down-list {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #fff;
  div, p{
    text-align: center;
    cursor: pointer;
  }
  .img {
    width: 72px;
    height: 72px;
  }
  .title {
    color: #202a33;
    font-size: 14px;
  }
}
</style>
