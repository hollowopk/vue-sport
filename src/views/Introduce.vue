<template>
  <div class="box">
   
    <div class="container">
      <!-- 自律给我自由 -->
      <div class="first">
        <div class="images">
          <img src="@/assets/bohe_images/30.png" alt="" />
        </div>
      </div>
      <div class="footer">
        <div class="title">
          加入YIYANG
          <p><a @click="goMyself" style="cursor: pointer">了解更多 &gt;</a></p>
        </div>
        <div class="lable">
          <img :src="imgPic_1" alt="" />
        </div>
      </div>
      <div class="container_1">
        <div class="second">
          <!-- 排毒养颜 -->
          <div class="one">
            <ul>
              <li>
                <div class="image">
                  <img src="@/assets/bohe_images/41.png" alt="" />
                </div>
                <div class="txt">
                  <b class="B1">排毒养颜</b>
                  <b class="B2"></b>
                  <p>
                    所谓毒素:其实是机体新陈代谢产生的垃圾。身体“毒素”积聚,也是引起身体衰老的主要原因之一。主要食物有:海带、蜂蜜、羹类食物、胡萝卜、木耳、苦瓜等;这些食物的共同特点是均可加快新陈代谢的速度、美白皮肤、抑制黑色素的形成,以帮助身体自我清除有害物质。
                  </p>
                  <b class="B3">排出体内代谢废物 做轻松自己</b>
                </div>
              </li>
              <li>
                <div class="image">
                  <img src="@/assets/bohe_images/38.png" alt="" />
                </div>
                <div class="txt">
                  <b class="B1">清热去火</b>
                  <b class="B2"></b>
                  <p>
                    所谓祛火:其实是清热解毒、泻火除烦。身体“热量”积聚,会导致便秘、感冒、口腔溃疡、口干舌燥等。主要食物有:豆腐、蜂蜜、菊花茶等;这些食物的共同特点是均可加快新陈代谢的速度、祛除心火、去除体内焦热。
                  </p>
                  <b class="B3">排出体内热气 摆脱上火困扰</b>
                </div>
              </li>
              <li>
                <div class="image">
                  <img src="@/assets/bohe_images/41.png" alt="" />
                </div>
                <div class="txt">
                  <b class="B1">增强免疫</b>
                  <b class="B2"></b>
                  <p>
                    所谓免疫力:免疫力是人体自身的防御机制,是人体识别和消灭外来侵入的任何异物(病毒、细菌等);处理衰老、损伤、死亡、变性的自身细胞以及识别和处理体内突变细胞和病毒感染细胞的能力。主要食物有:各种水果、蔬菜等;这些食物的共同特点是均可提高自身免疫力,保护自己。
                  </p>
                  <b class="B3">增强自身免疫力 病毒远离自己</b>
                </div>
              </li>
              <li>
                <div class="image">
                  <img src="@/assets/bohe_images/38.png" alt="" />
                </div>
                <div class="txt">
                  <b class="B1">补血滋阴</b>
                  <b class="B2"></b>
                  <p>
                    所谓滋阴补血:其实是指女性气血不足。主要食物有:阿胶、红枣、枸杞、黑米、芝麻等;这些食物的共同特点是营养成分高、有很好的保健作用;还有对抗衰老、增强肾功能,提高睡眠质量等作用。
                  </p>
                  <b class="B3">调节气血不足症状 做年轻自己</b>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="third"></div>
      </div>
    </div>
    <!-- 底部区域 -->
    <div class="card_title">
      <div class="card_title_1">
        <b></b>
        易氧健康&nbsp;吃的放心用的舒心
        <p>
          团队耕耘项目多年,以“让科技领导食物营养”为宗旨；不断加强创新能力以及对食物研究深度，为中国用户提供包含食谱查询、食物营养查询,个人健康可视化数据中心;让年轻人、中老年人轻松拥抱健康生活。
        </p>
      </div>
    </div>
  </div>
</template>

<script>
//监听鼠标滑轮事件
windowAddMouseWheel();
function windowAddMouseWheel() {
  var scrollFunc = function (e) {
    e = e || window.event;
    if (e.wheelDelta) {
      //判断浏览器IE，谷歌滑轮事件
      if (e.wheelDelta > 0) {
        //当滑轮向上滚动时
        //alert("滑轮向上滚动");

      }
      if (e.wheelDelta < 0) {
        //当滑轮向下滚动时
        //alert("滑轮向下滚动");
      }
    } else if (e.detail) {
      //Firefox滑轮事件
      if (e.detail > 0) {
        //当滑轮向上滚动时
        //alert("滑轮向上滚动");
      }
      if (e.detail < 0) {
        //当滑轮向下滚动时
        //alert("滑轮向下滚动");
      }
    }
  };
  //给页面绑定滑轮滚动事件
  if (document.addEventListener) {
    document.addEventListener("DOMMouseScroll", scrollFunc, false);
  }
  //滚动滑轮触发scrollFunc方法
  window.onmousewheel = document.onmousewheel = scrollFunc;
}

export default {
  
  data() {
    return {
      contents: [],
      content: "",
      imgPic_1: require("../assets/bohe_images/29.png"),
    };
  },
  methods:{
    goMyself(){
      this.$router.push("/login")
    }
  },
  mounted() {
    if (document.body.scrollTop) {
      document.body.scrollTop = 0;
    } else {
      document.documentElement.scrollTop = 0;
    }
  },
};
</script>

<style lang="less" scoped>
@keyframes banner {
  0% {
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  25% {
    height: 30px;
  }
  50% {
    top: 150px;
  }
  75% {
    top: 250px;
  }
  100% {
    top: 350px;
  }
}
.box {
  width: 100%;
  .container {
    height: 400px;
    //background: rgba(37, 31, 49, 0.1);
    .first {
      width: 100%;
      height: 780px;
      background: url("../assets/bohe_images/40.png") center no-repeat fixed;
      display: flex;
      justify-content: center;
      align-items: center;
      .images {
        //padding-top: 480px;
        width: 100%;
        height: 177px;
        display: flex;
        justify-content: center;
        align-items: center;
        // animation: banner 12s linear infinite;
      }
    }
  }
  .container_1 {
    .second {
      width: 100%;
      height: 1080px;
      background: url("../assets/bohe_images/40.png") center no-repeat fixed;
      .one {
        padding-top: 350px;
        width: 100%;
        height: 800px;
        ul {
          margin: 0 auto;
          height: 800px;
          width: 1400px;
          li {
            height: 800px;
            width: 350px;
            float: left;
            position: relative;
            list-style-type: none;
            &:hover {
              .txt .B2 {
                margin-left: 120px;
              }
              .txt .B3 {
                opacity: 0;
              }
              .txt p {
                opacity: 1;
                margin-left: 50px;
              }
              .txt {
                background: rgba(238, 255, 177, 0.5);
              }
            }
            .image {
              img {
                height: 800px;
                width: 350px;
              }
            }
            .txt {
              height: 800px;
              width: 350px;
              font-size: 46px;
              position: absolute;
              left: 0px;
              top: 0;
              writing-mode: vertical-lr;
              background: rgba(247, 255, 209, 0.2);
              font-weight: 100;
              margin: auto 0;
              .B1 {
                height: 800px;
                font-weight: 100;
                margin-top: 300px;
                margin-left: 50px;
                position: absolute;
                left: 0px;
              }
              .B2 {
                height: 80px;
                width: 4px;
                background: #333;
                margin: auto 0;
                display: block;
                margin-left: 130px;
                opacity: 1;
                border-radius: 65px;
                transition: 0.3s;
              }
              .B3 {
                height: 800px;
                font-size: 26px;
                font-weight: 100;
                margin: auto 0;
                position: absolute;
                right: 75px;
                margin-top: 210px;
                opacity: 1;
                transition: 0.3s;
              }
              p {
                height: 660px;
                margin: auto 0;
                opacity: 0;
                font-size: 18px;
                font-weight: 100;
                transition: 0.3s;
                line-height: 28px;
                margin-left: 60px;
                transition: 0.3s;
              }
            }
          }
        }
      }
    }
    .third {
      width: 100%;
      height: 1080px;
      background: url("../assets/bohe_images/40.png") center no-repeat fixed;
    }
  }
  .footer {
    // border: 1px solid rgba(37, 31, 49, 0.1);
    width: 1400px;
    padding-top: 0px;
    margin: 0px auto;
    height: 320px;
    display: flex;
    .title {
      padding-left: 40px;
      padding-top: 65px;
      font-size: 56px;
      font-weight: 600;
      font-family: PingFangSC-Semibold, PingFang SC;
      margin: 0 auto;
      color: #333;
      position: relative;
      p {
        a {
          color: #6d51f4;
          font-size: 22px;
          text-decoration: none;
          font-weight: bold;
          line-height: 28px;
        }
      }
    }
    .lable {
      margin-left: 250px;
      margin-top: 10px;
      img {
        width: 850px;
        height: 280px;
      }
    }
  }
  //尾部字体
  .card_title {
    padding-top: 2200px;
    width: 100%;
    height: 200px;
    margin: 150px auto;
    //background: rgb(37, 31, 49);
    .card_title_1 {
      width: 1200px;
      height: 200px;
      margin: 0 auto;
      b {
        margin: 0 auto;
        width: 60px;
        height: 4px;
        background: rgb(55, 61, 82);
        display: block;
        border-radius: 5px;
        margin-bottom: 30px;
      }
      text-align: center;
      font-size: 44px;
      color: rgb(55, 61, 82);
      p {
        font-size: 19px;
        font-weight: 100;
        color: rgb(55, 61, 82);
        margin-top: 48px;
      }
    }
  }
}
</style>