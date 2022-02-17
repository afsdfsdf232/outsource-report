<template>
  <div class="footer-content" style="min-width: 1200px">
    <div class="flex">
      <div class="content">
        <div class="desc">
          <p class="title">关于我们</p>
          <p>
            洞见研报隶属于上海顺铭信息科技有限公司，洞见研报全面覆盖各投资领域，依托海量的宏观策略、行业发展、上市公司等研究报告，采用智能搜索引擎、专业OCR识别、文档结构化解析、自然语言处理等技术，致力于为金融投资人员、企业高管、咨询顾问、行业研究员、市场分析师、市场运营人员等提供便捷、全面的实时、专业的信息检索服务。【上海顺铭信息科技有限公司】
          </p>
        </div>
        <div class="desc">
          <p>
            商务合作、企业采购、机构入驻、报告发布：collaboration@djyanbao.com
          </p>
          <span style="margin-right: 20px"
            >地址：上海市杨浦区黄兴路2077号蓝天大厦1607室</span
          ><span class="desc-title go-href">《网站服务协议》</span
          ><span class="desc-title go-href">《隐私政策协议》</span>
        </div>
      </div>
      <div class="er-code">
          <div class="company-code daily">
            <img
              src="../assets/images/psdj.jpg"
              alt="洞见daily"
            />
            <div class="txt">微信扫码关注</div>
            <div class="txt2">享受每日最新洞见</div>
          </div>
          <div class="company-code">
            <img
              src="../assets/images/psdj.jpg"
              alt="客服二维码"
            />
            <div class="txt">联系客服领福利</div>
          </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="botton-content">
      <div class="flexr0c">
        <div class="right-info">
          Copyright© 2021 上海顺铭信息科技有限公司
          <a href="https://beian.miit.gov.cn" target="_blank"
            >沪ICP备2021005678号-1</a
          >
        </div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAFGUlEQVQ4ER3BbWwbZwHA8f89dz6fz++JY8ckpWsarU1Z24y2wEZItw7tBbVhy6SyIoQYKmMCjQnEPoDGh2l8GF8qMU0DVIZEp34AhjTRVmVdFsS2VnQvaqGt+pKlaRo7TRM7jn32ne3z3cO5v58ipQS7QZePQEgfRy8QCfUD9X77+rmJf538+Actp6M/8PD2wz3btr0NQ4VWSxJ2HBAKILgjEUeRUuLaVVAkwpOoehp4/8GZk6eePf3PaxPSmTEWWiZqOsX6jIFTMjtjDw0dG9k3+Sfp3XVctupIRQEkanIAQaCmWNTlGtJMg940pn/3xvR3n5naX2/OG3fHVA4at3nWWOD++3L03JfTDj7z7hOnXn3lmBJRw7au0OQTXO1TugRdqkCoCTRRHmyde/md3x6tcuDgEN8brJH8wyXKVz3Ksx7Vvb/nm94Fnj/yFIf/7iKv/vFvMbNpCCOGEQ3TJQjEWhbRcHXk5vEXZ8f3XhhPDef4ceYCc0driHUpPKsNLR+lL8WZ506z3zxH7qv38vW9J/atfPjGdXv+/KbL7/2DLkEg3HLQmu/Ejl2N6x8t7uSxnRb18zXEzSpKKkx41aN5+jahDb0YdYfSn88y+Uib6c+28OYHXj6mNCKIUboEgepKadD/z3uHfCUCmk3CWqS2BCHPhdUmykYTfUcKcauBjk9pzmGgpwWKQqUuCPdphzaPTW4gIAjMX3n3yXaxOJaO6dAJI/N5MmP91JFY9/fiHRgk9tIo5vPbEH0m2R0ZGnYbpCSfNaFw/sHVhTPfJyAImLH0SM1yGeprgtHLqbMm2p4E5X3r8YoWyv8a2Cdu486tob8wRs9Pt/PWkQoQZXSrRmN2mWZhdpCAIOCvLu6rVTTuGbQY/JLO629G+fcrBUZ35UmacexLFfzlFs0LFeLFNS6+fI1Xj4TJjabYOlClVGzhrl4ZIyAICK2RsmqCxMo19j/i0XFjuMeX6P3Lp4iBEO0+FT+rkdmTJz99ndLhizTaKpMTIeLlGayahhYXIQIagYj5+Smx6caElxvg6S9bHBro4/XiCO7CJXrLM4hkBOdSBWs4SzGd568iAokUT39lmU58kNQXFMz0uhMENO4QWVmTLM5a3DMyx69/voMXXxjnuLUVai4TdpmelOCtE3HqmECan/3IYNfwDIszQNPG71jbCWgEtFR7Zyeew11yKSxf5idjYSanokyftLkitvHols/IR0p0jg3Qrjis22zyy0dvcPvMDWzXwMjoaCl9MwFFSkmr/tG3y2d/c9RZatMquVCYZ+Pjo4RzBnhlvLJGfdkhuaEH1vdCocTc21dx4hliQzEi/SbJ4QO79fQ33leklHR1Gv/9zurFQ695TSdZ+mAJLSrp3z2Ct+rg2g2EaWD0RFH0EOUzs3Q8jeTOjbhNyslN409FU4kpRX8YjYDrzOOsOMXmUsQxcn4yt2cYr9rAs2pg6qh6Cj0C7bU6jUIFY30vxmCO1ppNs2jJyLo6aiJBBBAEZPs6Kh/+IvvFeH8onadV9fE9Dd9Taa5YIH3a5Sr1mRUUNQSKQvNWiVBEkPtaPqOb1g99hzsEAV1NEO7d9bhlJ1+zC4WGrq6RyHYIKTa64qK21pCOQ3xzhsRwAqHX0ZI6Srr/Zke791eaefe3VH2FLo0u6aKENLtWjj7nXM695FRXHmu5C7s/t6Vvi28pMSMlerRIHOsWNyN9KVvLjp9fnV2ecuYrpwZ2Z31FVZFek67/Ay4iNxP5+UK0AAAAAElFTkSuQmCC"
          alt="警徽"
          style="margin: 0px 10px"
        /><a
          target="_blank"
          href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011002005605"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
          ><img src="" style="float: left" />
          <div
            style="
              float: left;
              height: 20px;
              line-height: 20px;
              margin: 0px 0px 0px 5px;
            "
          >
            沪公网安备 31011002005605号
          </div></a
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style lang="scss" scoped>
.footer-content {
  width: 100%;
  background: #0b1013;
  color: #a8b4bf;
  font-size: 14px;
  box-sizing: border-box;
  .flex,
  .botton-content {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // flex-direction: column;
    // align-items: stretch;
  }
  .content {
    width: 700px;
    padding: 16px 0;
  }
  .daily {
    margin-right: 60px;
  }
  .desc {
    margin-top: 15px;
    .title {
      padding-bottom: 15px;
      color: #fff;
      font-size: 16px;
    }
  }
  .flexr0c {
    display: flex;
    padding: 16px 0;
  }
  .line {
    width: 60%;
    height: 1px;
    background: hsla(0, 0%, 100%, 0.06);
  }
  .er-code {
    display: flex;
    img {
      width: 120px;
      height: 120px;
    }
    .txt {
      margin-top: 15px;
      text-align: center;
    }
    .txt2{
      text-align: center;
    }
  }
}
</style>
